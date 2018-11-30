import React from 'react';
import PostList from './PostList';
import {observer,inject, Provider} from 'mobx-react';
import axios from 'axios';
import _ from 'lodash';

class Comment extends React.Component {

    state = { userHeaders : [] };

    getUserPostsAndUserName = async () => {
        this.props.store.loading = true;
        console.log('fetching placeholder posts');        
        const response = await this.fetchPosts();
        console.log(response);
        this.props.store.userPosts = response;
        const userIds = await _.chain(response)
            .map('userId')
            .uniq()
            .forEach(id => this.fetchUser(id))
            .value();
        
        this.props.store.userHeaders = this.state.userHeaders;
    }

    componentWillMount() {
        this.getUserPostsAndUserName();
    }

    fetchPosts = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        
        return response.data;
    };

    fetchUser = async (id) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);        
        this.setState({userHeaders : [...this.state.userHeaders, response.data]});
    };

    render() {  
      return (
        <div className="ui container">
            <Provider store = {this.props.store}>
                <PostList />
            </Provider>
        </div>
    );}
};

Comment = inject('store')(observer(Comment));
export default Comment;