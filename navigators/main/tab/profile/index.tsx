import React from "react";

import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { TabNavigatorKey, TabNavigatorScreenProps } from "..";
import ProfilePage from "@/pages/main/tab/profile/ProfilePage";

interface ProfileNavigatorParamList {
  ProfileHomePage: undefined;
  ProfileSettingsPage: undefined;
  [key: string]: undefined;
}

type ProfileNavigatorKey = keyof ProfileNavigatorParamList & string;
type ProfileNavigatorScreenProps<T extends ProfileNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileNavigatorParamList, T>,
    TabNavigatorScreenProps<TabNavigatorKey>
  >;

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHomePage"
        component={ProfilePage}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

export type {
  ProfileNavigatorParamList,
  ProfileNavigatorKey,
  ProfileNavigatorScreenProps,
};
