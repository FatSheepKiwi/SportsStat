import React from "react";
import { Row, Col } from "antd";
import TeamLastThreeYearBasic from "./TeamLastThreeYearBasic";
import { observer, inject, Provider } from "mobx-react";
import TeamList from "./TeamList";
import SportStatServer from "../apis/sportStatServer";

class Team extends React.Component {
  state = { loading: true };
  fetchTeamBasicInfo = () => {
    SportStatServer.get("/team")
      .then(results => {
        this.setState({ loading: false });
        this.props.store.teamBasicInfos = results.data;
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchTeamBasicInfo();
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p />
        </div>
      );
    }
    return (
      <div className="ui container">
        <Provider store={this.props.store}>
          <TeamList teamBasicInfos={this.props.store.teamBasicInfos} />
        </Provider>
      </div>
    );
  }
}

Team = inject("store")(observer(Team));
export default Team;
