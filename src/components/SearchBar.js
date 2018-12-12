import React from "react";
import { AutoComplete, message } from "antd";
import SportStatServer from "../apis/sportStatServer";
import { observer, inject, Provider } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import _ from "lodash";

//const dataSource = ['James Harden', 'Stephen Curry', 'Lebron James'];

class SearchBar extends React.Component {
  state = {
    playerNames: [],
    teamNames: []
  };

  getNames = () => {
    var res = [];
    _.forEach(this.state.playerNames, element => {
      res.push(element.playerName);
    });
    _.forEach(this.state.teamNames, element => {
      res.push(element.teamName);
    });
    return res;
  };

  loadSearchResultPage = value => {
    const foundTeam = _.find(this.state.teamNames, { teamName: value });
    if (typeof foundTeam === "undefined") {
      // This value is a player Name
      const target = _.find(this.state.playerNames, { playerName: value });
      console.log("target: " + target);
      if (typeof target === "undefined") {
        message.warn("No result founded, please retry...");
      } else {
        const playerUrl = "/player/" + target.playerID;
        this.props.history.push(playerUrl);
        this.reloadPage();
      }
    } else {
      // This value is a team name
      const teamUrl = "/team/" + foundTeam.teamID;
      this.props.history.push(teamUrl);
      this.reloadPage();
    }
  };

  reloadPage = () => {
    window.location.reload();
  };

  fetchAllPlayerName = () => {
    // axios.defaults.withCredentials = true;
    var url = "/player/all-name";
    SportStatServer.get(url)
      .then(response => {
        const uniquePlayerNames = _.uniqBy(response.data, "playerName");
        console.log("get player names:" + _.size(uniquePlayerNames));
        this.setState({
          playerNames: uniquePlayerNames
        });
        this.props.store.playerNames = uniquePlayerNames;
      })
      .catch(function(err) {
        console.log("error");
        message.warn("Fetch player name failed, please retry...");
      });
  };

  fetchAllTeamName = () => {
    const url = "/team/all-name";
    SportStatServer.get(url)
      .then(response => {
        const uniqueTeamNames = _.uniqBy(response.data, "teamName");
        console.log("get team names:" + _.size(uniqueTeamNames));
        this.setState({
          teamNames: uniqueTeamNames
        });
        this.props.store.teamNames = uniqueTeamNames;
      })
      .catch(function(err) {
        console.log("error");
        message.warn("Fetch team name failed, please retry...");
      });
  };

  componentWillMount() {
    this.fetchAllPlayerName();
    this.fetchAllTeamName();
  }

  render() {
    var dataSource = this.getNames();
    return (
      <div>
        <AutoComplete
          allowClear
          style={{ width: 300 }}
          dataSource={dataSource}
          placeholder="Enter player or teamname`"
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={this.loadSearchResultPage}
        />
      </div>
    );
  }
}

SearchBar = inject("store")(observer(SearchBar));
export default withRouter(SearchBar);
