import useSWR from "swr";
import TodayClient from "../client/v1/today";

const useTodayThread = (accessToken: string) => {
  return useSWR([accessToken, "useTodayThread"], async ([_accessToken]) => {
    const client = new TodayClient(_accessToken);
    const result = await client.getTodayThread();
    return result;
  });
};

export default useTodayThread;
