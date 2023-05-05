import React from "react";

import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootNavigatorKey, RootNavigatorScreenProps } from "..";
import type { PopupNavigatorParamList } from "./popup";
import type { TabNavigatorParamList } from "./tab";
import TabNavigator from "./tab";

interface MainNavigatorParamList {
  PopupNavigator: NavigatorScreenParams<PopupNavigatorParamList>;
  TabNavigator: NavigatorScreenParams<TabNavigatorParamList>;
  [key: string]:
    | NavigatorScreenParams<PopupNavigatorParamList>
    | NavigatorScreenParams<TabNavigatorParamList>;
}

type MainNavigatorKey = keyof MainNavigatorParamList & string;
type MainNavigatorScreenProps<T extends MainNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<MainNavigatorParamList, T>,
    RootNavigatorScreenProps<RootNavigatorKey>
  >;

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
          // 禁止用户通过手势关闭登录页面
          gestureEnabled: false,
          headerBackButtonMenuEnabled: false,
          fullScreenGestureEnabled: false,
        };
      }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainNavigator;

export type {
  MainNavigatorParamList,
  MainNavigatorKey,
  MainNavigatorScreenProps,
};
