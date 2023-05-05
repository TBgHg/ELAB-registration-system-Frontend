import React from "react";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { MainNavigatorKey, MainNavigatorScreenProps } from "..";
import type { HomeNavigatorParamList } from "./home";
import type { ProfileNavigatorParamList } from "./profile";
import type { SpaceNavigatorParamList } from "./space";
import { View } from "react-native";
import {
  BottomNavigationTab,
  BottomNavigation,
  Icon,
} from "@ui-kitten/components";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./home";
import ProfileNavigator from "./profile";
import SpaceNavigator from "./space";

interface TabNavigatorParamList {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorParamList>;
  SpaceNavigator: NavigatorScreenParams<SpaceNavigatorParamList>;
  ProfileNavigator: NavigatorScreenParams<ProfileNavigatorParamList>;
  [key: string]:
    | NavigatorScreenParams<HomeNavigatorParamList>
    | NavigatorScreenParams<SpaceNavigatorParamList>
    | NavigatorScreenParams<ProfileNavigatorParamList>
    | undefined;
}

type TabNavigatorKey = keyof TabNavigatorParamList & string;
type TabNavigatorScreenProps<T extends TabNavigatorKey> = CompositeScreenProps<
  NativeStackScreenProps<TabNavigatorParamList, T>,
  MainNavigatorScreenProps<MainNavigatorKey>
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

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const BottomTab = ({ navigation, state }: BottomTabBarProps) => {
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

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTab {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeNavigator" component={HomeNavigator}></Tab.Screen>
      <Tab.Screen name="SpaceNavigator" component={SpaceNavigator}></Tab.Screen>
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

export type { TabNavigatorParamList, TabNavigatorScreenProps, TabNavigatorKey };
