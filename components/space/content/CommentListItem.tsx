import CommentClient from "@/libs/client/v1/space/comment";
import { store } from "@/libs/store";
import type { CommentHead } from "@/types/thread";
import { Avatar, Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Markdown from "./Markdown";

interface CommentListItemProps {
  comment: CommentHead;
  threadId: string;
  mutate: () => Promise<CommentHead[]>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
  },
  avatarContainer: {
    flex: 1,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  author: {
    padding: 8,
  },
  name: {
    marginBottom: 4,
  },
  like: {
    flex: 1,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

const CommentListItem = ({
  comment,
  mutate,
  threadId,
}: CommentListItemProps) => {
  const [laoding, setIsLoading] = React.useState(false);
  return (
    <Layout>
      <Layout style={styles.header}>
        <Layout style={styles.avatarContainer}>
          <Avatar
            source={{
              uri: comment.author.avatar,
            }}
            size="giant"
          />
        </Layout>
        <Layout style={styles.author}>
          <Text category="h6" style={styles.name}>
            {comment.author.name}
          </Text>
          <Text category="c1" appearance="hint">
            {`最后更新于 ${comment.last_updated_at.getFullYear()}年${
              comment.last_updated_at.getMonth() + 1
            }月${comment.last_updated_at.getDate()}日 ${comment.last_updated_at
              .getHours()
              .toString()
              .padStart(2, "0")}:${comment.last_updated_at
              .getMinutes()
              .toString()
              .padStart(2, "0")}`}
          </Text>
        </Layout>
      </Layout>
      <Layout style={styles.container}>
        <Markdown content={comment.content} />
      </Layout>
      <Layout style={styles.like}>
        <Pressable
          disabled={laoding}
          onPress={() => {
            const client = new CommentClient(
              store.user.credential.accessToken,
              store.space.space.space_id,
              threadId
            );
            setIsLoading(true);
            client
              .likeComment(comment.comment_id)
              .then(async () => {
                return await mutate();
              })
              .then(() => {
                setIsLoading(false);
              })
              .catch((err) => {
                console.error(err);
                setIsLoading(false);
              });
          }}
        >
          <View>
            {comment.likes ? (
              <Icon name="heart" fill="red" />
            ) : (
              <Icon name="heart-outline" fill="red" />
            )}
          </View>
        </Pressable>
      </Layout>
    </Layout>
  );
};

export default CommentListItem;
