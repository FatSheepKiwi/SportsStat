import React from "react";
import { Row, Col, Card, Spin, message } from "antd";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "../apis/sportStatServer";
import PlayerDataTable from "./PlayerDataTable";
import PlayerCareerScore from "./PlayerCareerScore";
import PlayerLastThreeYearBasic from "./PlayerLastThreeYearBasic";
import PlayerPerformance from "./PlayerPerformance";
import PlayerRankTable from "./PlayerRankTable";
import PlayerRankLineGraph from "./PlayerRankLineGraph";
import PlayerPerValueGraph from "./PlayerPerValueGraph";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonState: "Regular",
      seasonRankState: "Regular"
    };
  }
  getSeasonState = () => {
    return this.state.seasonState;
  };
  setSeasonState = seasonState => {
    this.setState({
      seasonState
    });
  };
  setSeasonRankState = seasonRankState => {
    this.setState({
      seasonRankState
    });
  };

  getPlayerInfoByID = playerID => {
    this.props.store.loading = true;
    const url = "/player/" + playerID;
    SportStatServer.get(url)
      .then(response => {
        this.props.store.playerData = response.data;
        this.props.store.loadingInfo = false;
        this.getPlayerRankStat(playerID);
      })
      .catch(err => {
        console.log(err);
        message.error("Get player details failed, please retry...");
      });

    const avg_url = "/player/average/" + playerID;
    SportStatServer.get(avg_url)
      .then(response => {
        console.log(response.data);
        this.props.store.playerStatistic = response.data;
      })
      .catch(function(err) {
        console.log("error");
        message.error("Get player average stat failed, please retry...");
      });
  };

  getPlayerRankStat = value => {
    var url = "/player/rank-stat/" + value;
    SportStatServer.get(url)
      .then(response => {
        console.log(response.data);
        this.props.store.playerRankStatistic = response.data;
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });
  };

  componentWillMount() {
    if (typeof this.props.match.params.playerID !== "undefined") {
      this.getPlayerInfoByID(this.props.match.params.playerID);
    }
    // this.fetchTeamBasicInfo();
  }

  render() {
    const DOB = new Date(
      new Date(0).setUTCSeconds(this.props.store.playerData.playerBirthdate)
    );
    const gridStyle = {
      width: "25%",
      height: 60,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "12px"
    };
    const gridStyleBig = {
      width: "50%",
      height: 60,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "12px"
    };
    const imgStyle = {
      paddingTop: 40
    };
    const cardStyle = {
      //paddingTop: 20
      // background: "rgba(255,255,255,0.8)"
    };
    const performanceStyle = {
      paddingTop: 40
    };
    const playerBasicInfoStyle = {
      backgroundColor: "rgba(120, 120, 120, 0.2)"
    };

    return (
      <div className="ui container">
        <Spin spinning={this.props.store.loadingInfo}>
          <Row style={playerBasicInfoStyle}>
            <Col span={5} style={imgStyle} xs={24} sm={6}>
              <img
                src={this.props.store.playerData.playerImgUrl}
                style={{ width: 260, height: 190 }}
                alt={
                  this.props.store.playerData.playerFirstName +
                  " " +
                  this.props.store.playerData.playerLastName
                }
              />
            </Col>
            <Col style={cardStyle} span={11} xs={24} sm={12}>
              <Card title="Player Basic Info" style={{ margin: 10 }}>
                <Card.Grid style={gridStyle}>
                  {this.props.store.playerData.playerFirstName +
                    " " +
                    this.props.store.playerData.playerLastName}{" "}
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  {"Jersey #:" + this.props.store.playerData.playerJerseyNumber}{" "}
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  {"Position: " + this.props.store.playerData.playerPosition}{" "}
                </Card.Grid>

                <Card.Grid style={gridStyle}>
                  {"Height: " + this.props.store.playerData.playerHeight}
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  {"Weight: " + this.props.store.playerData.playerWeight}
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  {"DOB: " + DOB.toDateString()}
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  {"Age: " + this.props.store.playerData.playerAge}
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  {"Seasons: " + this.props.store.playerData.playerExperience}
                </Card.Grid>
                <Card.Grid style={gridStyleBig}>
                  {"Team: " + this.props.store.playerData.playerTeam}
                </Card.Grid>
                <Card.Grid style={gridStyleBig}>
                  {"Prior: " + this.props.store.playerData.playerPrior}
                </Card.Grid>
              </Card>
            </Col>
            <Col style={performanceStyle} span={8} xs={24} sm={6}>
              <div style={{ textAlign: "center", fontSize: 20 }}>
                <span>Player Radar</span>
              </div>
              <Provider store={this.props.store}>
                <PlayerPerformance setSeasonState={this.setSeasonState} />
              </Provider>
            </Col>
          </Row>
        </Spin>
        <Row gutter={16} style={{ paddingTop: 10 }}>
          <Col span={12} style={{ paddingLeft: 20, paddingRight: 10 }}>
            <Provider store={this.props.store}>
              <PlayerCareerScore seasonState={this.state.seasonState} />
            </Provider>
          </Col>
          <Col span={12} style={{ paddingLeft: 10, paddingRight: 20 }}>
            <Provider store={this.props.store}>
              <PlayerLastThreeYearBasic seasonState={this.state.seasonState} />
            </Provider>
          </Col>
        </Row>
        <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Provider store={this.props.store}>
            <PlayerPerValueGraph />
          </Provider>
        </Row>
        <Row>
          <Provider store={this.props.store}>
            <PlayerDataTable setSeasonState={this.setSeasonState} />
          </Provider>
        </Row>
        <Row>
          <Provider store={this.props.store}>
            <PlayerRankTable setSeasonRankState={this.setSeasonRankState} />
          </Provider>
        </Row>
        <Row style={{ paddingTop: 10 }}>
          <Provider store={this.props.store}>
            <PlayerRankLineGraph seasonRankState={this.state.seasonRankState} />
          </Provider>
        </Row>
      </div>
    );
  }
}

Player = inject("store")(observer(Player));
export default Player;
