import React from "react";
import { TopNavigation } from "@ui-kitten/components";
import type { OperationType } from "@/types/space";
import { store } from "@/libs/store";
import NavigationBackAction from "@/components/NavigationBackAction";

interface HeaderProps {
  type: OperationType;
  space: boolean;
}

const Header = ({ type, space }: HeaderProps) => {
  return (
    <TopNavigation
      title={type === "invitation" ? "邀请列表" : "申请列表"}
      alignment="center"
      subtitle={space ? store.space.space.name : ""}
      accessoryLeft={NavigationBackAction}
    />
  );
};

export default Header;
