import type { ResponseBase } from "./server";

interface Space {
  /**
   * 空间的UUID。
   */
  id: string;
  /**
   * 空间的名称。
   */
  name: string;
  /**
   * 空间的描述。
   */
  description: string;
}

interface SpaceServerResponse extends ResponseBase {
  data: {
    space: Space;
  };
}

function createEmptySpace() {
  return {
    id: "",
    name: "",
    description: "",
  };
}

export type { Space, SpaceServerResponse };
export { createEmptySpace };
