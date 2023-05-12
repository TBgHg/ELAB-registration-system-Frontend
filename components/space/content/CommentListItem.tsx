import CommentClient from "@/libs/client/v1/space/comment";
import { store } from "@/libs/store";
import type { CommentHead } from "@/types/thread";
import { Divider, Icon, Layout } from "@ui-kitten/components";
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
    padding: 16,
  },
  like: {
    padding: 4,
    marginBottom: 8,
    marginRight: 8,
    width: 32,
    height: 32,
    alignSelf: "flex-end",
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
      <Divider />
      <Layout
        style={{
          padding: 4,
        }}
      >
        <AuthorComponent
          author={comment.author}
          lastUpdatedAt={comment.last_updated_at}
        />
      </Layout>
      <Divider />
      <Layout
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
      >
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
            const likePromise = comment.likes
              ? client.unlikeComment(comment.comment_id)
              : client.likeComment(comment.comment_id);
            likePromise
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
              <Icon name="heart" fill="black" size="small" />
            ) : (
              <Icon name="heart-outline" fill="black" size="small" />
            )}
          </View>
        </Pressable>
      </Layout>
    </Layout>
  );
};

export default CommentListItem;
