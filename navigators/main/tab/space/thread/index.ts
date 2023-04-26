import type { ContentPageParam } from "@/types/common";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { SpaceNavigatorKey, SpaceNavigatorScreenProps } from "..";

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

export type {
  ThreadNavigatorParamList,
  ThreadNavigatorKey,
  ThreadNavigatorScreenProps,
};
