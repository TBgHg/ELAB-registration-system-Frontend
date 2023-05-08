import React from "react";
import { observer } from "mobx-react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "@/navigators/index";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";

import "expo-dev-client";
import { SWRConfig } from "swr";
import { AppState, type AppStateStatus } from "react-native";

export default observer(() => {
  return (
    <>
      <SWRConfig
        value={{
          initFocus: (callback) => {
            let appState = AppState.currentState;

            const onAppStateChange = (nextAppState: AppStateStatus) => {
              /* 如果正在从后台或非 active 模式恢复到 active 模式 */
              const matchResult = appState.match(/inactive|background/);
              if (matchResult !== null && nextAppState === "active") {
                callback();
              }
              appState = nextAppState;
            };

            const subscription = AppState.addEventListener(
              "change",
              onAppStateChange
            );

            return () => {
              subscription.remove();
            };
          },
        }}
      >
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer>
          <ApplicationProvider {...eva} theme={eva.light}>
            <RootNavigator />
          </ApplicationProvider>
        </NavigationContainer>
      </SWRConfig>
    </>
  );
});
