import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "../apis/sportStatServer";
import GoogleLogin from "react-google-login";

class GoogleLogin extends React.Component {
  handleSubmit = () => {
    SportStatServer.get("/auth/google/")
      .then(response => {
        console.log("after response: " + response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const responseGoogle = response => {
      this.props.store.loginModalVisible = false;
      this.props.store.registerModalVisible = false;
      console.log("onSuccess: " + response);
    };
    return (
      <div>
        <div>
          <Button type="primary" block onClick={this.handleSubmit}>
            Login with Google
          </Button>
        </div>

        <GoogleLogin
          clientId="654921049052-m752jqhhpe529qssr10rpeghbj61s2uv.apps.googleusercontent.com"
          buttonText="LoginGoogle"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

GoogleLogin = inject("store")(observer(GoogleLogin));
export default GoogleLogin;
