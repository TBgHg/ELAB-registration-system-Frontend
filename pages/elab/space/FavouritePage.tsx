import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Button,
  Layout,
  List,
  ListItem,
  Text,
  TopNavigation,
} from "@ui-kitten/components";

// import HeaderBackAction from "../../../components/elab/space/HeaderBackAction";
import HeaderCloseAction from "@/components/elab/space/HeaderCloseAction";
import { spaceStore } from "@/lib/store";
import type { PageType } from "@/lib/store/ElabStore";
import type { SpaceNavigatorParamList } from "./SpaceNavigator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 16,
  },
});

function translatePageType(pageType: PageType) {
  switch (pageType) {
    case "space":
      return "空间";
    case "space-member":
      return "成员";
    case "notification":
      return "通知";
    case "favourite":
      return "收藏";
    case "post":
      return "帖子";
    case "wiki":
      return "知识库";
    case "home":
      return "主页";
    default:
      return "未知";
  }
}

function pageTypeToPageName(pageType: PageType) {
  switch (pageType) {
    case "space":
      return "SpacePage";
    case "space-member":
      return "SpaceMemberPage";
    case "notification":
      return "NotificationPage";
    case "favourite":
      return "FavouritePage";
    case "post":
      return "PostPage";
    case "wiki":
      return "WikiPage";
    case "home":
      return "SpaceHomePage";
    default:
      return "SpaceHomePage";
  }
}

type FavouritePageProps = NativeStackScreenProps<
  SpaceNavigatorParamList,
  "FavouritePage"
>;

const FavouritePage = observer(({ navigation }: FavouritePageProps) => {
  return (
    <Layout style={styles.container}>
      <TopNavigation
        title="我的收藏"
        alignment="center"
        accessoryLeft={HeaderCloseAction}
      />
      <Layout style={styles.subContainer}>
        <Text category="h2">我的收藏</Text>
      </Layout>
      <List
        data={spaceStore.favourites}
        renderItem={({ item, index }) => {
          return (
            <ListItem
              onPress={() => {
                navigation.navigate(
                  pageTypeToPageName(item.navigation.type),
                  item.navigation
                );
              }}
              title={
                translatePageType(item.navigation.type) + ": " + item.title
              }
              description={item.description}
              accessoryRight={() => (
                <Button
                  appearance="outline"
                  size="small"
                  onPress={() => {
                    navigation.navigate("LoginPage");
                  }}
                >
                  前往
                </Button>
              )}
            ></ListItem>
          );
        }}
      />
    </Layout>
  );
});

export default FavouritePage;
