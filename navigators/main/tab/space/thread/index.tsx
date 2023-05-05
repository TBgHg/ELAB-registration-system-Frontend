import React from "react";

import type { ContentPageParam } from "@/types/common";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { SpaceNavigatorKey, SpaceNavigatorScreenProps } from "..";
import ThreadListPage from "@/pages/main/tab/space/thread/ThreadListPage";
import ThreadPage from "@/pages/main/tab/space/thread/ThreadPage";

interface ThreadNavigatorParamList {
  ThreadPage: ContentPageParam;
  ThreadListPage: undefined;
  [key: string]: undefined | ContentPageParam;
}

const Stack = createNativeStackNavigator<ThreadNavigatorParamList>();
type ThreadNavigatorKey = keyof ThreadNavigatorParamList & string;
type ThreadNavigatorScreenProps<T extends ThreadNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<ThreadNavigatorParamList, T>,
    SpaceNavigatorScreenProps<SpaceNavigatorKey>
  >;

const ThreadNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ThreadListPage"
        component={ThreadListPage}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="ThreadPage"
        component={ThreadPage}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ThreadNavigator;

export type {
  ThreadNavigatorParamList,
  ThreadNavigatorKey,
  ThreadNavigatorScreenProps,
};
