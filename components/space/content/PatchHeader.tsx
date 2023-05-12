import React from "react";
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import type { ContentPatchType, ContentType } from "@/types/common";
import NavigationCloseAction from "@/components/NavigationCloseAction";
import { Alert, View } from "react-native";
import ThreadClient from "@/libs/client/v1/space/thread";
import { store } from "@/libs/store";
import { useNavigation } from "@react-navigation/native";
import WikiClient from "@/libs/client/v1/space/wiki";

interface PatchHeaderProps {
  patchType: ContentPatchType;
  contentType: ContentType;
  title: string;
  content: string;
  loading: boolean;
  id?: string;
}

const PatchHeader = ({
  patchType,
  contentType,
  title,
  content,
  loading,
  id,
}: PatchHeaderProps) => {
  const navigation = useNavigation();
  const navigationTitle = `${patchType === "create" ? "新增" : "编辑"}${
    contentType === "thread" ? "帖子" : "知识库"
  }`;
  const { space } = store.space;
  const { accessToken } = store.user.credential;
  return (
    <TopNavigation
      title={navigationTitle}
      alignment="center"
      subtitle={space.name}
      accessoryLeft={NavigationCloseAction}
      accessoryRight={
        <TopNavigationAction
          icon={
            <View>
              <Icon name="save-outline" fill="black" />
            </View>
          }
          disabled={loading}
          onPress={() => {
            if (patchType === "create") {
              if (contentType === "thread") {
                const client = new ThreadClient(accessToken, space.space_id);
                client
                  .createThread({
                    title,
                    content,
                  })
                  .then((result) => {
                    navigation.goBack();
                    navigation.navigate("MainNavigator", {
                      screen: "TabNavigator",
                      params: {
                        screen: "SpaceNavigator",
                        params: {
                          screen: "SpaceThreadPage",
                          params: {
                            id: result.content_id,
                          },
                        },
                      },
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                    Alert.alert("创建失败", "请检查您的网络连接。");
                  });
              } else {
                const client = new WikiClient(accessToken, space.space_id);
                client
                  .createWiki({
                    title,
                    content,
                  })
                  .then((result) => {
                    navigation.goBack();
                    navigation.navigate("MainNavigator", {
                      screen: "TabNavigator",
                      params: {
                        screen: "SpaceNavigator",
                        params: {
                          screen: "SpaceWikiPage",
                          params: {
                            id: result.content_id,
                          },
                        },
                      },
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                    Alert.alert("创建失败", "请检查您的网络连接。");
                  });
              }
            } else {
              if (contentType === "thread") {
                const client = new ThreadClient(accessToken, space.space_id);
                client
                  .updateThread(id as string, {
                    title,
                    content,
                  })
                  .then(() => {
                    navigation.goBack();
                  })
                  .catch((err) => {
                    console.error(err);
                    Alert.alert("创建失败", "请检查您的网络连接。");
                  });
              } else {
                const client = new WikiClient(accessToken, space.space_id);
                client
                  .updateWiki(id as string, {
                    title,
                    content,
                  })
                  .then(() => {
                    navigation.goBack();
                  })
                  .catch((err) => {
                    console.error(err);
                    Alert.alert("创建失败", "请检查您的网络连接。");
                  });
              }
            }
          }}
        />
      }
    />
  );
};

export default PatchHeader;
