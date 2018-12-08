import React from "react";
import { AutoComplete } from "antd";
import SportStatServer from "../apis/sportStatServer";
import { observer, inject, Provider } from "mobx-react";
import _ from "lodash";

//const dataSource = ['James Harden', 'Stephen Curry', 'Lebron James'];

class SearchBar extends React.Component {
  state = {
    playerNames: []
  };

  getNames = () => {
    var res = [];
    this.state.playerNames.forEach(element => {
      res.push(element.playerName);
    });
    return res;
  };

  getPlayerInfo = value => {
    this.props.store.loading = true;
    value = value.trim();
    console.log("select " + value);
    var url = "/player?playerName=" + value;
    SportStatServer.get(url, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        this.props.store.playerData = response.data;
        this.props.store.loadingInfo = false;
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });
    url = "/player/average?playerName=" + value;
    SportStatServer.get(url, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        this.props.store.playerStatistic = response.data;
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });
  };

  fetchAll = () => {
    // axios.defaults.withCredentials = true;
    var url = "/player/all-name";
    SportStatServer.get(url)
      .then(response => {
        const uniquePlayerNames = _.uniqBy(response.data, "playerName");
        console.log("get player names:" + _.size(uniquePlayerNames));
        this.setState({
          playerNames: uniquePlayerNames
        });
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });
  };

  componentWillMount() {
    this.fetchAll();
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
          onSelect={this.getPlayerInfo}
        />
      </div>
    );
  }
}

SearchBar = inject("store")(observer(SearchBar));
export default SearchBar;
