import React from 'react';
import {observer,inject, Provider} from 'mobx-react';
import TopicList from './TopicList';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom'

class Topic extends React.Component {

  componentWillMount(){
    this.setState({createTopic: false});    
  }

  reloadPage = () => {
    window.location.reload();
  }

  render() {  
    return (      
      <div className="ui container">
        <Link to='/create-topic'>
          <Button type="primary" icon="plus" onClick={this.reloadPage}>                    
            Create Topic
          </Button>
        </Link>
        <Provider store = {this.props.store}>
            <TopicList />
        </Provider>
      </div>
    );
  }
}

Topic = inject('store')(observer(Topic))
export default Topic;