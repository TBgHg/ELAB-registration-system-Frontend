import React from "react";

import type { ContentPageParam } from "@/types/common";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { TabNavigatorKey, TabNavigatorScreenProps } from "..";
import type { PopupNavigatorParamList } from "./popup";
import type { ThreadNavigatorParamList } from "./thread";
import type { WikiNavigatorParamList } from "./wiki";
import SpacePage from "@/pages/main/tab/space/SpacePage";
import HomePage from "@/pages/main/tab/space/HomePage";
import WikiNavigator from "./wiki";
import ThreadNavigator from "./thread";
import PopupNavigator from "./popup";

interface SpaceNavigatorParamList {
  SpaceHomePage: undefined;
  SpacePage: NavigatorScreenParams<ContentPageParam>;
  SpaceWikiNavigator: NavigatorScreenParams<WikiNavigatorParamList>;
  SpaceThreadNavigator: NavigatorScreenParams<ThreadNavigatorParamList>;
  SpacePopupNavigator: NavigatorScreenParams<PopupNavigatorParamList>;
  [key: string]:
    | undefined
    | NavigatorScreenParams<ContentPageParam>
    | NavigatorScreenParams<WikiNavigatorParamList>
    | NavigatorScreenParams<ThreadNavigatorParamList>
    | NavigatorScreenParams<PopupNavigatorParamList>;
}
type SpaceNavigatorKey = keyof SpaceNavigatorParamList & string;

type SpaceNavigatorScreenProps<T extends SpaceNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<SpaceNavigatorParamList, T>,
    TabNavigatorScreenProps<TabNavigatorKey>
  >;

const Stack = createNativeStackNavigator<SpaceNavigatorParamList>();

const SpaceNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SpaceHomePage" component={HomePage}></Stack.Screen>
      <Stack.Screen name="SpacePage" component={SpacePage}></Stack.Screen>
      <Stack.Screen
        name="SpaceWikiNavigator"
        component={WikiNavigator}
      ></Stack.Screen>
      <Stack.Screen
        name="SpaceThreadNavigator"
        component={ThreadNavigator}
      ></Stack.Screen>
      <Stack.Screen
        name="SpacePopupNavigator"
        component={PopupNavigator}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default SpaceNavigator;

export type {
  SpaceNavigatorParamList,
  SpaceNavigatorKey,
  SpaceNavigatorScreenProps,
};
