import React from "react";

import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootNavigatorKey, RootNavigatorScreenProps } from "..";
import LoginPage from "@/pages/login/LoginPage";

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

const LoginNavigator = () => {
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
      <Stack.Screen name="LoginPage" component={LoginPage} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;

export type {
  LoginNavigatorParamList,
  LoginNavigatorKey,
  LoginNavigatorScreenProps,
};
