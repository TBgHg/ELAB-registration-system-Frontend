// 使用kitten-ui 的 tabbar进行导航。

import React from "react";
import {
  type BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import ElabHomePage from "./ElabHomePage";
import ElabSpacePage from "./ElabSpacePage";
import ElabUserPage from "./ElabUserPage";
import { userCredentialStore } from "../../lib/store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootNavigationParamList } from "../RootNavigatior";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";

interface ElabNavigatorParamList {
  ElabHomePage: undefined;
  ElabPostPage: undefined;
  ElabSpacePage: undefined;
  ElabUserPage: undefined;
  [key: string]: undefined;
}

type ElabNavigatorProps = NativeStackScreenProps<
  RootNavigationParamList,
  "ElabNavigation"
>;

const HomeIcon = (props) => {
  return (
    <View>
      <Icon color={"white"} {...props} name="home-outline" />
    </View>
  );
};

const SpaceIcon = (props) => {
  return (
    <View>
      <Icon color={"white"} {...props} name="grid-outline" />
    </View>
  );
};

const UserIcon = (props) => {
  return (
    <View>
      <Icon color={"white"} {...props} name="person-outline" />
    </View>
  );
};

const Tab = createBottomTabNavigator<ElabNavigatorParamList>();

const ElabBottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => {
        navigation.navigate(state.routeNames[index]);
      }}
    >
      <BottomNavigationTab title="首页" icon={HomeIcon} />
      <BottomNavigationTab title="空间" icon={SpaceIcon} />
      <BottomNavigationTab title="我" icon={UserIcon} />
    </BottomNavigation>
  );
};

const ElabNavigator = observer(({ navigation }: ElabNavigatorProps) => {
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (userCredentialStore.access_token === "") {
  //       navigation.navigate("LoginPage");
  //     }
  //   }, [navigation])
  // );
  useFocusEffect(
    React.useCallback(() => {
      const checkSessionStatus = async () => {
        const sessionStatus = await userCredentialStore.checkSessionStatus();
        const nextNavigateScreen =
          sessionStatus === "unauthorized"
            ? "LoginPage"
            : sessionStatus === "not_elab_member"
            ? "ApplicationNavigator"
            : "ElabNavigation";
        if (nextNavigateScreen !== "ElabNavigation") {
          navigation.navigate(nextNavigateScreen);
        }
      };
      checkSessionStatus().catch((error) => {
        console.error(error);
      });

      return () => {};
    }, [navigator, userCredentialStore])
  );
  return (
    <Tab.Navigator tabBar={(props) => <ElabBottomTabBar {...props} />}>
      <Tab.Screen
        name="ElabHomePage"
        component={ElabHomePage}
        options={{
          title: "首页",
        }}
      />
      <Tab.Screen name="ElabSpacePage" component={ElabSpacePage} />
      <Tab.Screen name="ElabUserPage" component={ElabUserPage} />
    </Tab.Navigator>
  );
});

export default ElabNavigator;

export type { ElabNavigatorParamList };
