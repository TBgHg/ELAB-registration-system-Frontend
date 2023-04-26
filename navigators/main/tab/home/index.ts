import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { TabNavigatorKey, TabNavigatorScreenProps } from "..";

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

export type {
  HomeNavigatorParamList,
  HomeNavigatorKey,
  HomeNavigatorScreenProps,
};
