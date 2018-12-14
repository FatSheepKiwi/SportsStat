import React from "react";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "./../apis/sportStatServer";
import { Row, Col, Icon, List, Card } from "antd";
import { Link } from "react-router-dom";
import TeamTraditionalStat from "./TeamTraditionalStat";
import TeamOverallStatGraph from "./TeamOverallStatGraph";

class TeamDetail extends React.Component {
  state = { loading: true, playersBio: [] };

  fetchTeamBasicInfo = teamID => {
    const url = "/team/" + teamID;
    SportStatServer.get(url)
      .then(res => {
        if (!Array.isArray(res.data) || !res.data.length) {
          // array does not exist, is not an array, or is empty
          return;
        }
        const basicInfo = res.data[0];
        this.props.store.team.basicInfo = basicInfo;
        this.setState({ loading: false });
        // console.log(basicInfo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchTeamPlayersBioInfo = teamID => {
    const url = "/team/" + teamID + "/active-players";
    SportStatServer.get(url)
      .then(res => {
        this.setState({ playersBio: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  reloadPage = () => {
    window.location.reload();
  };

  fetchTeamTraditionalInfo = teamID => {
    const url = "/team/traditional-stat/" + teamID;
    SportStatServer.get(url)
      .then(res => {
        if (!Array.isArray(res.data) || !res.data.length) {
          // array does not exist, is not an array, or is empty
          return;
        }
        this.props.store.team.traditionalStat = res.data;
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    if (typeof this.props.match.params.teamID !== "undefined") {
      this.fetchTeamBasicInfo(this.props.match.params.teamID);
      this.fetchTeamTraditionalInfo(this.props.match.params.teamID);
      this.fetchTeamPlayersBioInfo(this.props.match.params.teamID);
    }
  }

  render() {
    if (this.state.loading) {
      return <div> Loading... </div>;
    }
    const { basicInfo, traditionalStat } = this.props.store.team;
    if (!basicInfo.teamName) {
      return <div> Sorry, data query failed, please Retry... </div>;
    }
    const playersBio = this.state.playersBio;
    return (
      <div className="ui container">
        <Row style={{ backgroundColor: "#FFFAFA" }}>
          <Col span={6}>
            <img
              width={272}
              height={272}
              alt="team logo"
              src={basicInfo.teamLogoUrl}
            />
          </Col>
          <Col span={18}>
            <div className="ui content" style={{ margin: 20 }}>
              <p> Team: {basicInfo.teamName}</p>
              <p> City: {basicInfo.teamCity}</p>
              <p>
                {" "}
                Arena: {basicInfo.teamArena} Capacity:{" "}
                {basicInfo.teamArenaCapacity}
              </p>
              <p> Owner: {basicInfo.teamOwner}</p>
              <p> Since: {basicInfo.teamYearfounded} </p>
              <p>Content:</p>
              <div>
                <a href={basicInfo.teamFackbookLink} style={{ margin: 5 }}>
                  <Icon type="facebook" />
                </a>
                <a href={basicInfo.teamTwitterLink} style={{ margin: 5 }}>
                  <Icon type="twitter" />
                </a>
                <a href={basicInfo.teamInstagramLink} style={{ margin: 5 }}>
                  <Icon type="instagram" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <h3 class="ui dividing header" style={{ margin: 20 }}>
            Players
          </h3>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
            dataSource={playersBio}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 4
            }}
            renderItem={item => (
              <List.Item>
                <Card
                  title={item.title}
                  cover={
                    <img
                      alt="player img"
                      style={{ width: "100%", height: 200 }}
                      src={item.playerImgUrl}
                    />
                  }
                >
                  <Link
                    to={`/player/${item.playerID}`}
                    onClick={this.reloadPage}
                  >
                    {item.playerName}
                  </Link>
                  {` Age: ${item.playerAge}`}
                </Card>
              </List.Item>
            )}
          />
        </Row>
        <Row>
          <h3 class="ui dividing header" style={{ margin: 20 }}>
            Team Traditional Stat
          </h3>
          <Provider store={this.props.store}>
            <TeamTraditionalStat />
          </Provider>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Provider store={this.props.store}>
              <TeamOverallStatGraph
                traditionalStat={traditionalStat}
                teamID={basicInfo.teamID}
              />
            </Provider>
          </Col>
        </Row>
      </div>
    );
  }
}

TeamDetail = inject("store")(observer(TeamDetail));
export default TeamDetail;
