import { useNavigation } from "@react-navigation/native";
import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { spaceStore } from "../../../lib/store";

const HeaderNewPostAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={
        <View>
          <Icon name="plus-outline" fill="black"></Icon>
        </View>
      }
      onPress={() => {
        navigation.navigate("SpaceNavigator", {
          screen: "CreatePostPage",
          params: {
            spaceId: spaceStore.currentSpaceId,
          },
        });
      }}
    />
  );
};

export default HeaderNewPostAction;
