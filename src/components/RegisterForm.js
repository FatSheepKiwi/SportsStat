import React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "./../apis/sportStatServer";

const FormItem = Form.Item;

class RegisterForm extends React.Component {
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //       this.props.store.loginModalVisible = false;
  //       this.props.store.registerModalVisible = false;
  //       this.props.store.userName = values.userName2;
  //     }
  //   });
  // }

  state = {
    confirmDirty: false
  };

  handleSubmit = term => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        SportStatServer.post("/user", {
          email: values.regemail,
          password: values.regpassword,
          username: values.username
        })
          .then(res => {
            this.props.store.loginModalVisible = false;
            this.props.store.registerModalVisible = false;
            this.props.store.user = res.data;
            // console.log(res.data);
            this.reloadPage();
          })
          .catch(err => {
            if (err.response.status === 409) {
              message.warn(
                "This Email is already registered, please use another email"
              );
            } else {
              console.log(err);
              message.warn("Register failed, please retry...");
            }
          });
      }
    });
  };

  reloadPage = () => {
    window.location.reload();
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("regpassword")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const userNameError =
      isFieldTouched("username") && getFieldError("username");

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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="username"
          validateStatus={userNameError ? "error" : ""}
          help={userNameError || ""}
        >
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="username"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="email">
          {getFieldDecorator("regemail", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail"
              },
              {
                required: true,
                message: "Please input your user name"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator("regpassword", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

RegisterForm = inject("store")(observer(RegisterForm));
export default RegisterForm;
