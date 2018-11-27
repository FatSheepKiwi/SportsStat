import {decorate, observable} from "mobx"

class Store {
    playerData = [];
    playerStatistic = [];
    loadingInfo = true;   

    loginModalVisible = true;
    registerModalVisible = false;
    userName = "";
}

decorate(Store, {
    playerData: observable,
    playerStatistic: observable,
    loadingInfo: observable,
    loginModalVisible : observable,
    registerModalVisible : observable,
    userName : observable

})

export default Store;