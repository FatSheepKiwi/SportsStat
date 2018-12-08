import React from "react";
import { Row, Col, Table, Radio, Spin } from "antd";
import { observer, inject, Provider } from "mobx-react";

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
        title: "Played",
        dataIndex: "gamePlayed",
        key: "gamePlayed"
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
        dataIndex: "Rebounds",
        key: "Rebounds"
      },
      {
        title: "AST",
        dataIndex: "Assists",
        key: "Assists"
      },
      {
        title: "TO",
        dataIndex: "blocks",
        key: "blocks"
      },
      {
        title: "STL",
        dataIndex: "turnovers",
        key: "turnovers"
      },
      {
        title: "BLK",
        dataIndex: "steals",
        key: "steals"
      },
      {
        title: "PF",
        dataIndex: "personalFouls",
        key: "personalFouls"
      },
      {
        title: "PTS",
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
            <Radio.Button value="Post">PostSeason</Radio.Button>
            <Radio.Button value="AllStar">AllStarSeason</Radio.Button>
            <Radio.Button value="Pre">PreSeason</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Table
            size={"small"}
            pagination={false}
            columns={columns}
            dataSource={this.props.store.playerStatistic}
          />
        </div>
      </div>
    );
  }
}

PlayerDataTable = inject("store")(observer(PlayerDataTable));
export default PlayerDataTable;
