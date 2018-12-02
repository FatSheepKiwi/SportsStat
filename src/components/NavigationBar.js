import React from 'react';
import { NavLink } from 'react-router-dom'
import {Menu, Icon } from 'antd';
import {observer,inject, Provider } from 'mobx-react';
import axios from 'axios';
import SearchBar from './SearchBar';
import faker from 'faker';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavigationBar extends React.Component {
    state = {
        current: '/',
      }
    
      handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      }

      showLogin = () => {
        console.log('show login');
        this.props.store.loginModalVisible = true;
      }

      displayUsername = () => {
        if (this.props.store.user.username) {
          return this.props.store.user.username;
        } else {
          return "welcome";
        }
      }

      fetch = () => {
        axios.defaults.withCredentials = true;
        var url = "/test";
        axios.get(url, {withCredentials:true})
          .then((response) => {
            console.log(response);
          })
          .catch(function (err) {  
            console.log('error'); 
            console.log(err);
          });
      }

      componentDidMount(){
          //this.fetch();
      }
    
      render() {
        return (
         <div>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="home">
                <NavLink to='/'>
                    <Icon type="book" />Home
                </NavLink>
            </Menu.Item>
            <Menu.Item key="players">
                <NavLink to='/player'>
                    <Icon type="mail" />Players
                </NavLink>
            </Menu.Item>
            <Menu.Item key="teams">
                <NavLink to='/team'>
                    <Icon type="team" />Teams
                    </NavLink>
            </Menu.Item>
            <Menu.Item key="schedule">
                <NavLink to='/schedule'>
                    <Icon type="smile" />Schedule
                </NavLink>
            </Menu.Item>
            <Menu.Item key="Comment">
                <NavLink to='/comment'>
                    <Icon type="team" />Comment
                </NavLink>
            </Menu.Item>
            <Menu.Item key="Topic">
                <NavLink to='/topic'>
                    <Icon type="team" />Topic
                </NavLink>
            </Menu.Item>
            <Menu.Item key="searchBar">
              <Provider store = {this.props.store}>
                <SearchBar/>
              </Provider>
            </Menu.Item>            
            <SubMenu title={<div><span><img className="ui image avatar" alt="avatar" src={faker.image.avatar()}></img></span>
            <span>{"Hi! " + this.displayUsername()}</span></div>}
            style={{margin:"0 20%"}}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">              
              <span  onClick={this.showLogin}><Icon type="user" />Log In/Sign Up</span>
            </Menu.Item>
            <Menu.Item key="setting:2">              
              <NavLink to='/user-profile'>
                  <Icon type="user" />Profile
              </NavLink>
            </Menu.Item>
            <Menu.Item key="setting:3">
              <Icon type="heart" />Subscription
            </Menu.Item>
            <Menu.Item key="setting:4">
              <Icon type="close" />Sign out
            </Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">233</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
            
          </Menu>
          
          </div>
        );
      }
    }

NavigationBar = inject('store')(observer(NavigationBar))
export default NavigationBar;