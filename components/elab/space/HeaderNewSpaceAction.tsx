import { useNavigation } from "@react-navigation/native";
import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

const HeaderNewSpaceAction = () => {
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
          screen: "CreateSpacePage",
        });
      }}
    />
  );
};

export default HeaderNewSpaceAction;
