import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import Store from "./store/Store";

import "./index.css";

import UserProfile from "./components/UserProfile";
import Topic from "./components/Topic";
import CreateTopic from "./components/createTopic";
import TopicDetail from "./components/TopicDetail";
import TeamDetail from "./components/TeamDetail";
import Framework from "./components/Framework";
import Home from "./components/Home";
import Player from "./components/Player";
import Team from "./components/Team";
import Schedule from "./components/Schedule";
import UserProfileDetail from "./components/UserProfileDetail";
import PlayerList from "./components/PlayerList";

var store = new Store();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Framework>
        <Switch>
          <Route path="/schedule" component={Schedule} />
          <Route exact path="/player" component={PlayerList} />
          <Route path="/player/:playerID" component={Player} />
          <Route path="/user-profile/edit" component={UserProfile} />
          <Route path="/user-profile" component={UserProfileDetail} />
          <Route exact path="/comment" component={Comment} />
          <Route exact path="/create-topic" component={CreateTopic} />
          <Route exact path="/topic" component={Topic} />
          <Route exact path="/topic/:id" component={TopicDetail} />
          <Route exact path="/team" component={Team} />
          <Route path="/team/:teamID" component={TeamDetail} />
          <Route component={Home} />
        </Switch>
      </Framework>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
