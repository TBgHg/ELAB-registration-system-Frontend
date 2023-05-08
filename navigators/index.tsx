import React from "react";
import type { NavigatorScreenParams } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { ApplicationNavigatorParamList } from "./application";
import type { LoginNavigatorParamList } from "./login";
import type { MainNavigatorParamList } from "./main";
import { store } from "@/libs/store";
import LoginNavigator from "./login";
import ApplicationNavigator from "./application";
import MainNavigator from "./main";

import { SafeAreaView as RNSACSafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView as RNSafeAreaView, Platform } from "react-native";
import { observer } from "mobx-react";
import { apiEndpoint } from "../constants";

const SafeAreaView =
  Platform.OS === "android" ? RNSACSafeAreaView : RNSafeAreaView;

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

const RootNavigator = observer(() => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      console.log(apiEndpoint);
      console.log("RootNavigator useFocusEffect");
      console.log(store.user.userStatus);
      if (store.user.userStatus === "unauthorized") {
        navigation.navigate("LoginNavigator", {
          screen: "LoginPage",
        });
      } else if (store.user.userStatus === "not_elab_member") {
        navigation.reset({
          routes: [
            {
              name: "ApplicationNavigator",
            },
          ],
        });
      }
    }, [store.user.userStatus])
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        initialRouteName="MainNavigator"
      >
        <Stack.Screen
          name="LoginNavigator"
          component={LoginNavigator}
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="ApplicationNavigator"
          component={ApplicationNavigator}
        />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
      </Stack.Navigator>
    </SafeAreaView>
  );
});

export default RootNavigator;

export type {
  RootNavigatorParamList,
  RootNavigatorScreenProps,
  RootNavigatorKey,
};
