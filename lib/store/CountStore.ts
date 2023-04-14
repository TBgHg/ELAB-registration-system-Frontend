import { makeAutoObservable } from "mobx";

export default class CountStore {
  count = 0;
  text = "hello, world";

  get incrementFrom(): number {
    return this.count;
  }

  set incrementFrom(n: number) {
    this.count += n;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
