import { Icon, TopNavigationAction } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

const NavigationBackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={
        <View>
          <Icon name="arrow-back-outline" fill="black" />
        </View>
      }
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default NavigationBackAction;
