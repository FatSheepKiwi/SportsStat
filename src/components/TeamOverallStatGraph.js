import React from "react";
import { Select, Spin } from "antd";
import { observer, inject, Provider } from "mobx-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { element } from "prop-types";

const TABS = [
  "WP",
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
  "TOV",
  "STL",
  "BLK",
  "BFGA",
  "PF",
  "PTS",
  "+/-"
];

const MAP = {
  WP: "winPercentage",
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
  REB: "rebounds",
  AST: "asists",
  TOV: "turnovers",
  STL: "steals",
  BLK: "blocks",
  BFGA: "blockFieldGoalsAttempted",
  PF: "personalFouls",
  PTS: "points",
  "+/-": "plusMinus"
};

class TeamOverallStatGraph extends React.Component {
  state = { traditionalStat: [] };

  constructor(props) {
    super(props);
    this.state = {
      tab: TABS[0]
    };
  }

  getXAxis = () => {
    var res = [];
    this.state.traditionalStat.forEach(element => {
      if (element.groupSet === "Overall") {
        res.push(element.groupValue);
      }
    });
    return res;
  };

  getData = key => {
    var res = [];
    this.state.traditionalStat.forEach(element => {
      if (element.groupSet === "Overall") {
        res.push(element[key]);
      }
    });
    return res;
  };

  onTabChange = value => {
    this.setState(state => ({
      tab: value
    }));
  };

  componentDidMount() {
    console.log(this.props.store.team.traditionalStat);
    this.setState({ traditionalStat: this.props.store.team.traditionalStat });
  }

  render() {
    if (
      !Array.isArray(this.state.traditionalStat) ||
      !this.state.traditionalStat.length
    ) {
      // array does not exist, is not an array, or is empty
      return <div>Loading...</div>;
    }

    const options = {
      title: {
        text: "Team Overall " + this.state.tab + " Board"
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
        }
      },

      series: [
        {
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
            style={{ paddingBottom: 10, width: 100 }}
            onChange={this.onTabChange}
          >
            {TABS.map(t => (
              <Select.Option value={t}>{t}</Select.Option>
            ))}
          </Select>
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

TeamOverallStatGraph = inject("store")(observer(TeamOverallStatGraph));
export default TeamOverallStatGraph;
