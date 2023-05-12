import { Layout, Text } from "@ui-kitten/components";
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import type { ContentHeadResponse } from "@/types/common";
import { store } from "@/libs/store";
import { useNavigation } from "@react-navigation/native";
import Markdown from "../space/content/Markdown";
import AuthorComponent from "../space/content/Author";

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    padding: 16,
  },
  tag: {
    marginBottom: 4,
  },
  title: {
    marginBottom: 8,
  },
});

interface TodayWikiProps {
  wiki: ContentHeadResponse & {
    space_id?: string;
  };
}

const TodayWiki = ({ wiki }: TodayWikiProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onPress={async () => {
        if (wiki.space_id !== undefined) {
          await store.space.setSpaceId(wiki.space_id);
        }
        navigation.navigate("MainNavigator", {
          screen: "TabNavigator",
          params: {
            screen: "SpaceNavigator",
            params: {
              screen: "SpaceWikiPage",
              params: {
                id: wiki.content_id,
              },
            },
          },
        });
      }}
    >
      <Layout style={styles.containter}>
        <Layout>
          <Text category="h6" style={styles.tag}>
            今天的知识库
          </Text>
          <Text category="h2" style={styles.title}>
            {wiki.title}
          </Text>
          <Text category="p1">
            <Markdown content={wiki.summary} summary={true} />
          </Text>
          <AuthorComponent
            author={wiki.author}
            lastUpdatedAt={wiki.last_update_at}
          />
        </Layout>
      </Layout>
    </Pressable>
  );
};

export default TodayWiki;
