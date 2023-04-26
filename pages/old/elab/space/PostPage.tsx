import { marked } from "marked";
import { observer } from "mobx-react";
import React from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RenderHTML from "react-native-render-html";

import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Input, Layout, Text } from "@ui-kitten/components";

import { spaceStore } from "@/lib/store";
import type { SpaceNavigatorParamList } from "./SpaceNavigator";

type PostPageProps = NativeStackScreenProps<
  SpaceNavigatorParamList,
  "PostPage"
>;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  author: {
    marginTop: 8,
    flex: 1,
    flexDirection: "row",
  },
});

const PostPage = observer(({ navigation, route }: PostPageProps) => {
  const [compiledContent, setCompiledContent] = React.useState("");
  // 获取参数
  const { id, spaceId } = route.params;
  const space = spaceStore.spaces.find((space) => space.id === spaceId);
  if (space === undefined) {
    Alert.alert("错误", "该空间不存在");
    navigation.goBack();
    return null;
  }
  const post = space.posts.find((post) => post.id === id);
  if (post === undefined) {
    Alert.alert("错误", "该帖子不存在");
    navigation.goBack();
    return null;
  }
  const comments = space.comments.filter((comment) => comment.postId === id);
  const [comment, setComment] = React.useState("");
  const { width } = Dimensions.get("window");
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title: post.title,
      });
      spaceStore.setCurrentPage("post");
      spaceStore.setCanGoBack(true);
      setCompiledContent(marked(post.content));
    }, [])
  );
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Layout style={styles.subContainer}>
          <Text category="h2">{post.title}</Text>

          <Layout style={styles.author}>
            <Text>由</Text>
            <Avatar
              source={{ uri: post.author.avatar }}
              size="tiny"
              style={{ marginHorizontal: 4 }}
            />
            <Text style={{ fontWeight: "bold" }}>{post.author.name}</Text>
            <Text>最后于{post.createdAt.toLocaleDateString()}修改</Text>
          </Layout>
        </Layout>
        <Layout style={styles.subContainer}>
          <RenderHTML source={{ html: compiledContent }} contentWidth={width} />
        </Layout>
        <Layout style={styles.subContainer}>
          <Input
            placeholder="你的评论..."
            size="large"
            value={comment}
            onChangeText={setComment}
            returnKeyType="send"
            onSubmitEditing={() => {
              console.log("submit");
              spaceStore.createComment(post.id, space.id, comment);
              setComment("");
            }}
          ></Input>
        </Layout>
        <Layout
          style={[
            styles.subContainer,
            {
              marginTop: 16,
            },
          ]}
        >
          {comments.map((comment, index) => {
            return (
              <Layout
                style={{ flex: 1, flexDirection: "row", marginVertical: 12 }}
                key={index}
              >
                <Avatar source={{ uri: comment.author.avatar }} />
                <Layout style={{ flex: 1, marginLeft: 8 }}>
                  <Layout
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", marginRight: 4 }}>
                      {comment.author.name}
                    </Text>
                    <Text category="p2">
                      {comment.createdAt.toLocaleDateString()}
                    </Text>
                  </Layout>
                  <Text>{comment.content}</Text>
                </Layout>
              </Layout>
            );
          })}
        </Layout>
      </ScrollView>
    </Layout>
  );
});

export default PostPage;
