import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {observer,inject, Provider} from 'mobx-react';

const FormItem = Form.Item;


class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.store.loginModalVisible = false;
      this.props.store.registerModalVisible = false;
      this.props.store.userName = values.userName;
      }
    });
  }

  showRegister = () => {
    console.log("show register");
    this.props.store.registerModalVisible = true;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <p></p>
          <a href="#">Forgot password </a>
           Or <a href="#" onClick = {this.showRegister}>register now!</a>
        </FormItem>
      </Form>
    );
  }
}
LoginForm = inject('store')(observer(LoginForm))
export default LoginForm;