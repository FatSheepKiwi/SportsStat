import React from "react";
import { Row, Col, Card, Spin } from "antd";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "../apis/sportStatServer";
import PlayerDataTable from "./PlayerDataTable";
import PlayerCareerScore from "./PlayerCareerScore";
import PlayerLastThreeYearBasic from "./PlayerLastThreeYearBasic";
import PlayerPerformance from "./PlayerPerformance";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonState: "Regular"
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

  getPlayerInfo = value => {
    this.props.store.loading = true;
    value = value.trim();
    var url = "/player?playerName=" + value;
    SportStatServer.get(url)
      .then(response => {
        console.log(response.data);
        this.props.store.playerData = response.data;
        this.props.store.loadingInfo = false;
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

  componentWillMount() {
    this.getPlayerInfo("Stephen Curry");
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
      paddingTop: 20
    };
    const cardStyle = {
      paddingTop: 20
    };
    const performanceStyle = {
      paddingBottom: 10
    };

    return (
      <div>
        <Spin spinning={this.props.store.loadingInfo}>
          <Row style={{ backgroundColor: "rgba(0,0,139,0.2)" }}>
            <Col span={5}>
              <img
                style={imgStyle}
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
      </div>
    );
  }
}

Player = inject("store")(observer(Player));
export default Player;
