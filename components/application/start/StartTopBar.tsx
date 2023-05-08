import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Button,
} from "@ui-kitten/components";
import React from "react";
import { observer } from "mobx-react";
import { store } from "@/libs/store";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartTopBar = observer(() => {
  const navigation = useNavigation();
  return (
    <TopNavigation
      title="科中加入申请"
      subtitle="欢迎页面"
      alignment="center"
      accessoryLeft={
        <TopNavigationAction
          icon={
            <View>
              <Icon name="log-out-outline" fill="black"></Icon>
            </View>
          }
          onPress={() => {
            Alert.alert("确定要登出吗？", "您仍可重新登录。", [
              {
                text: "取消",
                style: "cancel",
              },
              {
                text: "登出",
                style: "destructive",
                onPress: () => {
                  store.user.clearUserData();
                },
              },
            ]);
          }}
        ></TopNavigationAction>
      }
      accessoryRight={
        <Button
          size="small"
          appearance="ghost"
          onPress={() => {
            navigation.navigate("ApplicationNavigator", {
              screen: "ApplicationFormNavigator",
              params: {
                screen: "ApplicationFormMainPage",
              },
            });
          }}
        >
          开始申请
        </Button>
      }
    />
  );
});

export default StartTopBar;
