import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class UserCredentialStore {
  access_token = "";
  isElabMember = false;
  async checkSessionStatus() {
    if (this.access_token === "") {
      return "unauthorized";
    }
    // 在这里暂且写成空白，以后再进行鉴权
    if (this.isElabMember) {
      return "authorized";
    }
    return "not_elab_member";
  }

  constructor() {
    // 通过AsyncStorage读取数据
    AsyncStorage.getItem("access_token")
      .then((value) => {
        if (value !== null) {
          this.access_token = value;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // 处理错误

    makeAutoObservable(this);
  }
}

export default UserCredentialStore;
