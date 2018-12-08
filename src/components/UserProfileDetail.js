import React from "react";
import { Row, Col, Form, Button, Modal } from "antd";
import { observer, inject, Provider } from "mobx-react";
import UserProfileForm from "./UserProfileForm";

class UserProfileDetail extends React.Component {
  state = { user: {} };

  componentDidMount() {}

  render() {
    return (
      <div className="ui container">
        <div />
      </div>
    );
  }
}

UserProfileDetail = inject("store")(observer(UserProfileDetail));
export default UserProfileDetail;
