import React from "react";
import { observer, inject, Provider } from "mobx-react";
import { Upload, Icon, message } from "antd";
import SportStatServer from "./../apis/sportStatServer";
import "./UserProfileForm.css";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error("Image must smaller than 1MB!");
  }
  return isLt1M;
}

class UserProfileForm extends React.Component {
  state = {
    loading: false
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
      message.success("upload avatar success!");
      console.log("response: " + JSON.stringify(info.file.response, null, 2));
      console.log("linkProps: " + info.file.linkProps);
    } else if (info.file.status === "error") {
      if (info.file.error.status == "401") {
        message.error("Please login...");
      } else {
        message.error(info.file.response);
      }
      console.log("response:" + JSON.stringify(info.file));
      this.setState({ loading: false });
    } else if (info.file.status === "removed") {
      message.success("remove avatar success!");
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload avatar</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        accept="image/*"
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:5000/profile/avatar"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        withCredentials={true}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

UserProfileForm = inject("store")(observer(UserProfileForm));
export default UserProfileForm;
