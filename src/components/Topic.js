import React from 'react';
import {observer,inject, Provider} from 'mobx-react';
import TopicList from './TopicList';

class Topic extends React.Component {

  render() {    
    return (
      <div className="ui container">

        <Provider store = {this.props.store}>
            <TopicList />
        </Provider>                  
      </div>
    );
  }
}

Topic = inject('store')(observer(Topic))
export default Topic;