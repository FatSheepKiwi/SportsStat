import React from "react";
import { Row, Col, Card, Spin, message } from "antd";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "./../apis/sportStatServer";
import { element } from "prop-types";
import ScatterPlotFGATSP from "./ScatterPlotFGATSP";
import ScatterPlotPTS3PA from "./ScatterPlotPTS3PA";
import ScatterPlotMINPTS from "./ScatterPlotMINPTS";
import ScatterPlotFGAEFF from "./ScatterPlotFGAEFF";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPlayerRanks: [],
      playerBios: []
    };
  }

  chooseRegularSeason = data => {
    var res = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].statType === "RegularSeason") {
        res.push(data[i]);
      }
    }
    return res;
  };

  fetchAllPlayerStat = () => {
    const url = "/player/average/season/2018-19";
    SportStatServer.get(url)
      .then(response => {
        var filterData = this.chooseRegularSeason(response.data);
        this.setState({
          allPlayerRanks: filterData
        });
        this.getStatRank("Points");
      })
      .catch(function(err) {
        console.log("error");
        message.error("Get player rank stats failed, please retry...");
      });

    SportStatServer.get("/player/all-bio")
      .then(response => {
        this.setState({
          playerBios: response.data
        });
      })
      .catch(err => {
        message.error("Fetch data failed, please retry...");
      });
  };

  componentDidMount = () => {
    this.fetchAllPlayerStat();
  };

  findPlayerName = id => {
    for (let i = 0; i < this.state.playerBios.length; i++) {
      if (this.state.playerBios[i].playerID === id) {
        return this.state.playerBios[i].playerName + " ";
      }
    }
  };

  getStatRank = type => {
    this.state.allPlayerRanks.sort((a, b) => b[type] - a[type]);
    var res = [];
    if (this.state.allPlayerRanks.length > 0) {
      for (let i = 0; i < 5; i++) {
        var cur = [];
        cur.push(this.findPlayerName(this.state.allPlayerRanks[i].playerID));
        cur.push(this.state.allPlayerRanks[i][type]);
        res.push(cur);
      }
    }
    return res;
  };

  render() {
    var pointsRes = this.getStatRank("Points");
    var reboundsRes = this.getStatRank("Rebounds");
    var assistsRes = this.getStatRank("Assists");
    var blocksRes = this.getStatRank("steals");
    var stealsRes = this.getStatRank("turnovers");
    var turnoversRes = this.getStatRank("blocks");
    console.log(this.state.playerBios);

    return (
      <div className="ui container">
        <div>
          <Row>
            <Col span={8}>
              <Card title="Points" style={{ width: "100%" }}>
                <p>1. {pointsRes[0]}</p>
                <p>2. {pointsRes[1]}</p>
                <p>3. {pointsRes[2]}</p>
                <p>4. {pointsRes[3]}</p>
                <p>5. {pointsRes[4]}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Rebounds" style={{ width: "100%" }}>
                <p>1. {reboundsRes[0]}</p>
                <p>2. {reboundsRes[1]}</p>
                <p>3. {reboundsRes[2]}</p>
                <p>4. {reboundsRes[3]}</p>
                <p>5. {reboundsRes[4]}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Assists" style={{ width: "100%" }}>
                <p>1. {assistsRes[0]}</p>
                <p>2. {assistsRes[1]}</p>
                <p>3. {assistsRes[2]}</p>
                <p>4. {assistsRes[3]}</p>
                <p>5. {assistsRes[4]}</p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Card title="Blocks" style={{ width: "100%" }}>
                <p>1. {blocksRes[0]}</p>
                <p>2. {blocksRes[1]}</p>
                <p>3. {blocksRes[2]}</p>
                <p>4. {blocksRes[3]}</p>
                <p>5. {blocksRes[4]}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Steals" style={{ width: "100%" }}>
                <p>1. {stealsRes[0]}</p>
                <p>2. {stealsRes[1]}</p>
                <p>3. {stealsRes[2]}</p>
                <p>4. {stealsRes[3]}</p>
                <p>5. {stealsRes[4]}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Turnovers" style={{ width: "100%" }}>
                <p>1. {turnoversRes[0]}</p>
                <p>2. {turnoversRes[1]}</p>
                <p>3. {turnoversRes[2]}</p>
                <p>4. {turnoversRes[3]}</p>
                <p>5. {turnoversRes[4]}</p>
              </Card>
            </Col>
          </Row>
          <h3 class="ui dividing header" style={{ margin: 20 }} />
          <Row gutter={16}>
            <Col span={12} sm={24} md={12}>
              <ScatterPlotMINPTS />
            </Col>
            <Col span={12} sm={24} md={12}>
              <ScatterPlotPTS3PA />
            </Col>
          </Row>
          <h3 class="ui dividing header" style={{ margin: 20 }} />
          <Row gutter={16}>
            <Col span={12} sm={24} md={12}>
              <ScatterPlotFGAEFF />
            </Col>
            <Col span={12} sm={24} md={12}>
              <ScatterPlotFGATSP />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Home = inject("store")(observer(Home));
export default Home;
