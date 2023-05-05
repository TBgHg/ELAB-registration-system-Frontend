import React from "react";

import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { PopupNavigatorKey, PopupNavigatorScreenProps } from ".";
import MemberPage from "@/pages/main/tab/space/member/MemberPage";
import AddPage from "@/pages/main/tab/space/member/AddPage";

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

const MemberNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpaceMemberPage"
        component={MemberPage}
      ></Stack.Screen>
      <Stack.Screen
        name="SpaceAddMemberPage"
        component={AddPage}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MemberNavigator;

export type {
  SpaceMemberNavigatorParamList,
  SpaceMemberNavigatorKey,
  SpaceMemberNavigatorScreenProps,
};
