import { makeAutoObservable } from "mobx";

import { createEmptySpace } from "@/types/space";
import type { SpacePosition, Space } from "@/types/space";

import type { RootStore } from ".";
import SpaceClient from "@/libs/client/v1/space/space";
import MemberClient from "@/libs/client/v1/space/member";

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

  position: "not_member" | SpacePosition = "not_member";

  setSpace(space: Space) {
    this.space = space;
  }

  async setSpaceId(id: string) {
    const client = new SpaceClient(this.rootStore.user.credential.accessToken);
    this.setSpace(await client.fetchSpace(id));
    await this.fetchMeta();
    await this.fetchPosition();
  }

  setMeta(meta: any) {
    this.meta = meta;
  }

  async fetchMeta() {
    const client = new SpaceClient(this.rootStore.user.credential.accessToken);
    this.setMeta(await client.fetchMeta(this.space.space_id));
  }

  setPosition(position: "not_member" | SpacePosition) {
    this.position = position;
  }

  async fetchPosition() {
    const client = new MemberClient(
      this.rootStore.user.credential.accessToken,
      this.space.space_id
    );
    const members = await client.fetchMemberList();
    const currentMember = members.find(
      (member) => member.openid === this.rootStore.user.user.openid
    );
    if (currentMember === undefined) {
      this.position = "not_member";
      return;
    }
    this.setPosition(currentMember.position);
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
}

export default SpaceStore;
