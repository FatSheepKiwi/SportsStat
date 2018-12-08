import React from "react";
import { observer, inject } from "mobx-react";
import axios from "axios";
import SportStatServer from "../apis/sportStatServer";
import { Form, Input, Button, Tag } from "antd";
import { Link, withRouter } from "react-router-dom";

const FormItem = Form.Item;

const CheckableTag = Tag.CheckableTag;

const { TextArea } = Input;

const tagsFromServer = ["Football", "Soccer", "Basketball", "Sports"];

class CreateTopicForm extends React.Component {
  state = {
    selectedTags: [],
    toLogin: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const topic = {
          title: values.title,
          desc: values.desc,
          content: values.content
        };
        const headers = {
          headers: {
            "x-auth": localStorage.getItem("x-auth")
          }
        };
        console.log("x-auth:" + localStorage.getItem("x-auth"));
        console.log("start post topic");
        SportStatServer.post("/topic", topic, headers)
          .then(res => {
            console.log(res);
            this.props.store.userTopics = res;
            this.props.history.push("/topic");
            this.reloadPage();
          })
          .catch(err => {
            console.log(err.response.status);
            if (err.response.status == 401) {
              this.setState.toLogin = true;
              this.props.store.loginModalVisible = true;
              console.log("show login");
            }
          });
      }
    });
  };

  reloadPage = () => {
    window.location.reload();
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formLayout } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    const { selectedTags } = this.state;
    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 10 }
    };

    return (
      <div>
        <Form layout={formLayout} onSubmit={this.handleSubmit}>
          <p className="ui Second Grey header"> Post Topic </p>
          <FormItem label="title" {...formItemLayout}>
            {getFieldDecorator("title", {
              rules: [
                {
                  type: "string",
                  message: "The input is not valid"
                },
                {
                  required: true,
                  message: "Please input topic title"
                }
              ]
            })(<Input placeholder="title" />)}
          </FormItem>
          <FormItem label="keyWords" {...formItemLayout}>
            {tagsFromServer.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </FormItem>
          <FormItem label="describe" {...formItemLayout}>
            {getFieldDecorator("desc", {
              rules: [
                {
                  type: "string",
                  message: "The input is not valid"
                },
                {
                  required: true,
                  message: "Please input your desc"
                }
              ]
            })(<Input placeholder="describe" />)}
          </FormItem>
          <FormItem label="content" {...formItemLayout}>
            {getFieldDecorator("content", {
              rules: [
                {
                  type: "string",
                  message: "The input is not valid"
                },
                {
                  required: true,
                  message: "Please input content"
                }
              ]
            })(<TextArea rows={4} />)}
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to="/topic">
              <Button
                type="danger"
                style={{ marginLeft: 8 }}
                onClick={this.reloadPage}
              >
                Cancel
              </Button>
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

CreateTopicForm = inject("store")(observer(CreateTopicForm));
export default withRouter(CreateTopicForm);
