import { Icon, TopNavigationAction } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

const NavigationCloseAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={
        <View>
          <Icon name="close-outline" fill="black" />
        </View>
      }
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default NavigationCloseAction;
