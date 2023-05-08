import React from "react";

import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootNavigatorParamList, RootNavigatorScreenProps } from "..";
import { FormNavigator, type FormNavigatorParamList } from "./form";
import StartPage from "@/pages/application/StartPage";
import SeatSelectionPage from "@/pages/application/SeatSelectionPage";
import CodePage from "@/pages/application/CodePage";

interface ApplicationNavigatorParamList {
  ApplicationStartPage: undefined;
  ApplicationFormNavigator: NavigatorScreenParams<FormNavigatorParamList>;
  ApplicationSeatSelectionPage: undefined;
  ApplicationCodePage: undefined;
  [key: string]: undefined | NavigatorScreenParams<FormNavigatorParamList>;
}

type ApplicationNavigatorKey = keyof ApplicationNavigatorParamList & string;

type ApplicationNavigatorScreenProps<T extends ApplicationNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<ApplicationNavigatorParamList, T>,
    RootNavigatorScreenProps<keyof RootNavigatorParamList>
  >;

const Stack = createNativeStackNavigator<ApplicationNavigatorParamList>();

const ApplicationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
          // 禁止用户通过手势关闭登录页面
          // gestureEnabled: false,
          // headerBackButtonMenuEnabled: false,
          // fullScreenGestureEnabled: false,
        };
      }}
    >
      <Stack.Screen name="ApplicationStartPage" component={StartPage} />
      <Stack.Screen name="ApplicationFormNavigator" component={FormNavigator} />
      <Stack.Screen
        name="ApplicationSeatSelectionPage"
        component={SeatSelectionPage}
      />
      <Stack.Screen name="ApplicationCodePage" component={CodePage} />
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;

export type {
  ApplicationNavigatorParamList,
  ApplicationNavigatorScreenProps,
  ApplicationNavigatorKey,
};
