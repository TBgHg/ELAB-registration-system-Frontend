import { makeAutoObservable } from "mobx";

import { createEmptySpace } from "@/types/space";

import type { RootStore } from ".";
import SpaceClient from "@/libs/client/v1/space/space";
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

  async setSpaceId(id: string) {
    const client = new SpaceClient(this.rootStore.user.credential.accessToken);
    this.space = await client.fetchSpace(id);
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
}

export default SpaceStore;
