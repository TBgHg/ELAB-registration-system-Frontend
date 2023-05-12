import useSWR from "swr";
import ThreadClient from "../client/v1/space/thread";

const useThreadSearch = (
  spaceId: string,
  accessToken: string,
  query: string
) => {
  return useSWR(
    [spaceId, accessToken, query, "useThreadSearch"],
    async ([_spaceId, _accessToken, _query]) => {
      const client = new ThreadClient(_accessToken, _spaceId);
      const result = await client.searchThread({
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

export default useThreadSearch;
