import React from "react";
import { observer } from "mobx-react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./pages/RootNavigatior";
import {
  fetchUpdateAsync,
  reloadAsync,
  UpdateEventType,
  useUpdateEvents,
} from "expo-updates";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { Alert } from "react-native";

export default observer(() => {
  useUpdateEvents((event) => {
    Alert.prompt("update_event_trigger, next");
    if (event.type === UpdateEventType.UPDATE_AVAILABLE) {
      console.log("Update available");
      console.log(event.manifest);
      fetchUpdateAsync()
        .then(async () => {
          await reloadAsync();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <RootNavigator />
        </ApplicationProvider>
      </NavigationContainer>
    </>
  );
});
