import React from "react";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { TabNavigatorKey, TabNavigatorScreenProps } from "..";
import HomePage from "@/pages/main/tab/home/HomePage";

interface HomeNavigatorParamList {
  HomePage: undefined;
  [key: string]: undefined;
}

type HomeNavigatorKey = keyof HomeNavigatorParamList & string;
type HomeNavigatorScreenProps<T extends HomeNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeNavigatorParamList, T>,
    TabNavigatorScreenProps<TabNavigatorKey>
  >;

const Stack = createNativeStackNavigator<HomeNavigatorParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;

export type {
  HomeNavigatorParamList,
  HomeNavigatorKey,
  HomeNavigatorScreenProps,
};
