import type { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { ApplicationNavigatorParamList } from "./application";
import type { LoginNavigatorParamList } from "./login";
import type { MainNavigatorParamList } from "./main";

interface RootNavigatorParamList {
  ApplicationNavigator: NavigatorScreenParams<ApplicationNavigatorParamList>;
  LoginNavigator: NavigatorScreenParams<LoginNavigatorParamList>;
  MainNavigator: NavigatorScreenParams<MainNavigatorParamList>;
  [key: string]:
    | NavigatorScreenParams<ApplicationNavigatorParamList>
    | NavigatorScreenParams<LoginNavigatorParamList>
    | NavigatorScreenParams<MainNavigatorParamList>
    | undefined;
}

type RootNavigatorKey = keyof RootNavigatorParamList & string;

type RootNavigatorScreenProps<T extends keyof RootNavigatorParamList> =
  NativeStackScreenProps<RootNavigatorParamList, T>;

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export type {
  RootNavigatorParamList,
  RootNavigatorScreenProps,
  RootNavigatorKey,
};
