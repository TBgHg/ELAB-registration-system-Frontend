import TodayThread from "@/components/today/TodayThread";
import TodayWiki from "@/components/today/TodayWiki";
import useTodayThreadInSpace from "@/libs/hooks/useTodayThreadInSpace";
import useTodayWikiInSpace from "@/libs/hooks/useTodayWikiInSpace";
import { store } from "@/libs/store";
import { useNavigation } from "@react-navigation/native";
import { Layout, Text, Button } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 16,
  },
  title: {
    flex: 1,
    paddingHorizontal: 16,
  },
  enter: {
    flex: 1,
    paddingVertical: 32,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginVertical: 16,
  },
  notFoundTitle: {
    marginBottom: 16,
  },
});

const Today = () => {
  const spaceId = store.space.space.space_id;
  const accessToken = store.user.credential.accessToken;
  const todayWiki = useTodayWikiInSpace(spaceId, accessToken);
  const todayThread = useTodayThreadInSpace(spaceId, accessToken);
  const navigation = useNavigation();
  return (
    <Layout style={styles.root}>
      <Layout style={styles.title}>
        <Text category="h6" appearance="hint">
          知识库
        </Text>
        {todayWiki.data !== undefined ? (
          <TodayWiki wiki={todayWiki.data} />
        ) : (
          <View style={styles.enter}>
            <Text category="h5" style={styles.notFoundTitle}>
              这个空间似乎没有知识库...
            </Text>
            <Text category="p1" appearance="hint">
              你可以点击右上角，创建一个知识库！
            </Text>
          </View>
        )}
        <Button
          style={styles.list}
          appearance="outline"
          size="small"
          onPress={() => {
            navigation.navigate("MainNavigator", {
              screen: "TabNavigator",
              params: {
                screen: "SpaceNavigator",
                params: {
                  screen: "SpaceContentListPage",
                  params: {
                    type: "wiki",
                  },
                },
              },
            });
          }}
        >
          进入知识库列表
        </Button>
      </Layout>
      <Layout
        style={[
          styles.title,
          {
            marginTop: 16,
          },
        ]}
      >
        <Text category="h6" appearance="hint">
          帖子
        </Text>
        {todayThread.data !== undefined ? (
          <TodayThread thread={todayThread.data} />
        ) : (
          <View style={styles.enter}>
            <Text category="h5" style={styles.notFoundTitle}>
              这个空间似乎没有帖子...
            </Text>
            <Text category="p1" appearance="hint">
              你可以点击右上角，创建一个帖子！
            </Text>
          </View>
        )}
        <Button
          style={styles.list}
          appearance="outline"
          size="small"
          onPress={() => {
            navigation.navigate("MainNavigator", {
              screen: "TabNavigator",
              params: {
                screen: "SpaceNavigator",
                params: {
                  screen: "SpaceContentListPage",
                  params: {
                    type: "thread",
                  },
                },
              },
            });
          }}
        >
          进入帖子列表
        </Button>
      </Layout>
    </Layout>
  );
};

export default Today;
