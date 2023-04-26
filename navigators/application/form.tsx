import React from "react";
import type { FormContentPageParam } from "@/types/application";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {
  ApplicationNavigatorKey,
  ApplicationNavigatorScreenProps,
} from ".";

interface FormNavigatorParamList {
  ApplicationFormMainPage: NavigatorScreenParams<FormContentPageParam>;
  ApplicationFormLongTextPage: NavigatorScreenParams<FormContentPageParam>;
  [key: string]: undefined | NavigatorScreenParams<FormContentPageParam>;
}

type FormNavigatorKey = keyof FormNavigatorParamList & string;

type FormNavigatorScreenProps<T extends FormNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<FormNavigatorParamList, T>,
    ApplicationNavigatorScreenProps<ApplicationNavigatorKey>
  >;

// type MainPageProps = NativeStackScre

const Stack = createNativeStackNavigator<FormNavigatorParamList>();

const FormNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="ApplicationFormMainPage"
        component={<ApplicationWelcomePage />}
      ></Stack.Screen> */}
    </Stack.Navigator>
  );
};

export { FormNavigator };
export type { FormNavigatorParamList, FormNavigatorScreenProps };
