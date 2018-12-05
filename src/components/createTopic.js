import React from "react";
import { Card, Form } from "antd";
import { observer, inject, Provider } from "mobx-react";
import CreateTopicForm from "./createTopicForm";

class CreateTopic extends React.Component {
  render() {
    const WrappedCreateTopicForm = Form.create()(CreateTopicForm);
    return (
      <div className="ui container center">
        <Card
          title="Create Topic"
          extra={<a href="/#">More</a>}
          style={{ width: "100%" }}
        >
          <Provider store={this.props.store}>
            <WrappedCreateTopicForm />
          </Provider>
        </Card>
      </div>
    );
  }
}

CreateTopic = inject("store")(observer(CreateTopic));
export default CreateTopic;
