import useSWR from "swr";
import SpaceClient from "../client/v1/space/space";

const useSpaceSearch = (accessToken: string, query: string) => {
  return useSWR(
    [accessToken, query, "useSpaceSearch"],
    async ([_accessToken, _query]) => {
      if (_query === "") {
        return undefined;
      }
      const client = new SpaceClient(_accessToken);
      const result = await client.search(query, 1, 10);
      return result;
    }
  );
};

export default useSpaceSearch;
