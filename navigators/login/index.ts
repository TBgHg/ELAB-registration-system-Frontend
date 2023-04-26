import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootNavigatorKey, RootNavigatorScreenProps } from "..";

interface LoginNavigatorParamList {
  LoginPage: undefined;
  [key: string]: undefined;
}

type LoginNavigatorKey = keyof LoginNavigatorParamList & string;

type LoginNavigatorScreenProps<T extends LoginNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<LoginNavigatorParamList, T>,
    RootNavigatorScreenProps<RootNavigatorKey>
  >;

const Stack = createNativeStackNavigator<LoginNavigatorParamList>();

export type {
  LoginNavigatorParamList,
  LoginNavigatorKey,
  LoginNavigatorScreenProps,
};
