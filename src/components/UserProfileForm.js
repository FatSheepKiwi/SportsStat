import React from "react";
import { observer, inject, Provider } from "mobx-react";
import _ from "lodash";
import {
  Upload,
  Icon,
  message,
  Form,
  Input,
  Tooltip,
  Select,
  Row,
  Col,
  Button,
  AutoComplete
} from "antd";
import SportStatServer from "./../apis/sportStatServer";
import "./UserProfileForm.css";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error("Image must smaller than 1MB!");
  }
  return isLt1M;
}

const FormItem = Form.Item;
const Option = Select.Option;

class UserProfileForm extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    user: {}
  };

  fetchUser = () => {
    SportStatServer.get("/profile/me")
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(err => {
        message.warn("Please login first.");
        console.log(err);
      });
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
      message.success("upload avatar success!");
      console.log("response: " + JSON.stringify(info.file.response, null, 2));
    } else if (info.file.status === "error") {
      if (info.file.error.status == "401") {
        message.error("Please login...");
      } else {
        message.error(info.file.response);
      }
      console.log("response:" + JSON.stringify(info.file));
      this.setState({ loading: false });
    } else if (info.file.status === "removed") {
      message.success("remove avatar success!");
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    if (typeof this.state.user.username === "undefined") {
      return <div className="ui header">Loading...</div>;
    }

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload avatar</div>
      </div>
    );

    const imageUrl = this.state.imageUrl;
    const user = this.state.user;

    const { getFieldDecorator } = this.props.form;
    const playerNames = _.map(this.props.store.playerNames, playerName => {
      return playerName.playerName;
    });

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <div className="ui text container">
        <div>
          <span>Upload Avatar:</span>
          <Upload
            accept="image/*"
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:5000/profile/avatar"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            withCredentials={true}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  }
                ]
              })(<Input placeholder={user.email} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  username&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: false,
                    message: "Please input your nickname!",
                    whitespace: true
                  }
                ]
              })(<Input placeholder={user.username} />)}
            </FormItem>

            <FormItem label="signature" {...formItemLayout}>
              <Input placeholder={user.personalSignature} />
            </FormItem>
            <FormItem {...formItemLayout} label="favorite team" hasFeedback>
              {getFieldDecorator("favoriteTeam")(
                <Select placeholder={user.favoriteTeam}>
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="favorite player" hasFeedback>
              {getFieldDecorator("favoritePlayer")(
                <Select placeholder={user.favoritePlayer}>
                  {playerNames.map(playerName => {
                    return (
                      <Option value={playerName} key={playerName}>
                        {playerName}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

UserProfileForm = inject("store")(observer(UserProfileForm));
export default UserProfileForm;
