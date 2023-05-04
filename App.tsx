import React from "react";
import { observer } from "mobx-react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./pages/RootNavigatior";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import TestOAuth from "./components/test";

export default observer(() => {
  return (
    <>
      <TestOAuth />
      {/* <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <RootNavigator />
        </ApplicationProvider>
      </NavigationContainer> */}
    </>
  );
});
