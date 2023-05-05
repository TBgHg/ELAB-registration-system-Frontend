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

type SpacePatchType = "add" | "edit";

interface SpacePatchParam {
  id?: string;
  type: SpacePatchType;
}

function createEmptySpace() {
  return {
    id: "",
    name: "",
    description: "",
  };
}

export type { Space, SpacePatchType, SpacePatchParam };
export { createEmptySpace };
