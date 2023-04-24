import { makeAutoObservable } from "mobx";

import SpaceStore from "./space";
import ThreadStore from "./thread";
import UserStore from "./user";

class RootStore {
  thread: ThreadStore;
  user: UserStore;
  space: SpaceStore;

  constructor() {
    makeAutoObservable(this);
    this.space = new SpaceStore(this);
    this.thread = new ThreadStore(this);
    this.user = new UserStore(this);
  }
}

const store = new RootStore();

export { store, RootStore };
