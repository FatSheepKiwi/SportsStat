import React from "react";
import { Select, Radio, Spin } from "antd";
import { observer, inject, Provider } from "mobx-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TABS = ["PTS", "REB", "AST", "STL", "BLK"];

const MAP = {
  PTS: "Points",
  REB: "Rebounds",
  AST: "Assists",
  STL: "steals",
  BLK: "blocks"
};

const TITLE_MAP = {
  PTS: "Points",
  REB: "Rebounds",
  AST: "Assists",
  STL: "Steals",
  BLK: "Blocks"
};

class PlayerLastThreeYearBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: TABS[0]
    };
  }

  getCurSeasonTotalData = element => {
    var curSeason = {
      name: element.seasonID,
      y: parseInt(element.gamePlayed * element[MAP[this.state.tab]])
    };
    return curSeason;
  };

  getCareerTotalData = () => {
    var res = [];
    // var totalPoints = 0, totalRebounds = 0, totalAssists = 0, totalBlocks = 0, totalSteals = 0;
    var curSeasonState = this.props.seasonState;
    this.props.store.playerStatistic.forEach(element => {
      if (curSeasonState === "Regular") {
        if (element.statType === "RegularSeason") {
          var curSeasonTotal = this.getCurSeasonTotalData(element);
          res.push(curSeasonTotal);
        }
      } else if (curSeasonState === "Post") {
        if (element.statType === "PostSeason") {
          var curSeasonTotal = this.getCurSeasonTotalData(element);
          res.push(curSeasonTotal);
        }
      } else if (curSeasonState === "AllStar") {
        if (element.statType === "AllStarSeason") {
          var curSeasonTotal = this.getCurSeasonTotalData(element);
          res.push(curSeasonTotal);
        }
      } else if (curSeasonState === "Pre") {
        if (element.statType === "PreSeason") {
          var curSeasonTotal = this.getCurSeasonTotalData(element);
          res.push(curSeasonTotal);
        }
      }
    });
    return res;
  };

  onTabChange = e => {
    console.log(e);
    this.setState({
      tab: e.target.value
    });
  };

  render() {
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      title: {
        text:
          this.props.store.playerData.playerFirstName +
          " " +
          this.props.store.playerData.playerLastName +
          " total " +
          TITLE_MAP[this.state.tab] +
          " per season"
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                "black"
            }
          }
        }
      },
      series: [
        {
          name: "Seasons",
          colorByPoint: true,
          data: this.getCareerTotalData()
        }
      ]
    };

    return (
      <div>
        <div>
          <Radio.Group value={this.state.tab} onChange={this.onTabChange}>
            <Radio.Button value="PTS">PTS</Radio.Button>
            <Radio.Button value="REB">REB</Radio.Button>
            <Radio.Button value="AST">AST</Radio.Button>
            <Radio.Button value="BLK">BLK</Radio.Button>
            <Radio.Button value="STL">STL</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Spin spinning={this.props.store.loadingInfo}>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Spin>
        </div>
      </div>
    );
  }
}

PlayerLastThreeYearBasic = inject("store")(observer(PlayerLastThreeYearBasic));
export default PlayerLastThreeYearBasic;
