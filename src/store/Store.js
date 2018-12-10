import { decorate, observable } from "mobx";

class Store {
  playerData = [];
  playerStatistic = [];
  teamBasicInfos = [];
  userPosts = [];
  userHeaders = [];
  userTopics = {};
  user = {};
  team = {};
  loadingInfo = true;
  playerRankStatistic = [];

  loginModalVisible = false;
  registerModalVisible = false;
  createTopicVisible = false;
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
  user: observable,
  team: observable,
  playerRankStatistic: observable
});

export default Store;
