import React from "react";
import { List, Avatar, Icon, Card, message } from "antd";
import { observer, inject, Provider } from "mobx-react";
import { Link } from "react-router-dom";
import SportStatServer from "./../apis/sportStatServer";

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
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 4
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
                style={{ width: 240, height: 315 }}
                cover={
                  <img
                    alt="player img"
                    style={{ width: 240, height: 175 }}
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
                    `Team ` +
                    (item.playerTeam ? item.playerTeam : `Data Missing`)
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
