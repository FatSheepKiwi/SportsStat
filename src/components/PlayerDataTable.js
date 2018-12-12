import React from "react";
import { Table, Radio, Spin } from "antd";
import { observer, inject } from "mobx-react";

class PlayerDataTable extends React.Component {
  state = {
    seasonSelect: "Regular"
  };

  handleDataSourceChange = e => {
    // console.log(e.target.value);
    this.setState({
      seasonSelect: e.target.value
    });
    this.props.setSeasonState(e.target.value);
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
        width: 100,
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
        title: "Played",
        width: columnWidth,
        dataIndex: "gamePlayed",
        key: "gamePlayed"
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
        dataIndex: "Rebounds",
        key: "Rebounds"
      },
      {
        title: "AST",
        width: columnWidth,
        dataIndex: "Assists",
        key: "Assists"
      },
      {
        title: "TO",
        width: columnWidth,
        dataIndex: "blocks",
        key: "blocks"
      },
      {
        title: "STL",
        width: columnWidth,
        dataIndex: "turnovers",
        key: "turnovers"
      },
      {
        title: "BLK",
        width: columnWidth,
        dataIndex: "steals",
        key: "steals"
      },
      {
        title: "PF",
        width: columnWidth,
        dataIndex: "personalFouls",
        key: "personalFouls"
      },
      {
        title: "PTS",
        width: columnWidth,
        dataIndex: "Points",
        key: "Points"
      }
    ];

    return (
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
            <Radio.Button value="AllStar">AllStar</Radio.Button>
            <Radio.Button value="Pre">PreSeason</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Table
            size={"small"}
            pagination={false}
            columns={columns}
            dataSource={this.props.store.playerStatistic}
            scroll={{ x: 1540 }}
          />
        </div>
      </div>
    );
  }
}

PlayerDataTable = inject("store")(observer(PlayerDataTable));
export default PlayerDataTable;
