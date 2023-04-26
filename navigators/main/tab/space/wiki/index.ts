import type { ContentPageParam } from "@/types/common";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { SpaceNavigatorKey, SpaceNavigatorScreenProps } from "..";

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

export type {
  WikiNavigatorParamList,
  WikiNavigatorKey,
  WikiNavigatorScreenProps,
};
