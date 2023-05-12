import useSWR from "swr";
import TodayClient from "../client/v1/today";

const useTodayWiki = (accessToken: string) => {
  return useSWR([accessToken, "useTodayWiki"], async ([_accessToken]) => {
    const client = new TodayClient(_accessToken);
    const result = await client.getTodayWiki();
    return result;
  });
};

export default useTodayWiki;
