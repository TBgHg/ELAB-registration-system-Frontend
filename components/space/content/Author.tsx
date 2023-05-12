import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Avatar, Text } from "@ui-kitten/components";
import type { Author } from "@/types/common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
  },
  avatarContainer: {
    // flex: 1,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  author: {
    padding: 8,
    flex: 1,
    justifyContent: "center",
  },
  name: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  like: {
    flex: 1,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

interface AuthorComponentProps {
  author: Author;
  lastUpdatedAt: Date;
}

const AuthorComponent = ({ author, lastUpdatedAt }: AuthorComponentProps) => {
  return (
    <Layout style={styles.header}>
      <Layout style={styles.avatarContainer}>
        <Avatar
          source={{
            uri: author.avatar,
          }}
          size="tiny"
        />
      </Layout>
      <Layout style={styles.author}>
        <Text category="p1" style={styles.name}>
          {author.name}
          {/* Zeithrold */}
        </Text>
        <Text category="c1" appearance="hint">
          {`最后更新于 ${lastUpdatedAt.getFullYear()}年${
            lastUpdatedAt.getMonth() + 1
          }月${lastUpdatedAt.getDate()}日 ${lastUpdatedAt
            .getHours()
            .toString()
            .padStart(2, "0")}:${lastUpdatedAt
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}
        </Text>
      </Layout>
    </Layout>
  );
};

export default AuthorComponent;
