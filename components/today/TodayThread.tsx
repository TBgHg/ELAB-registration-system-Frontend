import { Layout, Text } from "@ui-kitten/components";
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import type { ContentHeadResponse } from "@/types/common";
import { store } from "@/libs/store";
import { useNavigation } from "@react-navigation/native";
import Markdown from "../space/content/Markdown";
import AuthorComponent from "../space/content/Author";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    borderColor: "#E4E9F2",
    borderWidth: 2,
    marginVertical: 4,
  },
  tag: {
    marginBottom: 4,
  },
  title: {
    marginBottom: 8,
  },
});

interface TodayThreadProps {
  thread: ContentHeadResponse & {
    space_id?: string;
  };
}

const TodayThread = ({ thread }: TodayThreadProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onPress={async () => {
        if (thread.space_id !== undefined) {
          await store.space.setSpaceId(thread.space_id);
        }
        navigation.navigate("MainNavigator", {
          screen: "TabNavigator",
          params: {
            screen: "SpaceNavigator",
            params: {
              screen: "SpaceThreadPage",
              params: {
                id: thread.content_id,
              },
            },
          },
        });
      }}
    >
      <Layout style={styles.container}>
        <Layout>
          <Text category="s1" style={styles.tag}>
            今天的帖子
          </Text>
          <Text category="h4" style={styles.title}>
            {thread.title}
          </Text>
          <Text category="p1">
            <Markdown content={thread.summary} summary={true} />
          </Text>
          <AuthorComponent
            author={thread.author}
            lastUpdatedAt={thread.last_update_at}
          />
        </Layout>
      </Layout>
    </Pressable>
  );
};

export default TodayThread;
