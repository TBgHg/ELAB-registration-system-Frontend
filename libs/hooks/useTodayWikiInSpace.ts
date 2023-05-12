import useSWR from "swr";
import WikiClient from "../client/v1/space/wiki";

const useTodayWikiInSpace = (spaceId: string, accessToken: string) => {
  return useSWR(
    [spaceId, accessToken, "useTodayWikiInSpace"],
    async ([_spaceId, _accessToken]) => {
      const client = new WikiClient(_accessToken, _spaceId);
      const result = await client.todayWiki();
      return result;
    }
  );
};

export default useTodayWikiInSpace;
