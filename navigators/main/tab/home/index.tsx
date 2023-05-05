import React from "react";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { TabNavigatorKey, TabNavigatorScreenProps } from "..";
import HomePage from "@/pages/main/tab/home/HomePage";
import { TopNavigation } from "@ui-kitten/components";

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
    <Stack.Navigator
      screenOptions={{
        header: (props) => (
          <TopNavigation
            alignment="center"
            title={props.options?.title}
            {...props}
          ></TopNavigation>
        ),
      }}
    >
      <Stack.Screen
        name="HomePage"
        options={{
          title: "电气创新实践基地",
        }}
        component={HomePage}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;

export type {
  HomeNavigatorParamList,
  HomeNavigatorKey,
  HomeNavigatorScreenProps,
};
