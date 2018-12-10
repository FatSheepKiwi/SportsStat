import React from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import { observer, inject, Provider } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import SportStatServer from "../apis/sportStatServer";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <FormItem>
      <TextArea rows={4} onChange={onChange} value={value} />
    </FormItem>
    <FormItem>
      <Button
        disabled={submitting}
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </FormItem>
  </div>
);

class AddComment extends React.Component {
  state = {
    submitting: false,
    value: ""
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    const body = {
      comment: {
        content: this.state.value
      }
    };
    console.log(this.state.value);

    SportStatServer.post(`/topic/comment/${this.props.topic_id}`, body)
      .then(result => {
        this.setState({ submitting: false });
        console.log(this.props.topic_id);
        this.props.history.push(`/topic/${this.props.topic_id}`);
        this.reloadPage();
      })
      .catch(err => {
        this.setState({ submitting: false });
        if (err.response.status) {
          console.log(err.response.status);
        }
        if (err.response.status == 401) {
          this.props.store.loginModalVisible = true;
          console.log("show login");
        }
      });
  };

  reloadPage = () => {
    window.location.reload();
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}

AddComment = inject("store")(observer(AddComment));
export default withRouter(AddComment);
