import React from "react";
import type { ContentPatchPageParam } from "@/types/common";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { SpaceNavigatorKey, SpaceNavigatorScreenProps } from "..";
import type { SpaceMemberNavigatorParamList } from "./member";
import MemberNavigator from "./member";
import ContentPatchPage from "@/pages/main/tab/space/popup/ContentPatchPage";
import SearchPage from "@/pages/main/tab/space/popup/SearchPage";
import type { SpacePatchParam } from "@/types/space";
import PatchPage from "@/pages/main/tab/space/popup/PatchPage";

interface PopupNavigatorParamList {
  SpaceMemberNavigation: NavigatorScreenParams<SpaceMemberNavigatorParamList>;
  SpaceCreateContentPage: ContentPatchPageParam;
  SpacePatchPage: SpacePatchParam;
  SpaceSearchPage: undefined;
  [key: string]:
    | undefined
    | NavigatorScreenParams<SpaceMemberNavigatorParamList>
    | ContentPatchPageParam
    | SpacePatchParam;
}

type PopupNavigatorKey = keyof PopupNavigatorParamList & string;
type PopupNavigatorScreenProps<T extends PopupNavigatorKey> =
  CompositeScreenProps<
    NativeStackScreenProps<PopupNavigatorParamList, T>,
    SpaceNavigatorScreenProps<SpaceNavigatorKey>
  >;

const Stack = createNativeStackNavigator<PopupNavigatorParamList>();

const PopupNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}
    >
      <Stack.Screen
        name="SpaceMemberNavigatior"
        component={MemberNavigator}
      ></Stack.Screen>
      <Stack.Screen
        name="SpaceCreateContentPage"
        component={ContentPatchPage}
      ></Stack.Screen>
      <Stack.Screen
        name="SpaceSearchPage"
        component={SearchPage}
      ></Stack.Screen>
      <Stack.Screen
        name="SpacePatchPage"
        component={PatchPage}
        initialParams={{
          type: "add",
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default PopupNavigator;

export type {
  PopupNavigatorParamList,
  PopupNavigatorKey,
  PopupNavigatorScreenProps,
};
