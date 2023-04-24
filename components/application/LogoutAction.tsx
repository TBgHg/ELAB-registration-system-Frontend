import { Icon, TopNavigationAction } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, View } from "react-native";
import { userCredentialStore } from "../../lib/store";

const LogoutAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={
        <View>
          <Icon name="log-out-outline" fill="black" />
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
              userCredentialStore.clearCredential();
              navigation.navigate("ElabNavigator");
            },
          },
        ]);
      }}
    />
  );
};

export default LogoutAction;
