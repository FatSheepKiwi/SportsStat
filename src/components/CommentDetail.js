import React from "react";
import { observer, inject } from "mobx-react";
import { Comment, Avatar, Tooltip } from "antd";
import _ from "lodash";
import moment from "moment";

class CommentDetail extends React.Component {
  getAuthorAvatar = avatar => {
    if (typeof avatar === "undefined" || avatar == "") {
      return "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
    } else {
      return avatar;
    }
  };

  render() {
    const comment = this.props.comment;
    if (!comment) return <div>loading</div>;
    return (
      <div>
        <Comment
          author={<a>{comment.author.username}</a>}
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().from(comment.date)}</span>
            </Tooltip>
          }
          avatar={
            <Avatar
              size="large"
              src={this.getAuthorAvatar(comment.author.avatar)}
              alt="author avatar"
            />
          }
          content={
            <p>
              {comment.content}
              <br />
              <br />
              Signature: {comment.author.personalSignature}
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
