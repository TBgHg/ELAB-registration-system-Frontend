import { useNavigation } from "@react-navigation/native";
import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

const HeaderCloseAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={
        <View>
          <Icon name="close-outline" fill="black"></Icon>
        </View>
      }
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};
export default HeaderCloseAction;
