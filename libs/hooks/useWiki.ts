import useSWR from "swr";

import WikiClient from "../client/v1/space/wiki";

const useWiki = (spaceId: string, id: string, accessToken: string) => {
  return useSWR(
    [spaceId, id, accessToken, "useWiki"],
    async ([_spaceId, _id, _accessToken]) => {
      const client = new WikiClient(_accessToken, _spaceId);
      const head = await client.getWiki(_id);
      const content = await client.getWikiHistoryContent(
        _id,
        head.current_history_id
      );
      return Object.assign(head, {
        content,
      });
    }
  );
};

export default useWiki;
