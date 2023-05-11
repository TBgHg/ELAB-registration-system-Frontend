import useSWR from "swr";

import ThreadClient from "../client/v1/space/thread";

const useThread = (spaceId: string, id: string, accessToken: string) => {
  return useSWR(
    [spaceId, id, accessToken, "useThread"],
    async ([_spaceId, _id, _accessToken]) => {
      const client = new ThreadClient(_accessToken, _spaceId);
      const head = await client.getThread(_id);
      const content = await client.getThreadHistoryContent(
        _id,
        head.current_history_id
      );
      return Object.assign(head, {
        content,
      });
    }
  );
};

export default useThread;
