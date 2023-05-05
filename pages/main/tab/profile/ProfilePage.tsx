import { Button } from "@ui-kitten/components";
import React from "react";
import { Text, View } from "react-native";
import { observer } from "mobx-react";
import { store } from "@/libs/store";

const ProfilePage = () => {
  return (
    <View>
      <Text>你好</Text>

      <Button
        onPress={() => {
          console.log(store.user);
        }}
      >
        记录用户
      </Button>
      <Button
        onPress={() => {
          store.user.clearUserData();
        }}
      >
        退出登录
      </Button>
    </View>
  );
};

export default observer(ProfilePage);
