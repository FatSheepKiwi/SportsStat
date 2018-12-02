import React from 'react';
import {observer,inject, Provider} from 'mobx-react';
import TopicList from './TopicList';
import { Icon, Button } from 'antd';
import { NavLink } from 'react-router-dom'

class Topic extends React.Component {

  render() {    
    return (
      <div className="ui container">
        <NavLink to='/create-topic'>
          <Button type="primary" icon="add">                    
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