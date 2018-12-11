import React from "react";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "./../apis/sportStatServer";
import { Row, Col, Icon } from "antd";
import TeamTraditionalStat from "./TeamTraditionalStat";
import TeamOverallStatGraph from "./TeamOverallStatGraph";

class TeamDetail extends React.Component {
  state = { loading: true };

  fetchTeamBasicInfo = teamID => {
    const url = "/team/" + teamID;
    SportStatServer.get(url)
      .then(res => {
        if (!Array.isArray(res.data) || !res.data.length) {
          // array does not exist, is not an array, or is empty
          return;
        }
        const basicInfo = res.data[0];
        this.props.store.team.basicInfo = basicInfo;
        this.setState({ loading: false });
        console.log(basicInfo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchTeamTraditionalInfo = teamID => {
    const url = "/team/traditional-stat/" + teamID;
    SportStatServer.get(url)
      .then(res => {
        if (!Array.isArray(res.data) || !res.data.length) {
          // array does not exist, is not an array, or is empty
          return;
        }
        this.props.store.team.traditionalStat = res.data;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    if (typeof this.props.match.params.teamID !== "undefined") {
      this.fetchTeamBasicInfo(this.props.match.params.teamID);
      this.fetchTeamTraditionalInfo(this.props.match.params.teamID);
    }
  }

  render() {
    if (this.state.loading) {
      return <div> Loading... </div>;
    }
    const { basicInfo, traditionalStat } = this.props.store.team;
    if (!basicInfo.teamName) {
      return <div> Sorry, data query failed, please Retry... </div>;
    }
    return (
      <div className="ui container">
        <Row style={{ backgroundColor: "#FFFAFA" }}>
          <Col span={6}>
            <img
              width={272}
              height={272}
              alt="team logo"
              src={basicInfo.teamLogoUrl}
            />
          </Col>
          <Col span={18}>
            <div className="ui content" style={{ margin: 20 }}>
              <p> Team: {basicInfo.teamName}</p>
              <p> City: {basicInfo.teamCity}</p>
              <p>
                {" "}
                Arena: {basicInfo.teamArena} Capacity:{" "}
                {basicInfo.teamArenaCapacity}
              </p>
              <p> Owner: {basicInfo.teamOwner}</p>
              <p> Since: {basicInfo.teamYearfounded} </p>
              <p>Content:</p>
              <div>
                <a href={basicInfo.teamFackbookLink} style={{ margin: 5 }}>
                  <Icon type="facebook" />
                </a>
                <a href={basicInfo.teamTwitterLink} style={{ margin: 5 }}>
                  <Icon type="twitter" />
                </a>
                <a href={basicInfo.teamInstagramLink} style={{ margin: 5 }}>
                  <Icon type="instagram" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Provider store={this.props.store}>
            <TeamTraditionalStat />
          </Provider>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Provider store={this.props.store}>
              <TeamOverallStatGraph />
            </Provider>
          </Col>
          <Col span={12} />
        </Row>
      </div>
    );
  }
}

TeamDetail = inject("store")(observer(TeamDetail));
export default TeamDetail;
