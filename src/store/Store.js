import {decorate, observable} from "mobx"

class Store {
    playerData = [];
    playerStatistic = [];
    loadingInfo = true;   

    loginModalVisible = true;
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
    userProfileVisible: observable
})

export default Store;