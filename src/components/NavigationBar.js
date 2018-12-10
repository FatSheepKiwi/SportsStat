import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon, Switch } from "antd";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "../apis/sportStatServer";
import SearchBar from "./SearchBar";
import faker from "faker";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavigationBar extends React.Component {
  state = {
    current: "/",
    theme: "dark",
    user: {}
  };

  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light"
    });
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  showLogin = () => {
    console.log("show login");
    this.props.store.loginModalVisible = true;
  };

  displayUsername = () => {
    console.log(this.state.user.email);
    if (this.state.user.email) {
      return this.state.user.email;
    } else {
      return "welcome";
    }
  };

  displayUserAvatar = () => {
    if (this.state.user.avatar) {
      return this.state.user.avatar;
    } else {
      return "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
    }
  };

  fetch = () => {
    var url = "/test";
    SportStatServer.get(url)
      .then(response => {
        console.log(response);
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });
  };

  fetchUser = () => {
    SportStatServer.get("/profile/me")
      .then(response => {
        this.setState({ user: response.data });
        this.props.store.user = response.data;
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    //this.fetch();
    this.fetchUser();
  }

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          theme={this.state.theme}
        >
          <Menu.Item key="theme" disabled={true}>
            <Switch
              checked={this.state.theme === "dark"}
              onChange={this.changeTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </Menu.Item>
          <Menu.Item key="home">
            <NavLink to="/">
              <Icon type="book" />
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="players">
            <NavLink to="/player">
              <Icon type="mail" />
              Players
            </NavLink>
          </Menu.Item>
          <Menu.Item key="teams">
            <NavLink to="/team">
              <Icon type="team" />
              Teams
            </NavLink>
          </Menu.Item>
          <Menu.Item key="schedule">
            <NavLink to="/schedule">
              <Icon type="smile" />
              Schedule
            </NavLink>
          </Menu.Item>
          <Menu.Item key="Topic">
            <NavLink to="/topic">
              <Icon type="team" />
              Topic
            </NavLink>
          </Menu.Item>
          <Menu.Item key="searchBar">
            <Provider store={this.props.store}>
              <SearchBar />
            </Provider>
          </Menu.Item>
          <SubMenu
            title={
              <div>
                <span>
                  <img
                    className="ui image avatar"
                    alt="avatar"
                    src={this.displayUserAvatar()}
                  />
                </span>
                <span>{"Hi! " + this.displayUsername()}</span>
              </div>
            }
            style={{ float: "right" }}
          >
            <MenuItemGroup title="Item 1">
              <Menu.Item key="setting:1">
                <span onClick={this.showLogin}>
                  <Icon type="user" />
                  Login/Signup
                </span>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <NavLink to="/user-profile">
                  <Icon type="user" />
                  Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item key="setting:3">
                <Icon type="heart" />
                Subscription
              </Menu.Item>
              <Menu.Item key="setting:4">
                <Icon type="close" />
                Sign out
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

NavigationBar = inject("store")(observer(NavigationBar));
export default NavigationBar;
