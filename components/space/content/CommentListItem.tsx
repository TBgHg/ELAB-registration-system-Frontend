import CommentClient from "@/libs/client/v1/space/comment";
import { store } from "@/libs/store";
import type { CommentHead } from "@/types/thread";
import { Icon, Layout } from "@ui-kitten/components";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { KeyedMutator } from "swr";
import AuthorComponent from "./Author";
import Markdown from "./Markdown";

interface CommentListItemProps {
  comment: CommentHead;
  threadId: string;
  mutate: KeyedMutator<CommentHead[][]>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
      <AuthorComponent
        author={comment.author}
        lastUpdatedAt={comment.last_updated_at}
      />
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
                if (mutate === undefined) {
                  return;
                }
                await mutate();
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
