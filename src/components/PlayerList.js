import React from "react";
import { List, Avatar, Icon, Card, message } from "antd";
import { observer, inject, Provider } from "mobx-react";
import { Link } from "react-router-dom";
import SportStatServer from "./../apis/sportStatServer";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "http://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

class PlayerList extends React.Component {
  state = { playerBios: [], loading: true };

  fetchAllPlayerBio = () => {
    SportStatServer.get("/player/all-bio")
      .then(res => {
        this.setState({ playerBios: res.data, loading: false });
      })
      .catch(err => {
        message.warn("Fetch player data failed, please retry...");
      });
  };

  reloadPage = () => {
    window.location.reload();
  };

  componentDidMount() {
    this.fetchAllPlayerBio();
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p />
        </div>
      );
    }

    const { Meta } = Card;

    return (
      <div className="ui container" style={{ margin: 20 }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 3
          }}
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 20
          }}
          dataSource={this.state.playerBios}
          footer={
            <div>
              <b>Player List</b>
            </div>
          }
          renderItem={item => (
            <List.Item key={item.playerID}>
              <Card
                style={{ width: 240, height: 340 }}
                cover={
                  <img
                    alt="player img"
                    style={{ width: 240, height: 240 }}
                    src={item.playerImgUrl}
                  />
                }
                actions={[
                  <Link
                    to={`/player/${item.playerID}`}
                    onClick={this.reloadPage}
                  >
                    <Icon type="bar-chart" />
                    {` details`}
                  </Link>
                ]}
              >
                <Meta
                  title={item.playerName}
                  description={
                    `Team ` + item.playerTeam ? item.playerTeam : `Data Missing`
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

PlayerList = inject("store")(observer(PlayerList));
export default PlayerList;
