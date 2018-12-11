import React from "react";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "../apis/sportStatServer";
import { Comment, Icon, Button, Tooltip, Avatar } from "antd";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import CommentDetail from "./CommentDetail";
import AddComment from "./AddComment";

class TopicDetail extends React.Component {
  state = { topic: {}, liked: false, favorited: false, action: null };

  getTopicByID = topicID => {
    // console.log(topicID);
    const url = "/topic/" + topicID;
    SportStatServer.get(url)
      .then(res => {
        console.log(res);
        const result = res.data;
        this.setState({
          topic: result,
          liked: result.liked,
          favorited: result.favorited
        });
      })
      .catch(err => {
        console.log(`fetch ${topicID} failed!`);
        console.log(err);
      });
  };

  deleteTopic = () => {
    if (!this.state.topic._id) {
      console.log("nothing to delete!");
      return;
    }
    const url = `/topic/${this.state.topic._id}`;
    SportStatServer.delete(url)
      .then(res => {
        console.log("success delete topic" + this.state.topic._id);
      })
      .catch(err => {
        console.log(err);
        if (err.response.status == 401) {
          this.setState.toLogin = true;
          this.props.store.loginModalVisible = this.state.toLogin;
        }
      });
  };

  renderComment = () => {
    if (typeof this.state.topic.comments[0] === "undefined") return;
    // console.log("passed comment is : " + this.state.topic.comments[0]);
    return (
      <div>
        <p>Comments</p>
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
        this.setState({ liked: true });
      })
      .catch(err => {});
  };

  favorite = () => {
    if (this.state.favorited) {
      return;
    }
    SportStatServer.post(`/topic/${this.state.topic._id}/favorite`)
      .then(result => {
        this.setState({ favorited: true });
      })
      .catch(err => {});
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

  componentWillMount() {
    this.getTopicByID(this.props.match.params.id);
    // this.ShowTheObject(this.props.match.params);
  }

  render() {
    const { topic, likes, dislikes, action } = this.state;

    const actions = [
      <span>
        <Tooltip title="Favorite">
          <Icon
            type="star"
            theme={this.state.favorited === true ? "filled" : "outlined"}
            onClick={this.favorite}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>
          {topic.favorites}
        </span>
      </span>,
      <span>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={this.state.liked === true ? "filled" : "outlined"}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>{topic.likes}</span>
      </span>
    ];

    // console.log(topic.date);

    if (!topic.author) return <div>loading</div>;
    return (
      <div className="ui container">
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
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <div>
              <div>{topic.title}</div>
              <p>
                {topic.content}
                <br />
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
              <div>{topic.desc}</div>
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
          <div className="ui container">
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
export default TopicDetail;
