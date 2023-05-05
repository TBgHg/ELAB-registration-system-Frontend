import React from "react";

import type { ContentPageParam } from "@/types/common";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { SpaceNavigatorKey, SpaceNavigatorScreenProps } from "..";
import WikiListPage from "@/pages/main/tab/space/wiki/WikiListPage";
import WikiPage from "@/pages/main/tab/space/wiki/WikiPage";

interface WikiNavigatorParamList {
  WikiPage: ContentPageParam;
  WikiListPage: undefined;
  [key: string]: undefined | ContentPageParam;
}

type WikiNavigatorKey = keyof WikiNavigatorParamList & string;
type WikiNavigatorScreenProps<T extends WikiNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<WikiNavigatorParamList, T>,
    SpaceNavigatorScreenProps<SpaceNavigatorKey>
  >;

const Stack = createNativeStackNavigator<WikiNavigatorParamList>();

const WikiNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WikiListPage"
        component={WikiListPage}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="WikiPage"
        component={WikiPage}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default WikiNavigator;

export type {
  WikiNavigatorParamList,
  WikiNavigatorKey,
  WikiNavigatorScreenProps,
};
