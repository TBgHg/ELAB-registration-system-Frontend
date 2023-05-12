import useSWR from "swr";
import WikiClient from "../client/v1/space/wiki";

const useWikiSearch = (spaceId: string, accessToken: string, query: string) => {
  return useSWR(
    [spaceId, accessToken, query, "useWikiSearch"],
    async ([_spaceId, _accessToken, _query]) => {
      const client = new WikiClient(_accessToken, _spaceId);
      const result = await client.searchWiki({
        name: _query,
        space_id: _spaceId,
        page: 1,
        page_size: 10,
        order: "time_desc",
      });
      return result;
    }
  );
};

export default useWikiSearch;
