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
  };

  render() {
    const columnWidth = 60;

    const columns = [
      {
        title: "StatType",
        dataIndex: "statType",
        key: "statType",
        filteredValue: [this.state.seasonSelect],
        onFilter: (value, record) => record.statType.includes(value),
        fixed: "left"
      },
      {
        title: "Season",
        dataIndex: "seasonID",
        key: "seasonID",
        fixed: "left"
      },
      {
        title: "Team",
        width: columnWidth,
        dataIndex: "teamAbbreviation",
        key: "teamAbbreviation"
      },
      {
        title: "MIN",
        width: columnWidth,
        dataIndex: "minute",
        key: "minute"
      },
      {
        title: "FGM",
        width: columnWidth,
        dataIndex: "fieldGoalsMade",
        key: "fieldGoalsMade"
      },
      {
        title: "FGA",
        width: columnWidth,
        dataIndex: "fieldGoalsAttempted",
        key: "fieldGoalsAttempted"
      },
      {
        title: "FGP",
        width: columnWidth,
        dataIndex: "fieldGoalPercentage",
        key: "fieldGoalPercentage"
      },
      {
        title: "3PM",
        width: columnWidth,
        dataIndex: "threePointFieldGoalsMade",
        key: "threePointFieldGoalsMade"
      },
      {
        title: "3PA",
        width: columnWidth,
        dataIndex: "threePointFieldGoalsAttempted",
        key: "threePointFieldGoalsAttempted"
      },
      {
        title: "3P%",
        width: columnWidth,
        dataIndex: "threePointFieldGoalsPercentage",
        key: "threePointFieldGoalsPercentage"
      },
      {
        title: "FTM",
        width: columnWidth,
        dataIndex: "freeThrowsMade",
        key: "freeThrowsMade"
      },
      {
        title: "FTA",
        width: columnWidth,
        dataIndex: "freeThrowsAttempted",
        key: "freeThrowsAttempted"
      },
      {
        title: "FTP",
        width: columnWidth,
        dataIndex: "freeThrowPercentage",
        key: "freeThrowPercentage"
      },
      {
        title: "OREB",
        width: columnWidth,
        dataIndex: "offensiveRebounds",
        key: "offensiveRebounds"
      },
      {
        title: "DREB",
        width: columnWidth,
        dataIndex: "defensiveRebounds",
        key: "defensiveRebounds"
      },
      {
        title: "REB",
        width: columnWidth,
        dataIndex: "rebounds",
        key: "rebounds"
      },
      {
        title: "AST",
        width: columnWidth,
        dataIndex: "assists",
        key: "assists"
      },
      {
        title: "STL",
        width: columnWidth,
        dataIndex: "steals",
        key: "steals"
      },
      {
        title: "BLK",
        width: columnWidth,
        dataIndex: "blocks",
        key: "blocks"
      },
      {
        title: "TO",
        width: columnWidth,
        dataIndex: "turnovers",
        key: "turnovers"
      },
      {
        title: "PTS",
        width: columnWidth,
        dataIndex: "points",
        key: "points"
      },
      {
        title: "EFF",
        width: columnWidth,
        dataIndex: "efficiency",
        key: "efficiency"
      }
    ];

    return (
      <div>
        <div style={{ textAlign: "center", fontWeight: "bold", fontSize: 40 }}>
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
              <Radio.Button value="Post">Playoffs</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <Table
              size={"small"}
              pagination={false}
              columns={columns}
              dataSource={this.props.store.playerRankStatistic}
              scroll={{ x: 1400 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

PlayerRankTable = inject("store")(observer(PlayerRankTable));
export default PlayerRankTable;
