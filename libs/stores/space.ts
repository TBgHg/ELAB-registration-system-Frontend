import { makeAutoObservable } from "mobx";

import { createEmptySpace } from "@/types/space";

import type { Space } from "@/types/space";
import type { RootStore } from ".";
/**
 * 用于存储空间信息。
 */
class SpaceStore {
  rootStore: RootStore;

  /**
   * 当前正在访问的空间。
   */
  space = createEmptySpace();
  /**
   * 用于存储额外的信息。
   */
  meta?: any = {};

  setSpace(space: Space) {
    this.space = space;
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
}

export default SpaceStore;
