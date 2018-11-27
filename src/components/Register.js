import React from 'react';
import {Row, Col, Form, Button, Modal} from 'antd';
import {observer,inject, Provider} from 'mobx-react';
import RegisterForm from './RegisterForm';

class Register extends React.Component {

  handleCancel = (e) => {
    console.log('set register false');
    this.props.store.registerModalVisible = false;
  }

  render() {
    const WrappedLoginForm = Form.create()(RegisterForm);
    return (
      <div>
        <Modal
          title="Register"
          visible={this.props.store.registerModalVisible}
          keyboard = {false}
          footer = {null}
          onCancel={this.handleCancel}
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

Register = inject('store')(observer(Register))
export default Register;