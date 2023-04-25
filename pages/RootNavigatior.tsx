import { observer } from "mobx-react-lite";
import React from "react";
import { Platform, SafeAreaView as RNSafeAreaView } from "react-native";
import { SafeAreaView as SACSafeAreaView } from "react-native-safe-area-context";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { userCredentialStore } from "../lib/store";
import ApplicationNavigator from "./application/Navigator";
import ElabNavigation from "./elab/ElabNavigator";
import LoginPage from "./login/LoginPage";

// import AsyncStorage from "@react-native-async-storage/async-storage";

const SafeAreaView = Platform.OS === "ios" ? RNSafeAreaView : SACSafeAreaView;

interface RootNavigatorParamList {
  LoginPage: undefined;
  ApplicationNavigator: undefined;
  ElabNavigator: undefined;
  [key: string]: undefined;
}

/**
 * 本层Stack主要负责处理用户登录态。
 * 一共分为三个成员Screen：
 *  - 属于科中成员的用户 -> ./elab/ElabIndexPage.tsx
 *  - 不属于科中成员的用户（需要申请） -> ./application/ApplicationIndexPage.tsx
 *  - 未登录 -> ./login/LoginPage.tsx
 */
const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootNavigation = observer(() => {
  // 在这里进行用户登陆态检测。
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="ElabNavigator"
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
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{
            presentation: "modal",
            headerShown: false,
            title: "登陆",
            // headerLeft: (props) => {
            //   type LoginPageScreenNavigationProp = NativeStackNavigationProp<
            //     RootNavigationParamList,
            //     "LoginPage"
            //   );
            // },
          }}
        />
        <Stack.Screen
          name="ApplicationNavigator"
          component={ApplicationNavigator}
        />
        <Stack.Screen name="ElabNavigator" component={ElabNavigation} />
      </Stack.Navigator>
    </SafeAreaView>
  );
});

export default RootNavigation;

export type { RootNavigatorParamList as RootNavigationParamList };
