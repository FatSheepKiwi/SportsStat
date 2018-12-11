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
        dataIndex: "gamePlayed",
        key: "gamePlayed"
      },
      {
        title: "Win",
        dataIndex: "win",
        key: "win"
      },
      {
        title: "Lose",
        dataIndex: "lose",
        key: "lose"
      },
      {
        title: "WP",
        dataIndex: "winPercentage",
        key: "winPercentage"
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
        dataIndex: "asists",
        key: "asists"
      },
      {
        title: "TOV",
        dataIndex: "turnovers",
        key: "turnovers"
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
        title: "BFGA",
        dataIndex: "blockFieldGoalsAttempted",
        key: "blockFieldGoalsAttempted"
      },
      {
        title: "PF",
        dataIndex: "personalFouls",
        key: "personalFouls"
      },
      {
        title: "PFD",
        dataIndex: "personalFoulsDrawn",
        key: "personalFoulsDrawn"
      },
      {
        title: "PTS",
        dataIndex: "points",
        key: "points"
      },
      {
        title: "+/-",
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
          size={"small"}
          pagination={false}
          columns={columns}
          dataSource={this.props.store.team.traditionalStat}
          scroll={{ x: true }}
        />
      </div>
    );
  }
}

TeamTraditionalStat = inject("store")(observer(TeamTraditionalStat));
export default TeamTraditionalStat;
