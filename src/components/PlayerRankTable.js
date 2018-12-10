import React from "react";
import { Row, Col, Table, Radio, Spin } from "antd";
import { observer, inject, Provider } from "mobx-react";

class PlayerRankTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          seasonSelect: "Regular"
      };
    }

    handleDataSourceChange = e => {
        this.setState({
            seasonSelect: e.target.value
        });
        this.props.setSeasonRankState(e.target.value);
    }

    render() {
        const columns = [
          {
            title: "StatType",
            dataIndex: "statType",
            key: "statType",
            filteredValue: [this.state.seasonSelect],
            onFilter: (value, record) => record.statType.includes(value)
          },
          {
            title: "Season",
            dataIndex: "seasonID",
            key: "seasonID"
          },
          {
            title: "Team",
            dataIndex: "teamAbbreviation",
            key: "teamAbbreviation"
          },
          {
            title: "MIN",
            dataIndex: "minute",
            key: "minute"
          },
          {
            title: "FGM",
            dataIndex: "fieldGoalsMade",
            key: "fieldGoalsMade"
          },
          {
            title: "FGA",
            dataIndex: "fieldGoalsAttempted",
            key: "fieldGoalsAttempted"
          },
          {
            title: "FGP",
            dataIndex: "fieldGoalPercentage",
            key: "fieldGoalPercentage"
          },
          {
            title: "3PM",
            dataIndex: "threePointFieldGoalsMade",
            key: "threePointFieldGoalsMade"
          },
          {
            title: "3PA",
            dataIndex: "threePointFieldGoalsAttempted",
            key: "threePointFieldGoalsAttempted"
          },
          {
            title: "3P%",
            dataIndex: "threePointFieldGoalsPercentage",
            key: "threePointFieldGoalsPercentage"
          },
          {
            title: "FTM",
            dataIndex: "freeThrowsMade",
            key: "freeThrowsMade"
          },
          {
            title: "FTA",
            dataIndex: "freeThrowsAttempted",
            key: "freeThrowsAttempted"
          },
          {
            title: "FTP",
            dataIndex: "freeThrowPercentage",
            key: "freeThrowPercentage"
          },
          {
            title: "OREB",
            dataIndex: "offensiveRebounds",
            key: "offensiveRebounds"
          },
          {
            title: "DREB",
            dataIndex: "defensiveRebounds",
            key: "defensiveRebounds"
          },
          {
            title: "REB",
            dataIndex: "rebounds",
            key: "rebounds"
          },
          {
            title: "AST",
            dataIndex: "assists",
            key: "assists"
          },
          {
            title: "STL",
            dataIndex: "steals",
            key: "steals"
          },
          {
            title: "BLK",
            dataIndex: "blocks",
            key: "blocks"
          },
          {
            title: "TO",
            dataIndex: "turnovers",
            key: "turnovers"
          },
          {
            title: "PTS",
            dataIndex: "points",
            key: "points"
          },
          {
            title: "EFF",
            dataIndex: "efficiency",
            key: "efficiency"
          }
        ];
    
        return (
          <div>
            <div style={{textAlign: "center", fontWeight: "bold", fontSize: 40}}>
              <span>Player Rank Table</span>
            </div>
            <div style={{ paddingTop: 10 }}>
              <div style={{ paddingBottom: 10 }}>
                <span style={{ paddingLeft: 10, fontWeight: "bold" }}>
                  Season Type:{" "}
                </span>
                <Radio.Group
                  value={this.state.seasonSelect}
                  onChange={this.handleDataSourceChange}
                >
                  <Radio.Button value="Regular">RegularSeason</Radio.Button>
                  <Radio.Button value="Post">PostSeason</Radio.Button>
                </Radio.Group>
              </div>
              <div>
                <Table
                  size={"small"}
                  pagination={false}
                  columns={columns}
                  dataSource={this.props.store.playerRankStatistic}
                />
              </div>
            </div>
          </div>
        );
      }
}


PlayerRankTable = inject("store")(observer(PlayerRankTable));
export default PlayerRankTable;