import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Framework from "./components/Framework";
import Home from "./components/Home";
import Player from "./components/Player";
import Team from "./components/Team";
import Schedule from "./components/Schedule";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import Store from "./store/Store";
import UserProfile from "./components/UserProfile";
import Topic from "./components/Topic";
import CreateTopic from "./components/createTopic";
import TopicDetail from "./components/TopicDetail";

var store = new Store();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Framework>
        <Switch>
          <Route path="/team" component={Team} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/player" component={Player} />
          <Route path="/user-profile" component={UserProfile} />
          <Route exact path="/comment" component={Comment} />
          <Route exact path="/create-topic" component={CreateTopic} />
          <Route exact path="/topic" component={Topic} />
          <Route exact path="/topic/:id" component={TopicDetail} />
          <Route path="/" component={Home} />
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
