import React from "react";
import { Row, Col } from "antd";
import TeamLastThreeYearBasic from "./TeamLastThreeYearBasic";
import { observer, inject, Provider } from "mobx-react";
import TeamList from "./TeamList";
import SportStatServer from "../apis/sportStatServer";

class Team extends React.Component {
  fetchTeamBasicInfo = () => {
    SportStatServer.get("/team")
      .then(results => {
        console.log(results.data);
        this.props.store.teamBasicInfo = results.data;
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchTeamBasicInfo();
  }

  render() {
    return (
      <div className="ui container">
        <Provider store={this.props.store}>
          <TeamList teamBasicInfo={this.props.store.teamBasicInfo} />
        </Provider>
      </div>
    );
  }
}

Team = inject("store")(observer(Team));
export default Team;
