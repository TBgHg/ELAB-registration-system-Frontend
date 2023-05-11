import type { ContentType } from "@/types/common";
import useThread from "./useThread";
import useWiki from "./useWiki";

const useContent = (
  spaceId: string,
  accessToken: string,
  contentType: ContentType,
  id?: string
) => {
  if (contentType === "wiki") {
    return useWiki(spaceId, accessToken, id);
  }
  return useThread(spaceId, accessToken, id);
};

export default useContent;
