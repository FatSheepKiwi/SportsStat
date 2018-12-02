import React from 'react';
import {observer,inject, Provider} from 'mobx-react';
import TopicList from './TopicList';
import { Icon, Button } from 'antd';
import { NavLink, Redirect } from 'react-router-dom'

class Topic extends React.Component {

  state = {
    redirect: false
  }

  routeCreateTopic = () => {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to='/create-topic' />
    }    
    return (      
      <div className="ui container">
        <NavLink to='/create-topic'>
          <Button type="primary" icon="add" htmlType="submit" onClick={this.routeCreateTopic}>                    
            <Icon type="add" />Create Topic          
          </Button>
        </NavLink>
        <Provider store = {this.props.store}>
            <TopicList />
        </Provider>
      </div>
    );
  }
}

Topic = inject('store')(observer(Topic))
export default Topic;