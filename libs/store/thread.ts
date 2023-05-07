import type { ThreadCommentCountsResponse } from "@/types/thread";
import { makeAutoObservable } from "mobx";

import { createApiServerClient } from "../client/v1";

import type { RootStore } from ".";
import type { ContentHeadResponse } from "@/types/common";

import { createEmptyContentHeadResponse } from "@/types/common";

/**
 * 论坛帖子的数据存储。
 *
 * 论坛的数据抓取策略：
 *
 * *（需要注意，科中应用尽可能少用NavigationParam，因为实在是太麻烦了）*
 * 1. 在跳转论坛帖子页面前，先对ThreadStore输入threadHead
 * 2. 跳转论坛帖子页面后，使用useThread Hook获取帖子数据
 * 3. 离开论坛帖子页面后，清空ThreadStore
 */
class ThreadStore {
  rootStore: RootStore;
  /**
   * 当前正在访问的论坛帖子。
   */
  thread = createEmptyContentHeadResponse();

  threadId = "";

  /**
   * 设置论坛头。
   * @param thread 要设置的论坛头。
   */
  setThreadHead(thread: ContentHeadResponse) {
    this.thread = thread;
  }

  setThreadId(threadId: string) {
    this.threadId = threadId;
  }

  /**
   * 评论总个数，这对后续useComments Hook的分页抓取有用。
   */
  commentsAmount = 0;

  /**
   * 设置评论总个数。
   * @param amount 要设置的评论总个数。
   */
  setCommentsAmount(amount: number) {
    this.commentsAmount = amount;
  }

  /**
   * 抓取评论总个数。
   */
  async fetchCommentsAmount() {
    if (this.rootStore.user.userStatus !== "authorized") {
      return;
    }
    const { accessToken } = this.rootStore.user.credential;
    const client = createApiServerClient(accessToken);
    try {
      const { data }: { data: ThreadCommentCountsResponse } = await client.head(
        `/space/${this.rootStore.space.space.space_id}/thread/${this.threadId}/comments`
      );
      this.setCommentsAmount(data.counts);
    } catch (err) {
      throw new Error("在获取评论个数期间发生了错误。", {
        cause: err,
      });
    }
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
}
export default ThreadStore;
