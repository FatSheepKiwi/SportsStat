import React from "react";
import { List, Avatar, Icon, message, Button } from "antd";
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

class FavoriteTopicList extends React.Component {
  state = {
    topics: {}
  };
  getFavoriteTopics() {
    SportStatServer.get("/topic/favorite-list")
      .then(response => {
        // console.log("topics : " + JSON.stringify(response.data, null, 2));
        this.setState({ topics: response.data.favoriteTopics });
        this.props.store.userTopics = _.mapKeys(response.data, "_id");
      })
      .catch(err => {
        if (err.response.status == 401) {
          message.warn("Please Login first...");
        } else {
          console.log("get topic err");
          message.warn("Get topics failed, please retry...");
        }
      });
  }

  componentWillMount() {
    this.getFavoriteTopics();
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
      <div className="ui container">
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
              <Link to="/topic">
                {" "}
                <Button onClick={this.reloadPage}>All Topics</Button>
              </Link>
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
                avatar={
                  <Avatar src={this.getAuthorAvatar(item.author.avatar)} />
                }
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
      </div>
    );
  }
}

FavoriteTopicList = inject("store")(observer(FavoriteTopicList));
export default FavoriteTopicList;
