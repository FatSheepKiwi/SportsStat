import React from "react";
import { Row, Col, Form, Button, Modal } from "antd";
import { observer, inject, Provider } from "mobx-react";
import LoginForm from "./LoginForm";
import GoogleLogin from "react-google-login";
import SportStatServer from "../apis/sportStatServer";

class Login extends React.Component {
  handleCancel = () => {
    this.props.store.loginModalVisible = false;
  };

  handleSubmit = () => {
    SportStatServer.get("/auth/google/")
      .then(response => {
        this.props.store.loginModalVisible = false;
        this.props.store.registerModalVisible = false;
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const responseGoogle = response => {
      console.log(response);
    };
    const WrappedLoginForm = Form.create()(LoginForm);
    return (
      <div>
        <Modal
          title="Welcome to Sport Stat, please login."
          visible={this.props.store.loginModalVisible}
          keyboard={false}
          footer={null}
          closable={true}
          width={"50%"}
          onCancel={this.handleCancel}
        >
          <Provider store={this.props.store}>
            <WrappedLoginForm />
          </Provider>

          <Button type="primary" block onClick={this.handleSubmit}>
            Login with Google
          </Button>

          <GoogleLogin
            clientId="654921049052-m752jqhhpe529qssr10rpeghbj61s2uv.apps.googleusercontent.com"
            buttonText="LoginGoogle"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            hostedDomain="http://localhost:5000/auth/google"
          />
        </Modal>
      </div>
    );
  }
}

Login = inject("store")(observer(Login));
export default Login;
