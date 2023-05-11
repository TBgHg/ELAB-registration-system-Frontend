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
  pageIndex: number,
  previousPageData: ContentHeadResponse[]
) => [ContentType, string, string, number, string] | null) => {
  return (pageIndex: number, previousPageData: ContentHeadResponse[]) => {
    if (previousPageData !== undefined && !(previousPageData.length !== 0)) {
      return null;
    }
    if (query === "") {
      return null;
    }
    return [type, spaceId, query, pageIndex + 1, accessToken];
  };
};

const useContentList = (
  type: ContentType,
  spaceId: string,
  query: string,
  accessToken: string
) => {
  return useSWRInfinite(
    makeGetKey(type, spaceId, query, accessToken),
    async ([_type, _spaceId, _query, _pageIndex, _accessToken]) => {
      const searcher = (internalType: ContentType) => {
        if (internalType === "wiki") {
          const wikiClient = new WikiClient(_accessToken, _spaceId);
          return async (params?: ContentSearchParams) => {
            const result = await wikiClient.searchWiki(params);
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
