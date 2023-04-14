import React from "react";
import { Button, SafeAreaView as RNSafeAreaView, Platform } from "react-native";
import { SafeAreaView as SACSafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import LoginPage from "./login/LoginPage";
import ApplicationNavigator from "./application/ApplicationNavigator";
import ElabNavigation from "./elab/ElabNavigator";
import { userCredentialStore } from "../lib/store";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SafeAreaView = Platform.OS === "ios" ? RNSafeAreaView : SACSafeAreaView;

interface RootNavigationParamList {
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
const Stack = createNativeStackNavigator<RootNavigationParamList>();

const RootNavigation = observer(() => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="ElabNavigator"
        screenOptions={() => {
          return {
            headerShown: false,
            // 禁止用户通过手势关闭登录页面
            gestureEnabled: false,
          };
        }}
      >
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{
            presentation: "modal",
            headerShown: true,
            title: "登陆",
            headerLeft: (props) => {
              type LoginPageScreenNavigationProp = NativeStackNavigationProp<
                RootNavigationParamList,
                "LoginPage"
              >;
              const navigation = useNavigation<LoginPageScreenNavigationProp>();
              return (
                <Button
                  title="假装登陆"
                  onPress={() => {
                    userCredentialStore.access_token = "cool";
                    navigation.navigate("ElabNavigator");
                  }}
                ></Button>
              );
            },
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

export type { RootNavigationParamList };
