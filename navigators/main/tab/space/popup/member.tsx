import React from "react";

import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { PopupNavigatorKey, PopupNavigatorScreenProps } from ".";
import MemberPage from "@/pages/main/tab/space/member/MemberPage";
import AddPage from "@/pages/main/tab/space/member/AddPage";
import type { MemberOperationPageParam } from "@/types/space";
import OperationPage from "@/pages/main/tab/space/member/OperationPage";

interface SpaceMemberNavigatorParamList {
  SpaceMemberPage: undefined;
  SpaceAddMemberPage: undefined;
  SpaceMemberOperationPage: MemberOperationPageParam;
  [key: string]: undefined | MemberOperationPageParam;
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
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}
    >
      <Stack.Screen
        name="SpaceMemberPage"
        component={MemberPage}
      ></Stack.Screen>
      <Stack.Screen
        name="SpaceAddMemberPage"
        component={AddPage}
      ></Stack.Screen>
      <Stack.Screen
        name="SpaceMemberOperationPage"
        component={OperationPage}
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
