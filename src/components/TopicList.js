import React from "react";
import { List, Avatar, Icon, message } from "antd";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "../apis/sportStatServer";
import { Link } from "react-router-dom";
import _ from "lodash";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class TopicList extends React.Component {
  state = {
    topics: {}
  };
  getTopics() {
    SportStatServer.get("/topic")
      .then(response => {
        // console.log("topic 0: " + JSON.stringify(response.data[0], null, 2));
        this.setState({ topics: response.data });
        this.props.store.userTopics = _.mapKeys(response.data, "_id");
        // this.ShowTheObject(this.props.store.userTopics);
      })
      .catch(err => {
        console.log("get topic err");
        message.warn("Get topics failed, please retry...");
      });
  }

  ShowTheObject = obj => {
    var des = "";
    for (var name in obj) {
      des += name + ":" + obj[name] + ";";
    }
    console.log(des);
  };

  componentWillMount() {
    console.log("before get tpics");
    this.getTopics();
  }

  getAuthorAvatar = avatar => {
    if (typeof avatar === "undefined" || avatar == "") {
      return "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
    } else {
      return avatar;
    }
  };

  getDate = str_date => {
    var date = new Date(str_date);
    return date.toLocaleString();
  };

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    return (
      <List
        bordered="true"
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 10
        }}
        dataSource={this.state.topics}
        footer={
          <div>
            <b>Topics</b>
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text={item.favorites} />,
              <IconText type="like-o" text={item.likes} />,
              <IconText type="message" text={item.commentCounter} />
            ]}
            extra={
              <div className="date ui label">
                <i className="calendar alternate icon" />
                {this.getDate(item.date)}
              </div>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={this.getAuthorAvatar(item.author.avatar)} />}
              title={
                <div className="content">
                  <Link to={`/topic/${item._id}`} onClick={this.reloadPage}>
                    {item.title}
                  </Link>
                </div>
              }
              description={item.author.name}
            />

            <div className="ui text">{item.desc}</div>
          </List.Item>
        )}
      />
    );
  }
}

TopicList = inject("store")(observer(TopicList));
export default TopicList;
