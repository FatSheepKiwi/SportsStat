import React from "react";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "../apis/sportStatServer";
import { Comment, Icon, Button, Tooltip, Avatar, message, Spin } from "antd";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import CommentDetail from "./CommentDetail";
import AddComment from "./AddComment";

class TopicDetail extends React.Component {
  state = {
    topic: {},
    liked: false,
    favorited: false,
    likes: 0,
    favorites: 0,
    action: null
  };

  getTopicByID = topicID => {
    // console.log(topicID);
    const url = "/topic/" + topicID;
    SportStatServer.get(url)
      .then(res => {
        const result = res.data;
        // console.log(JSON.stringify(result, null, 2));
        this.setState({
          topic: result,
          liked: result.liked,
          favorited: result.favorited,
          likes: result.likes,
          favorites: result.favorites
        });
      })
      .catch(err => {
        console.log(`fetch ${topicID} failed!`);
        if (err.response.status == 404) {
          message.warn("This Topic No Longer Exists...");
        } else {
          console.log(err);
        }
      });
  };

  deleteTopic = () => {
    if (!this.state.topic._id) {
      console.log("nothing to delete!");
      message.warn("Please login first");
      return;
    }
    const url = `/topic/${this.state.topic._id}`;
    SportStatServer.delete(url)
      .then(res => {
        console.log("success delete topic" + this.state.topic._id);
        message.info("success delete topic" + this.state.topic._id);
        this.props.history.push("/topic");
        this.reloadPage();
      })
      .catch(err => {
        console.log(err);
        if (err.response.status == 401) {
          this.setState.toLogin = true;
          this.props.store.loginModalVisible = this.state.toLogin;
        } else if (err.response.status == 403) {
          message.warn("Only author has permission...");
        } else {
          message.warn("Delete failed, please retry");
        }
      });
  };

  renderComment = () => {
    if (typeof this.state.topic.comments[0] === "undefined") return;
    // console.log("passed comment is : " + this.state.topic.comments[0]);
    return (
      <div className="ui comments">
        <h3 className="ui dividing header ">Comments</h3>
        {this.state.topic.comments.map(comment => {
          return <CommentDetail comment={comment} key={comment._id} />;
        })}
      </div>
    );
  };

  reloadPage = () => {
    window.location.reload();
  };

  like = () => {
    if (this.state.liked) {
      return;
    }
    SportStatServer.post(`/topic/${this.state.topic._id}/like`)
      .then(result => {
        // console.log(result);
        this.setState({
          liked: true,
          likes: this.state.likes + 1
        });
      })
      .catch(err => {
        if (err.response.status == 401) {
          message.warn("Please Login first...");
        } else {
          message.warn("like failed, please retry...");
        }
      });
  };

  favorite = () => {
    if (this.state.favorited) {
      return;
    }
    SportStatServer.post(`/topic/${this.state.topic._id}/favorite`)
      .then(result => {
        // console.log(result);
        this.setState({
          favorited: true,
          favorites: this.state.favorites + 1
        });
      })
      .catch(err => {
        if (err.response.status == 401) {
          message.warn("Please Login first...");
        } else {
          message.warn("favorite failed, please retry...");
        }
      });
  };

  routeBack = () => {};

  updateTopic = () => {};

  getDate = date_str => {
    console.log(date_str);
    const d = new Date(date_str);
    return moment(d);
  };

  ShowTheObject = obj => {
    var des = "";
    for (var name in obj) {
      des += name + ":" + obj[name] + ";";
    }
    console.log(des);
  };

  getAuthorAvatar = avatar => {
    if (typeof avatar === "undefined" || avatar == "") {
      return "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
    } else {
      return avatar;
    }
  };

  componentWillMount() {
    this.getTopicByID(this.props.match.params.id);
    // this.ShowTheObject(this.props.match.params);
  }

  render() {
    const { topic, likes, favorites } = this.state;

    const actions = [
      <span>
        <Tooltip title="Favorite">
          <Icon
            type="star"
            theme={this.state.favorited === true ? "filled" : "outlined"}
            onClick={this.favorite}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>{favorites}</span>
      </span>,
      <span>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={this.state.liked === true ? "filled" : "outlined"}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>{likes}</span>
      </span>
    ];

    // console.log(topic.date);

    if (!topic.author)
      return (
        <div className="ui segment">
          <p />
          <p />
          <p />
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
        </div>
      );
    return (
      <div
        className="ui  container"
        style={{ backgroundColor: "#FFFFFF", padding: 20 }}
      >
        <div>
          <Button
            type="primary"
            icon="edit"
            style={{ margin: 10 }}
            onClick={this.updateTopic}
          >
            Update
          </Button>
          <Button
            type="danger"
            style={{ float: "right", margin: 10 }}
            icon="close"
            onClick={this.deleteTopic}
          >
            Delete
          </Button>
        </div>
        <Comment
          actions={actions}
          author={<a>{topic.author.username}</a>}
          avatar={
            <Avatar
              size="large"
              src={this.getAuthorAvatar(topic.author.avatar)}
              alt="author avatar"
            />
          }
          content={
            <div>
              <div>{topic.title}</div>
              <p>
                {topic.content}
                <br />
                <br />
                Signature: {topic.author.personalSignature}
              </p>
              <div>Desc: {topic.desc}</div>
            </div>
          }
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().from(topic.date)}</span>
            </Tooltip>
          }
        />
        <Provider store={this.props.store}>
          <div className="ui content" style={{ marginLeft: 50 }}>
            {this.renderComment()}
          </div>
        </Provider>
        <Provider store={this.props.store}>
          <div className="ui comments">
            <AddComment topic_id={topic._id} />
          </div>
        </Provider>
        <div>
          <Link to="/topic">
            <Button type="Primary" icon="rollback" onClick={this.reloadPage}>
              Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

TopicDetail = inject("store")(observer(TopicDetail));
export default withRouter(TopicDetail);
