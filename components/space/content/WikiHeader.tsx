import NavigationBackAction from "@/components/NavigationBackAction";
import WikiClient from "@/libs/client/v1/space/wiki";
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

interface WikiHeaderProps {
  content?: ContentHeadResponse;
}

const WikiHeader = ({ content }: WikiHeaderProps) => {
  const [visible, setVisible] = React.useState(false);
  const accessToken = store.user.credential.accessToken;
  const spaceId = store.space.space.space_id;
  const navigation = useNavigation();
  return (
    <TopNavigation
      title={content === undefined ? "加载中" : content.title}
      subtitle={"知识库"}
      alignment="center"
      accessoryLeft={NavigationBackAction}
      accessoryRight={
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
                        contentType: "wiki",
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
                    const client = new WikiClient(accessToken, spaceId);
                    client
                      .deleteWiki(content?.content_id as string)
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
      }
    />
  );
};

export default WikiHeader;
