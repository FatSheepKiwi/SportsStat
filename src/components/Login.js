import React from 'react';
import {Row, Col, Form, Button, Modal} from 'antd';
import {observer,inject, Provider} from 'mobx-react';
import LoginForm from './LoginForm';

class Login extends React.Component {

  handleCancel = () => {
    this.props.store.loginModalVisible = false;
  }

  render() {
    const WrappedLoginForm = Form.create()(LoginForm);
    return (
      <div>
        <Modal
          title="Welcome to Sport Stat, please login."
          visible={this.props.store.loginModalVisible}
          keyboard = {false}
          footer = {null}
          closable = {true}
          width = {'50%'}
          onCancel = {this.handleCancel}
        >

        <Provider store = {this.props.store}>
            <WrappedLoginForm />
        </Provider>
          
        </Modal>
      </div>
    );
  }
}

Login = inject('store')(observer(Login))
export default Login;