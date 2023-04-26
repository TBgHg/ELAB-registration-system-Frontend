import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { PopupNavigatorKey, PopupNavigatorScreenProps } from ".";

interface SpaceMemberNavigatorParamList {
  SpaceMemberPage: undefined;
  SpaceAddMemberPage: undefined;
  [key: string]: undefined;
}

type SpaceMemberNavigatorKey = keyof SpaceMemberNavigatorParamList & string;
type SpaceMemberNavigatorScreenProps<T extends SpaceMemberNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<SpaceMemberNavigatorParamList, T>,
    PopupNavigatorScreenProps<PopupNavigatorKey>
  >;

const Stack = createNativeStackNavigator<SpaceMemberNavigatorParamList>();

export type {
  SpaceMemberNavigatorParamList,
  SpaceMemberNavigatorKey,
  SpaceMemberNavigatorScreenProps,
};
