import React from "react";
import type { FormContentPageParam } from "@/types/application";
import type { CompositeScreenProps } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {
  ApplicationNavigatorKey,
  ApplicationNavigatorScreenProps,
} from ".";
import FormMainPage from "@/pages/application/FormMainPage";

interface FormNavigatorParamList {
  ApplicationFormMainPage: FormContentPageParam;
  ApplicationFormLongTextPage: FormContentPageParam;
  [key: string]: undefined | FormContentPageParam;
}

type FormNavigatorKey = keyof FormNavigatorParamList & string;

type FormNavigatorScreenProps<T extends FormNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<FormNavigatorParamList, T>,
    ApplicationNavigatorScreenProps<ApplicationNavigatorKey>
  >;

const Stack = createNativeStackNavigator<FormNavigatorParamList>();

const FormNavigator = () => {
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
      <Stack.Screen
        name="ApplicationFormMainPage"
        component={FormMainPage}
        initialParams={{
          preview: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export { FormNavigator };
export type { FormNavigatorParamList, FormNavigatorScreenProps };
