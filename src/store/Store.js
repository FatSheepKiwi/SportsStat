import { decorate, observable } from "mobx";

class Store {
  playerData = [];
  playerStatistic = [];
  playerRankStatistic = [];
  playerNames = [];
  teamBasicInfos = [];
  team = {};
  teamNames = [];
  userPosts = [];
  userHeaders = [];
  userTopics = {};
  user = {};
  loadingInfo = true;

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
  playerRankStatistic: observable,
  playerNames: observable,
  teamNames: observable
});

export default Store;
