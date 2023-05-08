import { Icon, TopNavigationAction } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

const NavigationSaveAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={
        <View>
          <Icon name="save-outline" fill="black" />
        </View>
      }
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default NavigationSaveAction;
