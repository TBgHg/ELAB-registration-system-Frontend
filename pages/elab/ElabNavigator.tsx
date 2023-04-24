// 使用kitten-ui 的 tabbar进行导航。

import { observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";

import {
  type BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  TopNavigation,
} from "@ui-kitten/components";

import { userCredentialStore } from "@/lib/store";
import ElabHomePage from "./HomePage";
import SpaceNavigator, { type CommonParams } from "./space/SpaceNavigator";
import ElabUserPage from "./UserPage";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootNavigationParamList } from "../RootNavigatior";
interface ElabNavigatorParamList {
  ElabHomePage: undefined;
  ElabPostPage: undefined;
  SpaceNavigator: undefined | CommonParams;
  ElabUserPage: undefined;
  [key: string]: undefined | any;
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
  React.useEffect(() => {
    if (userCredentialStore.status === "done") {
      switch (userCredentialStore.sessionStatus) {
        case "not_elab_member":
          navigation.reset({
            index: 0,
            routes: [{ name: "ApplicationNavigator" }],
          });
          break;
        case "unauthorized":
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginPage" }],
          });
          break;
      }
    }
  }, [userCredentialStore.sessionStatus, userCredentialStore.status]);
  return (
    <Tab.Navigator
      tabBar={(props) => <ElabBottomTabBar {...props} />}
      screenOptions={{
        header: (props) => (
          <TopNavigation
            title={props.options.title}
            alignment="center"
          ></TopNavigation>
        ),
      }}
    >
      <Tab.Screen
        name="ElabHomePage"
        component={ElabHomePage}
        options={{
          title: "电气创新实践基地",
        }}
      />
      <Tab.Screen
        name="SpaceNavigator"
        options={{
          title: "空间",
          headerShown: false,
        }}
        component={SpaceNavigator}
      />
      <Tab.Screen
        name="ElabUserPage"
        options={{
          title: "我的",
          headerShown: false,
        }}
        component={ElabUserPage}
      />
    </Tab.Navigator>
  );
});

export default ElabNavigator;

export type { ElabNavigatorParamList };
