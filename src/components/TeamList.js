import React from "react";
import { List, Table, Icon } from "antd";
import { observer, inject } from "mobx-react";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const columns = [
  {
    title: "TeamAbbreviation",
    dataIndex: "teamAbbreviation",
    key: "teamAbbreviation"
  },
  {
    title: "Founded",
    dataIndex: "teamYearfounded",
    key: "teamYearfounded"
  },
  {
    title: "Arena",
    dataIndex: "teamArena",
    key: "teamArena"
  },
  {
    title: "Owner",
    dataIndex: "teamOwner",
    key: "teamOwner"
  },
  {
    title: "LeaderPoints",
    dataIndex: "teamLeaderPoints",
    key: "teamLeaderPoints"
  }
];

class TeamList extends React.Component {
  render() {
    const teamBasicInfo = this.props.teamBasicInfo;
    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 8
          }}
          dataSource={teamBasicInfo}
          footer={
            <div>
              <b>team</b> footer part
            </div>
          }
          renderItem={item => (
            <List.Item
              key={item.teamID}
              extra={
                <img
                  width={272}
                  height={272}
                  alt="team logo"
                  src={item.teamLogoUrl}
                />
              }
            >
              <List.Item.Meta
                title={
                  <a href={item.teamTwitterLink}>{"Team:" + item.teamName}</a>
                }
                description={"City:" + item.teamCity}
              />
              <Table
                dataSource={[item]}
                columns={columns}
                pagination={{ hideOnSinglePage: true }}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

TeamList = inject("store")(observer(TeamList));
export default TeamList;
