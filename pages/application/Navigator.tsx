import { observer } from "mobx-react-lite";
import React from "react";

import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { applicationStore } from "../../lib/store";
import ApplicationCodePage from "./CodePage";
import ApplicationResultPage from "./ResultPage";
import ApplicationSeatSelectionPage from "./SeatSelectionPage";
import ApplicationWelcomePage from "./WelcomePage";
import ApplicationFormNavigator from "./form/FormNavigator";

import type { RootNavigationParamList } from "../RootNavigatior";
interface ApplicationNavigatorParamList {
  ApplicationWelcomePage: undefined;
  ApplicationFormPage: undefined;
  ApplicationSeatSelectionPage: undefined;
  ApplicationCodePage: undefined;
  ApplicationResultPage: undefined;
  [key: string]: undefined;
}

const pages = {
  ApplicationWelcomePage,
  ApplicationFormNavigator,
  ApplicationSeatSelectionPage,
  ApplicationCodePage,
  ApplicationResultPage,
};

const Stack = createNativeStackNavigator<ApplicationNavigatorParamList>();
type ApplicationNavigatorProps = NativeStackScreenProps<
  RootNavigationParamList,
  "ApplicationNavigator"
>;

/**
 * 科中加入申请的导航器。
 */
const ApplicationNavigator = observer(
  ({ navigation }: ApplicationNavigatorProps) => {
    React.useEffect(() => {
      console.log(applicationStore.status);
      switch (applicationStore.status) {
        case "submitted":
          navigation.navigate("ApplicationSeatSelectionPage");
          break;
        case "seats_selected":
          navigation.navigate("ApplicationCodePage");
          break;
      }
    }, [applicationStore.status]);
    return (
      <Stack.Navigator
        initialRouteName="ApplicationWelcomePage"
        screenOptions={({ route, navigation }) => {
          return {
            headerShown: false,
            gestureEnabled: false,
          };
        }}
      >
        {Object.entries(pages).map(([name, component]) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={
              name === "ApplicationFormNavigator" ||
              name === "ApplicationSeatSelectionPage"
                ? {
                    gestureEnabled: true,
                  }
                : undefined
            }
          />
        ))}
      </Stack.Navigator>
    );
  }
);

export default ApplicationNavigator;
export type { ApplicationNavigatorParamList };
