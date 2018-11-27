import React from 'react';
import {Row, Col, Form, Button, Modal} from 'antd';
import {observer,inject, Provider} from 'mobx-react';
import LoginForm from './LoginForm';

class Login extends React.Component {

  render() {
    const WrappedLoginForm = Form.create()(LoginForm);
    return (
      <div>
        <Modal
          title="Welcome to Sport Stat, please login."
          visible={this.props.store.loginModalVisible}
          keyboard = {false}
          footer = {null}
          closable = {false}
          width = {'50%'}
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