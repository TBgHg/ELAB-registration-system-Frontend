import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootNavigatorKey, RootNavigatorScreenProps } from "..";
import type { PopupNavigatorParamList } from "./popup";
import type { TabNavigatorParamList } from "./tab";

interface MainNavigatorParamList {
  PopupNavigator: NavigatorScreenParams<PopupNavigatorParamList>;
  TabNavigator: NavigatorScreenParams<TabNavigatorParamList>;
  [key: string]:
    | NavigatorScreenParams<PopupNavigatorParamList>
    | NavigatorScreenParams<TabNavigatorParamList>;
}

type MainNavigatorKey = keyof MainNavigatorParamList & string;
type MainNavigatorScreenProps<T extends MainNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<MainNavigatorParamList, T>,
    RootNavigatorScreenProps<RootNavigatorKey>
  >;

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

export type {
  MainNavigatorParamList,
  MainNavigatorKey,
  MainNavigatorScreenProps,
};
