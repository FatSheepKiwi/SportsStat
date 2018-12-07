import React from "react";
import { Select, Spin } from "antd";
import { observer, inject, Provider } from "mobx-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TABS = [
  "MIN",
  "FGM",
  "FGA",
  "FGP",
  "3PM",
  "3PA",
  "3P%",
  "FTM",
  "FTA",
  "FTP",
  "OREB",
  "DREB",
  "REB",
  "AST",
  "TO",
  "STL",
  "BLK",
  "PF",
  "PTS"
];
const MAP = {
  MIN: "minute",
  FGM: "fieldGoalsMade",
  FGA: "fieldGoalsAttempted",
  FGP: "fieldGoalPercentage",
  "3PM": "threePointFieldGoalsMade",
  "3PA": "threePointFieldGoalsAttempted",
  "3P%": "threePointFieldGoalsPercentage",
  FTM: "freeThrowsMade",
  FTA: "freeThrowsAttempted",
  FTP: "freeThrowPercentage",
  OREB: "offensiveRebounds",
  DREB: "defensiveRebounds",
  REB: "Rebounds",
  AST: "Assists",
  TO: "turnovers",
  STL: "steals",
  BLK: "blocks",
  PF: "personalFouls",
  PTS: "Points"
};

const TITLE_MAP = {
  MIN: "Minute",
  FGM: "FieldGoalsMade",
  FGA: "FieldGoalsAttempted",
  FGP: "FieldGoalPercentage",
  "3PM": "ThreePointFieldGoalsMade",
  "3PA": "ThreePointFieldGoalsAttempted",
  "3P%": "ThreePointFieldGoalsPercentage",
  FTM: "FreeThrowsMade",
  FTA: "FreeThrowsAttempted",
  FTP: "FreeThrowPercentage",
  OREB: "OffensiveRebounds",
  DREB: "DefensiveRebounds",
  REB: "Rebounds",
  AST: "Assists",
  TO: "Turnovers",
  STL: "Steals",
  BLK: "Blocks",
  PF: "PersonalFouls",
  PTS: "Points"
};

class PlayerCareerScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: TABS[0]
    };
  }

  getXAxis = () => {
    var res = [];
    var curSeasonState = this.props.seasonState;
    this.props.store.playerStatistic.forEach(element => {
      if (curSeasonState === "Regular") {
        if (element.statType === "RegularSeason") {
          res.push(element.seasonID);
        }
      } else if (curSeasonState === "Post") {
        if (element.statType === "PostSeason") {
          res.push(element.seasonID);
        }
      } else if (curSeasonState === "AllStar") {
        if (element.statType === "AllStarSeason") {
          res.push(element.seasonID);
        }
      } else if (curSeasonState === "Pre") {
        if (element.statType === "PreSeason") {
          res.push(element.seasonID);
        }
      }
    });
    return res;
  };

  getData = key => {
    var res = [];
    var curSeasonState = this.props.seasonState;
    this.props.store.playerStatistic.forEach(element => {
      if (curSeasonState === "Regular") {
        if (element.statType === "RegularSeason") {
          res.push(element[key]);
        }
      } else if (curSeasonState === "Post") {
        if (element.statType === "PostSeason") {
          res.push(element[key]);
        }
      } else if (curSeasonState === "AllStar") {
        if (element.statType === "AllStarSeason") {
          res.push(element[key]);
        }
      } else if (curSeasonState === "Pre") {
        if (element.statType === "PreSeason") {
          res.push(element[key]);
        }
      }
    });
    return res;
  };
  onTabChange = value => {
    this.setState(state => ({
      tab: value
    }));
  };

  render() {
    const options = {
      title: {
        text:
          this.props.store.playerData.playerFirstName +
          " " +
          this.props.store.playerData.playerLastName +
          "'s Career " +
          TITLE_MAP[this.state.tab] +
          " Board"
      },

      yAxis: {
        title: {
          text: MAP[this.state.tab]
        }
      },

      xAxis: {
        title: {
          text: "Season"
        },
        categories: this.getXAxis() //['2009-2010', '2010-2011', '2011-2012', '2012-2013','2013-2014', '2014-2015', '2015-2016', '2016-2017', '2017-2018']
      },
      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          }
          //pointStart: 2010
        }
      },

      series: [
        {
          // name: 'Average Scores per Season',
          name: "value",
          data: this.getData(MAP[this.state.tab]) //[9.9, 12.2, 16.8, 25.9, 25.4, 27.4, 29.0, 29.1, 30.4]
        }
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      }
    };
    return (
      <div>
        <div>
          <Select
            defaultValue={this.state.tab}
            style={{ paddingLeft: 20, width: 100 }}
            onChange={this.onTabChange}
          >
            {TABS.map(t => (
              <Select.Option value={t}>{t}</Select.Option>
            ))}
          </Select>
        </div>
        <Spin spinning={this.props.store.loadingInfo}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Spin>
      </div>
    );
  }
}

PlayerCareerScore = inject("store")(observer(PlayerCareerScore));
export default PlayerCareerScore;
