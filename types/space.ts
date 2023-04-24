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

function createEmptySpace() {
  return {
    id: "",
    name: "",
    description: "",
  };
}

export type { Space };
export { createEmptySpace };
