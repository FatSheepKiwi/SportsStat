import React from "react";
import { Layout } from "antd";
import NavigationBar from "./NavigationBar";
import { observer, inject, Provider } from "mobx-react";
import Background from "./background.jpeg";
import Login from "./Login";
import Register from "./Register";

const { Header, Content, Footer } = Layout;

class Framework extends React.Component {
  render() {
    //console.log("test render");
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            //background: '#001529 ',
            backgroundImage: "url(" + Background + ")",
            backgroundSize: "100%",
            padding: 8,
            height: 40
          }}
        />
        <Provider store={this.props.store}>
          <NavigationBar />
        </Provider>
        <Content>
          <div>
            <Provider store={this.props.store}>{this.props.children}</Provider>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Sport Stats @2018
          <div>
            <Provider store={this.props.store}>
              <Login />
            </Provider>
            <Provider store={this.props.store}>
              <Register />
            </Provider>
          </div>
        </Footer>
      </Layout>
    );
  }
}

Framework = inject("store")(observer(Framework));
export default Framework;
