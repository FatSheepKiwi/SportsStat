import React from "react";
import { List, Table, Icon } from "antd";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

const IconText = ({ type, href }) => (
  <span>
    <a href={href}>
      <Icon type={type} style={{ marginRight: 8 }} />
    </a>
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
  reloadPage = () => {
    window.location.reload();
  };

  render() {
    const teamBasicInfos = this.props.store.teamBasicInfos;
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
          dataSource={teamBasicInfos}
          footer={
            <div>
              <b>team</b> footer part
            </div>
          }
          renderItem={item => (
            <List.Item
              key={item.teamID}
              actions={[
                <IconText type="facebook" href={item.teamFackbookLink} />,
                <IconText type="twitter" href={item.teamTwitterLink} />,
                <IconText type="instagram" href={item.teamInstagramLink} />
              ]}
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
                  <Link to={`/team/${item.teamID}`} onClick={this.reloadPage}>
                    {"Team:" + item.teamName}
                  </Link>
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
