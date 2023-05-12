import React from "react";
import { marked } from "marked";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

interface MarkdownProps {
  content: string;
  summary?: boolean;
}

const Markdown = ({ content, summary }: MarkdownProps) => {
  const { width } = useWindowDimensions();
  return (
    <RenderHTML
      ignoredStyles={
        summary !== undefined && summary
          ? ["fontSize", "fontFamily", "fontStyle", "fontWeight"]
          : undefined
      }
      contentWidth={width}
      source={{ html: marked(content) }}
    />
  );
};

export default Markdown;
