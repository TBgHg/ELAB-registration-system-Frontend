import { makeAutoObservable } from "mobx";

import ApplicationStore from "./application";
import SpaceStore from "./space";
import ThreadStore from "./thread";
import UserStore from "./user";

class RootStore {
  thread: ThreadStore;
  user: UserStore;
  space: SpaceStore;
  application: ApplicationStore;

  constructor() {
    makeAutoObservable(this);
    this.space = new SpaceStore(this);
    this.thread = new ThreadStore(this);
    this.user = new UserStore(this);
    this.application = new ApplicationStore(this);
  }
}

const store = new RootStore();

export { store, RootStore };
