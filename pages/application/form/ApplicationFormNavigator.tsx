import React from "react";
import {
  createNativeStackNavigator,
  // type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import ApplicationFormPage from "./ApplicationFormPage";
import ApplicationLongTextFormPage from "./ApplicationLongTextFormPage";
import type ApplicationStore from "../../../lib/store/ApplicationStore";
// import type { ApplicationNavigatorParamList } from "../ApplicationNavigator";

// type ApplicationFormNavigatorProps =
//   NativeStackScreenProps<ApplicationNavigatorParamList>;

interface ApplicationFormNavigatorParamList {
  ApplicationFormPage: undefined;
  ApplicationLongTextFormPage: {
    key: keyof ApplicationStore["form"]["longText"];
  };
  [key: string]: undefined | any;
}

const Stack = createNativeStackNavigator<ApplicationFormNavigatorParamList>();

const ApplicationFormNavigator = observer(
  // ({ navigation }: ApplicationFormNavigatorProps) => {
  () => {
    return (
      <Stack.Navigator
        initialRouteName="ApplicationFormPage"
        screenOptions={({ route, navigation }) => {
          return {
            headerShown: false,
            gestureEnabled: false,
          };
        }}
      >
        <Stack.Screen
          name="ApplicationFormPage"
          component={ApplicationFormPage}
        />
        <Stack.Screen
          name="ApplicationLongTextFormPage"
          component={ApplicationLongTextFormPage}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    );
  }
);

export default ApplicationFormNavigator;
export type { ApplicationFormNavigatorParamList };
