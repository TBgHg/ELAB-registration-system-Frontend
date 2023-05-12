import NavigationBackAction from "@/components/NavigationBackAction";
import ThreadClient from "@/libs/client/v1/space/thread";
import { store } from "@/libs/store";
import type { ContentHeadResponse } from "@/types/common";
import { useNavigation } from "@react-navigation/native";
import {
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { Alert, View } from "react-native";

interface HeaderProps {
  content?: ContentHeadResponse;
}

const ThreadHeader = ({ content }: HeaderProps) => {
  const [visible, setVisible] = React.useState(false);
  const openid = store.user.user.openid;
  const accessToken = store.user.credential.accessToken;
  const spaceId = store.space.space.space_id;
  const navigation = useNavigation();
  return (
    <TopNavigation
      alignment="center"
      title={content === undefined ? "加载中" : content.title}
      subtitle={"帖子"}
      accessoryLeft={NavigationBackAction}
      accessoryRight={
        content?.author.openid === openid ||
        store.space.position === "owner" ||
        store.space.position === "moderator" ? (
          <OverflowMenu
            anchor={() => {
              return (
                <TopNavigationAction
                  icon={(props) => (
                    <View>
                      <Icon {...props} name="more-horizontal" color="black" />
                    </View>
                  )}
                  onPress={() => {
                    setVisible(true);
                  }}
                />
              );
            }}
            onSelect={(index) => {
              setVisible(false);
            }}
            onBackdropPress={() => {
              setVisible(false);
            }}
            visible={visible}
          >
            <MenuItem
              title="编辑"
              onPress={() => {
                navigation.navigate("MainNavigator", {
                  screen: "TabNavigator",
                  params: {
                    screen: "SpaceNavigator",
                    params: {
                      screen: "SpacePopupNavigator",
                      params: {
                        screen: "SpaceContentPatchPage",
                        params: {
                          type: "edit",
                          contentType: "thread",
                          id: content?.content_id,
                        },
                      },
                    },
                  },
                });
              }}
            />
            <MenuItem
              title="删除"
              onPress={() => {
                Alert.alert("删除帖子", "您确定要删除这个帖子吗？", [
                  {
                    text: "取消",
                    style: "cancel",
                  },
                  {
                    text: "删除",
                    style: "destructive",
                    onPress: () => {
                      const client = new ThreadClient(accessToken, spaceId);
                      client
                        .deleteThread(content?.content_id as string)
                        .then(() => {
                          navigation.goBack();
                        })
                        .catch((err) => {
                          console.error(err);
                          Alert.alert("删除失败", "请检查您的网络连接。");
                        });
                    },
                  },
                ]);
              }}
            />
          </OverflowMenu>
        ) : undefined
      }
    />
  );
};

export default ThreadHeader;
