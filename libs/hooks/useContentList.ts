import type {
  ContentHeadResponse,
  ContentSearchParams,
  ContentType,
} from "@/types/common";
import useSWRInfinite from "swr/infinite";
import ThreadClient from "../client/v1/space/thread";
import WikiClient from "../client/v1/space/wiki";

const makeGetKey = (
  type: ContentType,
  spaceId: string,
  query: string,
  accessToken: string
): ((
  index: number,
  previousPageData: ContentHeadResponse[]
) => [ContentType, string, string, number, string, string] | null) => {
  return (index: number, previousPageData: ContentHeadResponse[]) => {
    if (previousPageData !== null && previousPageData.length === 0) {
      return null;
    }
    return [type, spaceId, query, index + 1, accessToken, "contentList"];
  };
};

const useContentList = (
  type: ContentType,
  spaceId: string,
  query: string,
  accessToken: string
) => {
  const getKey = makeGetKey(type, spaceId, query, accessToken);
  return useSWRInfinite(
    getKey,
    async ([_type, _spaceId, _query, _pageIndex, _accessToken]) => {
      const searcher = (internalType: ContentType) => {
        if (internalType === "wiki") {
          const wikiClient = new WikiClient(_accessToken, _spaceId);
          return async (params?: ContentSearchParams) => {
            const result = await wikiClient.searchWiki(params);
            console.log(result);
            return {
              contents: result.wikis,
              counts: result.counts,
            };
          };
        }
        const threadClient = new ThreadClient(_accessToken, _spaceId);
        return async (params?: ContentSearchParams) => {
          const result = await threadClient.searchThread(params);
          return {
            contents: result.threads,
            counts: result.counts,
          };
        };
      };
      const search = searcher(_type);
      const result: {
        contents: ContentHeadResponse[];
        counts: number;
      } = await search({
        order: "time_desc",
        name: _query,
        page_size: 10,
        page: _pageIndex,
        space_id: _spaceId,
      });
      return result.contents;
    }
  );
};

export default useContentList;
