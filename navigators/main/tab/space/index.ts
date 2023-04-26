import type { ContentPageParam } from "@/types/common";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { TabNavigatorKey, TabNavigatorScreenProps } from "..";
import type { PopupNavigatorParamList } from "./popup";
import type { ThreadNavigatorParamList } from "./thread";
import type { WikiNavigatorParamList } from "./wiki";

interface SpaceNavigatorParamList {
  SpaceHomePage: undefined;
  SpacePage: NavigatorScreenParams<ContentPageParam>;
  SpaceWikiNavigator: NavigatorScreenParams<WikiNavigatorParamList>;
  SpaceThreadNavigator: NavigatorScreenParams<ThreadNavigatorParamList>;
  SpacePopupNavigator: NavigatorScreenParams<PopupNavigatorParamList>;
  [key: string]:
    | undefined
    | NavigatorScreenParams<ContentPageParam>
    | NavigatorScreenParams<WikiNavigatorParamList>
    | NavigatorScreenParams<ThreadNavigatorParamList>
    | NavigatorScreenParams<PopupNavigatorParamList>;
}
type SpaceNavigatorKey = keyof SpaceNavigatorParamList & string;

type SpaceNavigatorScreenProps<T extends SpaceNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<SpaceNavigatorParamList, T>,
    TabNavigatorScreenProps<TabNavigatorKey>
  >;

const Stack = createNativeStackNavigator<SpaceNavigatorParamList>();

export type {
  SpaceNavigatorParamList,
  SpaceNavigatorKey,
  SpaceNavigatorScreenProps,
};
