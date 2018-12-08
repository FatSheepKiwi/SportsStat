import { decorate, observable } from "mobx";

class Store {
  playerData = [];
  playerStatistic = [];
  teamBasicInfo = [];
  userPosts = [];
  userHeaders = [];
  userTopics = {};
  user = {};
  loadingInfo = true;

  loginModalVisible = false;
  registerModalVisible = false;
  createTopicVisible = false;
  email = "";
}

decorate(Store, {
  playerData: observable,
  teamBasicInfo: observable,
  playerStatistic: observable,
  loadingInfo: observable,
  loginModalVisible: observable,
  registerModalVisible: observable,
  email: observable,
  userProfileVisible: observable,
  userPosts: observable,
  userHeaders: observable,
  userTopics: observable,
  user: observable
});

export default Store;
