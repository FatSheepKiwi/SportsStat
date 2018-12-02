import React from 'react';
import { List, Avatar, Icon } from 'antd';
import {observer,inject, Provider} from 'mobx-react';
import faker from 'faker';
import axios from 'axios';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: `${faker.image.image()}`,
    title: `ant design part ${i}`,
    avatar: `${faker.image.sports()}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

class TopicList extends React.Component {

    getTopics() {        
        var headers = {};
        if (localStorage.getItem("x-auth")) {
            headers = {
                "x-auth" : localStorage.getItem("x-auth")
            };
        }
        axios.get('/topic/', {headers})
        .then(response => {
            this.props.store.userTopics = response.data;
        })
        .catch(err => {
            console.log(err);
        }) ;
    }

    componentWillMount() {
        this.getTopics();
    }

    render() {
        return (
            <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={this.props.store.userTopics}
            footer={<div><b>Topics</b> footer part</div>}
            renderItem={item => (
                <List.Item
                key={item.title}
                actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                extra={<img width={272} alt="logo" src={faker.image.image()} />}
                >
                <List.Item.Meta
                    avatar={<Avatar src={faker.image.avatar()} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.author.username}
                />
                {item.desc}
                </List.Item>
            )}
            />
        )    
    }        
}


TopicList = inject('store')(observer(TopicList))
export default TopicList;