import useSWR from "swr";
import ThreadClient from "../client/v1/space/thread";

const useTodayThreadInSpace = (spaceId: string, accessToken: string) => {
  return useSWR(
    [spaceId, accessToken, "useTodayThreadInSpace"],
    async ([_spaceId, _accessToken]) => {
      const client = new ThreadClient(_accessToken, _spaceId);
      const result = await client.todayThread();
      return result;
    }
  );
};

export default useTodayThreadInSpace;
