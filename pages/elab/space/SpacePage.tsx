// 先做一个示例用的页面，里面包含Layout和Text（来自kitten-ui）

import { observer } from "mobx-react";
import React from "react";

import { Avatar, Card, Layout, Text } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SpaceNavigatorParamList } from "./SpaceNavigator";
import { Alert, Pressable, StyleSheet } from "react-native";
import { spaceStore } from "../../../lib/store";
import { ScrollView } from "react-native-gesture-handler";

type SpacePageProps = NativeStackScreenProps<
  SpaceNavigatorParamList,
  "SpacePage"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
});

const SpacePage = observer(({ navigation, route }: SpacePageProps) => {
  const { params } = route;
  const spaceIndex = spaceStore.spaces.findIndex(
    (space) => space.id === params.id
  );
  React.useEffect(() => {
    console.log(spaceStore.spaces[spaceIndex].posts.length);
  }, [spaceStore.spaces[spaceIndex].posts, spaceIndex]);
  if (spaceIndex === -1) {
    Alert.alert("错误", "该空间不存在");
    navigation.goBack();
    return null;
  }
  const space = spaceStore.spaces[spaceIndex];
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title: space.title,
      });
      spaceStore.setCurrentPage("space");
      spaceStore.setCurrentSpaceId(params.id);
      spaceStore.setCanGoBack(true);
    }, [])
  );
  const { posts } = space;
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout
          style={{
            flex: 1,
            paddingHorizontal: 16,
          }}
        >
          <Text category="h2" style={{ marginBottom: 4 }}>
            {space.title}
          </Text>
          <Text>{space.description}</Text>
        </Layout>
        <Pressable
          onPress={() => {
            navigation.navigate("SpaceMemberPage", {
              id: space.id,
              type: "space-member",
            });
          }}
        >
          <Layout
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              category="p2"
              style={{
                marginRight: 8,
              }}
            >
              有{space.members.length}位成员
            </Text>
            {space.members.map((member, index) => {
              return (
                <Avatar
                  key={index}
                  source={{ uri: member.avatar }}
                  style={{ marginHorizontal: 4 }}
                />
              );
            })}
          </Layout>
        </Pressable>
        <Layout
          style={{
            padding: 16,
          }}
        >
          <Layout>
            <Text category="h4" style={{ marginVertical: 16 }}>
              近期帖子
            </Text>
            {posts.map((post, index) => {
              return (
                <Card
                  key={index}
                  status="primary"
                  style={{
                    marginVertical: 8,
                  }}
                  onPress={() => {
                    navigation.navigate("PostPage", {
                      id: post.id,
                      spaceId: space.id,
                      type: "post",
                    });
                  }}
                >
                  <Text category="h6">{post.title}</Text>
                  <Text category="p2">
                    @{post.author.name} 最后更新于
                    {post.createdAt.toLocaleDateString()}
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                    }}
                  >
                    {post.content.substring(0, 100) + "..."}
                  </Text>
                </Card>
              );
            })}
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
});

export default SpacePage;
