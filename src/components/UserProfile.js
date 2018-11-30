import React from 'react';
import {Row, Col, Form, Button, Modal} from 'antd';
import {observer,inject, Provider} from 'mobx-react';
import UserProfileForm from './UserProfileForm';

class UserProfile extends React.Component {

  render() {
    const WrappedUserProfileForm = Form.create()(UserProfileForm);
    return (
      <div className="ui container">

        <Provider store = {this.props.store}>
            <WrappedUserProfileForm />
        </Provider>                  
      </div>
    );
  }
}

UserProfile = inject('store')(observer(UserProfile))
export default UserProfile;