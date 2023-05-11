import React from "react";
import { marked } from "marked";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

interface MarkdownProps {
  content: string;
}

const Markdown = ({ content }: MarkdownProps) => {
  const { width } = useWindowDimensions();
  return <RenderHTML contentWidth={width} source={{ html: marked(content) }} />;
};

export default Markdown;
