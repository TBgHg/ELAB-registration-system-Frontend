import useThread from "@/libs/hooks/useThread";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import React from "react";
import AuthorComponent from "./Author";
import Markdown from "./Markdown";

interface ThreadContentProps {
  threadId: string;
  spaceId: string;
  accessToken: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 8,
  },
});

const ThreadContent = ({
  threadId,
  spaceId,
  accessToken,
}: ThreadContentProps) => {
  const { data, isLoading, isValidating } = useThread(
    spaceId,
    threadId,
    accessToken
  );
  return (
    <Layout style={styles.container}>
      {isValidating || isLoading || data === undefined ? (
        <Spinner />
      ) : (
        <>
          <Layout style={styles.title}>
            <Text category="h2">{data.title}</Text>
          </Layout>
          <AuthorComponent
            author={data.author}
            lastUpdatedAt={data.last_update_at}
          />
          <Markdown content={data.content} />
        </>
      )}
    </Layout>
  );
};

export default ThreadContent;
