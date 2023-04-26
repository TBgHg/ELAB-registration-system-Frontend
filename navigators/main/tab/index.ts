import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { MainNavigatorKey, MainNavigatorScreenProps } from "..";
import type { HomeNavigatorParamList } from "./home";
import type { ProfileNavigatorParamList } from "./profile";
import type { SpaceNavigatorParamList } from "./space";

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

const Stack = createNativeStackNavigator<TabNavigatorParamList>();

export type { TabNavigatorParamList, TabNavigatorScreenProps, TabNavigatorKey };
