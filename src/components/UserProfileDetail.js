import React from "react";
import { Layout, message, Card, Icon } from "antd";
import { observer, inject } from "mobx-react";

import SportStatServer from "./../apis/sportStatServer";

class UserProfileDetail extends React.Component {
  state = { user: {} };

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

  loadEditProfilePage = () => {
    this.props.history.push("/user-profile/edit");
    this.reloadPage();
  };

  reloadPage = () => {
    window.location.reload();
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    if (typeof this.state.user.username === "undefined") {
      return <div className="ui header">Loading...</div>;
    }

    const { Header, Footer, Sider, Content } = Layout;
    const { Meta } = Card;
    const user = this.state.user;
    return (
      <div className="ui container">
        <Layout>
          <Sider>
            <Card
              hoverable
              style={{ width: 240, height: "100%", backgroundColor: "#FFFAFA" }}
              cover={
                <img
                  alt="user avatar"
                  style={{ width: 240, height: 240 }}
                  src={user.avatar}
                />
              }
              actions={[
                <Icon type="edit" onClick={this.loadEditProfilePage} />
              ]}
            >
              <Meta
                title={"hi, " + user.username}
                description={user.personalSignature}
              />
            </Card>
          </Sider>
          <Layout style={{ marginLeft: 50 }}>
            <Header style={{ opacity: 0.25, backgroundColor: "#ffffff" }}>
              <h1
                style={{ color: "#000000", margin: 10 }}
                className="ui center aligned header"
              >
                Profile
              </h1>
            </Header>
            <Content style={{ opacity: 0.8, backgroundColor: "#ffffff" }}>
              <div className="ui text container">
                <div className="ui segments">
                  <div className="ui segment">username: {user.username}</div>
                  <div className="ui segment">
                    signature: {user.personalSignature}
                  </div>
                  <div className="ui segment">
                    email: {user.email ? user.email : user.secondEmail}
                  </div>
                  <div className="ui segment">
                    favorate team: {user.favoriteTeam}
                  </div>
                  <div className="ui segment">
                    favorate player: {user.favoritePlayer}
                  </div>
                </div>
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

UserProfileDetail = inject("store")(observer(UserProfileDetail));
export default UserProfileDetail;
