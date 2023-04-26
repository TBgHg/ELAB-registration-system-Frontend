import type { ContentCreatePageParam } from "@/types/common";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { SpaceNavigatorKey, SpaceNavigatorScreenProps } from "..";
import type { SpaceMemberNavigatorParamList } from "./member";

interface PopupNavigatorParamList {
  SpaceMemberNavigation: NavigatorScreenParams<SpaceMemberNavigatorParamList>;
  SpaceCreateContentPage: ContentCreatePageParam;
  SpaceSearchPage: undefined;
  [key: string]:
    | undefined
    | NavigatorScreenParams<SpaceMemberNavigatorParamList>
    | ContentCreatePageParam;
}

type PopupNavigatorKey = keyof PopupNavigatorParamList & string;
type PopupNavigatorScreenProps<T extends PopupNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<PopupNavigatorParamList, T>,
    SpaceNavigatorScreenProps<SpaceNavigatorKey>
  >;

const Stack = createNativeStackNavigator<PopupNavigatorParamList>();

export type {
  PopupNavigatorParamList,
  PopupNavigatorKey,
  PopupNavigatorScreenProps,
};
