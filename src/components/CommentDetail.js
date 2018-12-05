import React from "react";
import PostList from "./PostList";
import { observer, inject, Provider } from "mobx-react";
import axios from "axios";
import { Comment, Avatar } from "antd";
import _ from "lodash";

class CommentDetail extends React.Component {
  render() {
    const comment = this.props.comment;
    if (!comment) return <div>loading</div>;
    return (
      <div>
        <Comment
          actions={[<span>Reply to</span>]}
          author={<a>{comment.author.username}</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <p>
              {comment.content}
              <br />
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure).
            </p>
          }
        >
          <div>{comment.like}</div>
        </Comment>
      </div>
    );
  }
}

CommentDetail = inject("store")(observer(CommentDetail));
export default CommentDetail;
