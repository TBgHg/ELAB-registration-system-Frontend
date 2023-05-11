import NavigationCloseAction from "@/components/NavigationCloseAction";
import type { ContentType } from "@/types/common";
import { TopNavigation } from "@ui-kitten/components";
import React from "react";

interface HeaderProps {
  type: ContentType;
  title: string;
}

const Header = ({ type, title }: HeaderProps) => {
  return (
    <TopNavigation
      title={title}
      subtitle={type === "wiki" ? "知识库" : "帖子"}
      accessoryLeft={NavigationCloseAction}
    />
  );
};

export default Header;
