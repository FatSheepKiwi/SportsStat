import {decorate, observable} from "mobx"

class Store {
    playerData = [];
    playerStatistic = [];
    userPosts = [];
    userHeaders = [];
    userTopics = [];
    user = {};
    loadingInfo = true;   

    loginModalVisible = false;
    registerModalVisible = false;
    email = "";
}

decorate(Store, {
    playerData: observable,
    playerStatistic: observable,
    loadingInfo: observable,
    loginModalVisible : observable,
    registerModalVisible : observable,
    email : observable,
    userProfileVisible: observable,
    userPosts: observable,
    userHeaders: observable,
    userTopics: observable,
    user: observable,
})

export default Store;