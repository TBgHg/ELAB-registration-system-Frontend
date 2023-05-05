import React from "react";

import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootNavigatorParamList, RootNavigatorScreenProps } from "..";
import type { FormNavigatorParamList } from "./form";
import StartPage from "@/pages/application/StartPage";

interface ApplicationNavigatorParamList {
  ApplicationStartPage: undefined;
  ApplicationFormPage: NavigatorScreenParams<FormNavigatorParamList>;
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
    <Stack.Navigator>
      <Stack.Screen
        name="ApplicationStartPage"
        component={StartPage}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;

export type {
  ApplicationNavigatorParamList,
  ApplicationNavigatorScreenProps,
  ApplicationNavigatorKey,
};
