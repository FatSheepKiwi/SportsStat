import React from "react";
import { List, Avatar, Icon } from "antd";
import { observer, inject, Provider } from "mobx-react";
import faker from "faker";
import SportStatServer from "../apis/sportStatServer";
import { Link } from "react-router-dom";
import _ from "lodash";
import TopicDetail from "./TopicDetail";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: `${faker.image.image()}`,
    title: `ant design part ${i}`,
    avatar: `${faker.image.sports()}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

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
        console.log("after get topic");
        this.setState({ topics: response.data });
        this.props.store.userTopics = _.mapKeys(response.data, "_id");
        // this.ShowTheObject(this.props.store.userTopics);
      })
      .catch(err => {
        console.log("get topic err");
        console.log(err);
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
            <b>Topics</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text="156" />,
              <IconText type="like-o" text="156" />,
              <IconText type="message" text="2" />
            ]}
            extra={
              <div className="date ui label">
                <i className="calendar alternate icon" />
                {this.getDate(item.date)}
              </div>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={faker.image.avatar()} />}
              title={
                <div className="content">
                  <Link to={`topic/${item._id}`} onClick={this.reloadPage}>
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
