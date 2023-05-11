import type { CommentHead } from "@/types/thread";
import useSWRInfinite from "swr/infinite";

import CommentClient from "../client/v1/space/comment";

const makeGetKey = (
  spaceId: string,
  threadId: string,
  accessToken: string
): ((
  pageIndex: number,
  previousPageData: CommentHead[]
) => [string, string, string, number, string] | null) => {
  return (pageIndex: number, previousPageData: CommentHead[]) => {
    if (previousPageData !== undefined && !(previousPageData.length !== 0)) {
      return null;
    }
    return [spaceId, threadId, accessToken, pageIndex + 1, "useComments"];
  };
};

const useComments = (
  spaceId: string,
  threadId: string,
  accessToken: string
) => {
  return useSWRInfinite(
    makeGetKey(spaceId, threadId, accessToken),
    async ([_spaceId, _threadId, _accessToken, _pageIndex]) => {
      const client = new CommentClient(_accessToken, _spaceId, _threadId);
      const result = await client.getComment(_pageIndex);
      return result;
    }
  );
};

export default useComments;
