import React from "react";
import { Row, Col, Card, Spin } from "antd";
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

  getPlayerInfo = value => {
    this.props.store.loading = true;
    value = value.trim();
    var url = "/player?playerName=" + value;
    SportStatServer.get(url)
      .then(response => {
        console.log(response.data);
        this.props.store.playerData = response.data;
        this.props.store.loadingInfo = false;
        this.getPlayerRankStat(this.props.store.playerData.playerID);
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });

    // axios.defaults.withCredentials = true;
    url = "/player/average?playerName=" + value;
    SportStatServer.get(url)
      .then(response => {
        console.log(response.data);
        this.props.store.playerStatistic = response.data;
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
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

  //   fetchTeamBasicInfo = () => {
  //     SportStatServer.get("/team")
  //       .then(response => {
  //         console.log(response.data);
  //         this.props.store.teamBasicInfo = response.data;
  //       })
  //       .catch(function(err) {
  //         console.log("error");
  //         console.log(err);
  //       });
  //   };

  //   getTeamLogo = () => {
  //     var url, teamAbbr;
  //     this.props.store.playerStatistic.forEach(element => {
  //       if (element.statType === "RegularSeason") {
  //         teamAbbr = element.teamAbbreviation;
  //       }
  //     });

  //     this.props.store.teamBasicInfo.forEach(element => {
  //       if (element.teamAbbreviation === teamAbbr) {
  //         url = element.teamLogoUrl;
  //       }
  //     });
  //     return url;
  //   };

  componentWillMount() {
    this.getPlayerInfo("Stephen Curry");
    // this.fetchTeamBasicInfo();
  }

  render() {
    const DOB = new Date(
      new Date(0).setUTCSeconds(this.props.store.playerData.playerBirthdate)
    );
    const gridStyle = {
      width: "25%",
      height: 25,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "15px"
    };
    const gridStyleBig = {
      width: "50%",
      height: 25,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "15px"
    };
    const imgStyle = {
      paddingTop: 50,
      background: "rgba(255,255,255,0.8)"
    };
    const cardStyle = {
      paddingTop: 38,
      background: "rgba(255,255,255,0.8)"
    };
    const performanceStyle = {
      // paddingBottom: 10,
      background: "rgba(255,255,255,0.8)"
    };
    const playerBasicInfoStyle = {
      backgroundColor: "rgba(120, 120, 120, 0.9)",
      backgroundImage:
        "url(" +
        "https://stats.nba.com/media/img/teams/logos/ATL_logo.svg" +
        ")",
      backgroundSize: "cover",
      backgroundPosition: "50% 50%"
    };

    return (
      <div>
        <Spin spinning={this.props.store.loadingInfo}>
          <Row style={playerBasicInfoStyle}>
            <Col span={5} style={imgStyle}>
              <img
                src={this.props.store.playerData.playerImgUrl}
                alt={
                  this.props.store.playerData.playerFirstName +
                  " " +
                  this.props.store.playerData.playerLastName
                }
              />
            </Col>
            <Col style={cardStyle} span={13}>
              <Card title="Player Basic Info">
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
                  {"Team: " + this.props.store.playerData.playerTeam}
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
                  {"Draft: " + this.props.store.playerData.playerDraft}
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  {"Age: " + this.props.store.playerData.playerAge}
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  {"Seasons: " + this.props.store.playerData.playerExperience}
                </Card.Grid>
                <Card.Grid style={gridStyleBig}>
                  {"Prior: " + this.props.store.playerData.playerPrior}
                </Card.Grid>
              </Card>
            </Col>
            <Col style={performanceStyle} span={6}>
              <Provider store={this.props.store}>
                <PlayerPerformance setSeasonState={this.setSeasonState} />
              </Provider>
            </Col>
          </Row>
        </Spin>
        <Row>
          <Provider store={this.props.store}>
            <PlayerDataTable setSeasonState={this.setSeasonState} />
          </Provider>
        </Row>
        <Row gutter={16} style={{ paddingTop: 10 }}>
          <Col span={12}>
            <Provider store={this.props.store}>
              <PlayerCareerScore seasonState={this.state.seasonState} />
            </Provider>
          </Col>
          <Col span={12}>
            <Provider store={this.props.store}>
              <PlayerLastThreeYearBasic seasonState={this.state.seasonState} />
            </Provider>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Provider store={this.props.store}>
              <PlayerPerValueGraph />
            </Provider>
          </Col>
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
