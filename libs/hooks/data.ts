import type {
  Comment,
  CommentServerResponse,
  ThreadServerResponse,
} from "@/types/thread";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

import { createApiServerClient } from "../client";

import type { SpaceServerResponse } from "@/types/space";

/**
 * 根据空间ID，获取空间
 */
function useSpace(id: string, accessToken: string) {
  return useSWR([`/space/${id}`, accessToken], async ([url, accessToken]) => {
    const client = createApiServerClient(accessToken);
    const { data }: SpaceServerResponse = (await client.get(url)).data;
    return data.space;
  });
}

/**
 * 根据帖子ID与空间ID，获取帖子内容
 *
 * `const { data, error, isLoading, isValidating, mutate, size, setSize } = useThread(...)`
 * @param id 帖子ID
 * @param spaceId 空间ID
 * @param accessToken 用户的AccessToken
 */
function useThread(id: string, spaceId: string, accessToken: string) {
  return useSWR(
    [`/space/${spaceId}/thread/${id}`, accessToken],
    async ([url, _accessToken]: string[]) => {
      const client = createApiServerClient(_accessToken);
      const { data }: ThreadServerResponse = (await client.get(url)).data;
      return data.thread;
    }
  );
}

/**
 * 根据帖子ID与空间ID，获取评论内容
 *
 * `const { data, error, isLoading, isValidating, mutate, size, setSize } = useComments(...)`
 * @param id 帖子ID
 * @param spaceId 空间ID
 * @param accessToken 用户的AccessToken
 */
function useComments(id: string, spaceId: string, accessToken: string) {
  return useSWRInfinite(
    (pageIndex: number, previousPageData?: Comment[]) => {
      if (previousPageData !== undefined && previousPageData.length === 0) {
        return null;
      }
      return [
        `/space/${spaceId}/thread/${id}/comments?page=${pageIndex}`,
        accessToken,
      ];
    },
    async ([url, _accessToken]: string[]) => {
      const client = createApiServerClient(_accessToken);
      const { data }: CommentServerResponse = (await client.get(url)).data;
      return data.comments;
    }
  );
}

export { useSpace, useComments, useThread };
