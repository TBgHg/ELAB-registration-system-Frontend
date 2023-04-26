import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { TabNavigatorKey, TabNavigatorScreenProps } from "..";

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

export type {
  ProfileNavigatorParamList,
  ProfileNavigatorKey,
  ProfileNavigatorScreenProps,
};
