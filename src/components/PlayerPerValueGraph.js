import React from "react";
import { Select, Radio, Spin } from "antd";
import { observer, inject, Provider } from "mobx-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TABS = ["PER", "TSP", "EFG", "AST%", "TOV%"];

const TITLE_MAP = {
  PER: "Per Value",
  TSP: "True Shooting Percentage",
  EFG: "Effective Field Goals Percentage",
  "AST%": "Assist Ratio",
  "TOV%": "Turnover Ratio"
};

const URL_MAP = {
  PER:
    "https://bleacherreport.com/articles/113144-cracking-the-code-how-to-calculate-hollingers-per-without-all-the-mess",
  TSP: "https://en.wikipedia.org/wiki/True_shooting_percentage",
  EFG: "https://en.wikipedia.org/wiki/Effective_field_goal_percentage",
  "AST%": "https://www.nbastuffer.com/analytics101/assist-ratio/",
  "TOV%": "https://www.nbastuffer.com/analytics101/turnover-ratio/"
};

const PARA = [
  85.91,
  53.897,
  51.757,
  46.845,
  39.19,
  39.19,
  34.677,
  14.707,
  -17.174,
  -20.091,
  -39.19,
  -53.897
];

const KEY = [
  "fieldGoalsMade",
  "turnovers",
  "threePointFieldGoalsMade",
  "freeThrowsMade",
  "steals",
  "offensiveRebounds",
  "Assists",
  "defensiveRebounds",
  "personalFouls"
];

class PlayerPerValueGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: TABS[0]
    };
  }

  getXAxis = seasonType => {
    var res = [];
    this.props.store.playerStatistic.forEach(element => {
      if (element.statType === seasonType) {
        res.push(element.seasonID);
      }
    });
    return res;
  };

  calculatePerValue = element => {
    var res = 0,
      i = 0;
    for (i = 0; i < KEY.length; i++) {
      res += PARA[i] * element[KEY[i]];
    }
    res += PARA[i++] * (element.freeThrowsAttempted - element.freeThrowsMade);
    res += PARA[i++] * (element.fieldGoalsAttempted - element.fieldGoalsMade);
    res += PARA[i] * element.blocks;
    res /= element.minute;

    return res;
  };

  calculateTrueShootingPercentage = element => {
    var res =
      element.Points /
      (2 * (element.fieldGoalsAttempted + 0.44 * element.freeThrowsAttempted));
    return res;
  };

  calculateEffectiveFieldGoals = element => {
    var res =
      (element.fieldGoalsMade + 0.5 * element.threePointFieldGoalsMade) /
      element.fieldGoalsAttempted;
    return res;
  };

  calculateAssistRatio = element => {
    var res =
      (element.Assists * 100) /
      (element.fieldGoalsAttempted +
        element.freeThrowsAttempted * 0.44 +
        element.Assists +
        element.blocks);
    return res;
  };

  calculateTurnoverRatio = element => {
    var res =
      (element.blocks * 100) /
      (element.fieldGoalsAttempted +
        0.44 * element.freeThrowsAttempted +
        element.Assists +
        element.blocks);
    return res;
  };

  getPerValueBasedOnSeasonType = (seasonType, seasons) => {
    var res = [];
    if (seasons.length === 0) {
      this.props.store.playerStatistic.forEach(element => {
        if (element.statType === seasonType) {
          if (this.state.tab === "PER") {
            var curPerValue = this.calculatePerValue(element);
            res.push(curPerValue);
          } else if (this.state.tab === "TSP") {
            var curTrueShooting = this.calculateTrueShootingPercentage(element);
            res.push(curTrueShooting);
          } else if (this.state.tab === "EFG") {
            var curEffectiveFieldGoal = this.calculateEffectiveFieldGoals(
              element
            );
            res.push(curEffectiveFieldGoal);
          } else if (this.state.tab === "AST%") {
            var curAssistRatio = this.calculateAssistRatio(element);
            res.push(curAssistRatio);
          } else if (this.state.tab === "TOV%") {
            var curTurnoverRatio = this.calculateTurnoverRatio(element);
            res.push(curTurnoverRatio);
          }
        }
      });
    } else {
      var i = 0;
      this.props.store.playerStatistic.forEach(element => {
        if (element.statType === seasonType) {
          while (element.seasonID != seasons[i]) {
            res.push(0);
            i++;
          }
          if (this.state.tab === "PER") {
            var curPerValue = this.calculatePerValue(element);
            res.push(curPerValue);
          } else if (this.state.tab === "TSP") {
            var curTrueShooting = this.calculateTrueShootingPercentage(element);
            res.push(curTrueShooting);
          } else if (this.state.tab === "EFG") {
            var curEffectiveFieldGoal = this.calculateEffectiveFieldGoals(
              element
            );
            res.push(curEffectiveFieldGoal);
          } else if (this.state.tab === "AST%") {
            var curAssistRatio = this.calculateAssistRatio(element);
            res.push(curAssistRatio);
          } else if (this.state.tab === "TOV%") {
            var curTurnoverRatio = this.calculateTurnoverRatio(element);
            res.push(curTurnoverRatio);
          }

          i++;
        }
      });
    }
    return res;
  };

  getTitle = () => {
    return (
      this.props.store.playerData.playerFirstName +
      " " +
      this.props.store.playerData.playerLastName +
      "'s " +
      TITLE_MAP[this.state.tab] +
      " Board"
    );
  };

  getURL = () => {
    return (
      "Reference: " +
      "<a href='" +
      URL_MAP[this.state.tab] +
      "'>" +
      TITLE_MAP[this.state.tab] +
      "</a>"
    );
  };

  onChange = e => {
    console.log(e);
    this.setState({
      tab: e.target.value
    });
  };

  render() {
    const options = {
      chart: {
        type: "column"
      },
      title: {
        text: this.getTitle()
      },
      subtitle: {
        text: this.getURL()
      },
      plotOptions: {
        column: {
          depth: 25
        }
      },
      xAxis: {
        title: {
          text: "Season"
        },
        categories: this.getXAxis("RegularSeason")
      },
      yAxis: {
        title: {
          text: null
        }
      },
      series: [
        {
          color: "rgba(140, 199, 181, 0.8)",
          name: "RegularSeason",
          data: this.getPerValueBasedOnSeasonType("RegularSeason", [])
        },
        {
          color: "rgba(85, 66, 54, 0.8)",
          name: "PostSeason",
          data: this.getPerValueBasedOnSeasonType(
            "PostSeason",
            this.getXAxis("RegularSeason")
          )
        }
      ]
    };

    return (
      <div style={{ paddingTop: 10 }}>
        <div style={{ paddingBottom: 10 }}>
          <Radio.Group value={this.state.tab} onChange={this.onChange}>
            <Radio.Button value="PER">PER</Radio.Button>
            <Radio.Button value="TSP">TSP</Radio.Button>
            <Radio.Button value="EFG">EFG</Radio.Button>
            <Radio.Button value="AST%">AST%</Radio.Button>
            <Radio.Button value="TOV%">TOV%</Radio.Button>
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

PlayerPerValueGraph = inject("store")(observer(PlayerPerValueGraph));
export default PlayerPerValueGraph;
