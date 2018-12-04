import React from "react";
import { observer, inject, Provider } from "mobx-react";
import UserHeader from "./UserHeader";
import faker from "faker";

class PostList extends React.Component {
  renderList() {
    return this.props.store.userPosts.map(post => {
      return (
        <div className="item" key={post.id}>
          <img
            className="ui tiny left floated image"
            src={faker.image.avatar()}
          />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

PostList = inject("store")(observer(PostList));
export default PostList;
