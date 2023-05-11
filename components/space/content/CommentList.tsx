import React from "react";
import CommentClient from "@/libs/client/v1/space/comment";
import { Layout, Input, Spinner, Text } from "@ui-kitten/components";
import { Alert, StyleSheet } from "react-native";
import CommentListItem from "./CommentListItem";
import useComments from "@/libs/hooks/useComment";
import { useFocusEffect } from "@react-navigation/native";

interface CommentListProps {
  threadId: string;
  spaceId: string;
  accessToken: string;
  isReachEnd: boolean;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

const CommentList = ({
  threadId,
  spaceId,
  accessToken,
  isReachEnd,
}: CommentListProps) => {
  const { data, isValidating, isLoading, mutate, setSize, size } = useComments(
    spaceId,
    threadId,
    accessToken
  );
  useFocusEffect(
    React.useCallback(() => {
      mutate().catch((err) => {
        console.error(err);
      });
    }, [])
  );
  React.useEffect(() => {
    if (isReachEnd) {
      setSize(size + 1).catch((err) => {
        console.error(err);
      });
    }
  }, [isReachEnd]);
  const [input, setInput] = React.useState("");
  return (
    <Layout>
      <Input
        value={input}
        onChangeText={setInput}
        returnKeyType="send"
        maxLength={300}
        multiline
        placeholder="评论..."
        onSubmitEditing={() => {
          const client = new CommentClient(accessToken, spaceId, threadId);
          client
            .createComment(input)
            .then(async () => {
              await mutate();
            })
            .catch((err) => {
              console.error(err);
              Alert.alert("评论失败", "请稍后再试");
            });
        }}
      />
      {isValidating || isLoading ? <Spinner /> : null}
      {data === undefined ? (
        <Layout style={styles.container}>
          <Text category="h6">没有评论</Text>
          <Text>你可以成为沙发！</Text>
        </Layout>
      ) : (
        data.flat().map((comment) => {
          return (
            <CommentListItem
              key={`comment-${comment.comment_id}`}
              comment={comment}
              threadId={threadId}
              mutate={mutate}
            />
          );
        })
      )}
    </Layout>
  );
};

export default CommentList;
