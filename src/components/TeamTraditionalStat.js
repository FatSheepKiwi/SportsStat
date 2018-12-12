import React from "react";
import { observer, inject } from "mobx-react";
import { Row, Col, Table, Radio, Spin } from "antd";

class TeamTraditionalStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: "Overall"
    };
  }

  handleDataSourceChange = e => {
    this.setState({
      group: e.target.value
    });
  };

  render() {
    const columnWidth = 60;

    const columns = [
      {
        title: "GroupValue",

        dataIndex: "groupValue",
        key: "groupSet",
        filteredValue: [this.state.group],
        onFilter: (value, record) => record.groupSet.includes(value),
        fixed: "left"
      },
      {
        title: "GP",
        width: columnWidth,
        dataIndex: "gamePlayed",
        key: "gamePlayed"
      },
      {
        title: "Win",
        width: columnWidth,
        dataIndex: "win",
        key: "win"
      },
      {
        title: "Lose",
        width: columnWidth,
        dataIndex: "lose",
        key: "lose"
      },
      {
        title: "WP",
        width: columnWidth,
        dataIndex: "winPercentage",
        key: "winPercentage"
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
        dataIndex: "asists",
        key: "asists"
      },
      {
        title: "TOV",
        width: columnWidth,
        dataIndex: "turnovers",
        key: "turnovers"
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
        title: "BFGA",
        width: columnWidth,
        dataIndex: "blockFieldGoalsAttempted",
        key: "blockFieldGoalsAttempted"
      },
      {
        title: "PF",
        width: columnWidth,
        dataIndex: "personalFouls",
        key: "personalFouls"
      },
      {
        title: "PFD",
        width: columnWidth,
        dataIndex: "personalFoulsDrawn",
        key: "personalFoulsDrawn"
      },
      {
        title: "PTS",
        width: columnWidth,
        dataIndex: "points",
        key: "points"
      },
      {
        title: "+/-",
        width: columnWidth,
        dataIndex: "plusMinus",
        key: "plusMinus"
      }
    ];

    return (
      <div>
        <div>
          <Radio.Group
            value={this.state.group}
            onChange={this.handleDataSourceChange}
          >
            <Radio.Button value="Overall">Overall</Radio.Button>
            <Radio.Button value="Location">Location</Radio.Button>
            <Radio.Button value="Wins/Losses">Wins/Losses</Radio.Button>
          </Radio.Group>
        </div>
        <Table
          size={"middle"}
          pagination={false}
          columns={columns}
          dataSource={this.props.store.team.traditionalStat}
          scroll={{ x: 1670 }}
        />
      </div>
    );
  }
}

TeamTraditionalStat = inject("store")(observer(TeamTraditionalStat));
export default TeamTraditionalStat;
