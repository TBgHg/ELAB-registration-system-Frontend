import { observer } from "mobx-react-lite";
import React from "react";

import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { TopNavigation } from "@ui-kitten/components";

import HeaderBackAction from "@/components/elab/space/HeaderBackAction";
import HeaderNewPostAction from "@/components/elab/space/HeaderNewPostAction";
import HeaderNewSpaceAction from "@/components/elab/space/HeaderNewSpaceAction";
import { spaceStore } from "@/lib/store";
import type { ElabNavigatorParamList } from "../ElabNavigator";
import CreatePostPage from "./CreatePostPage";
import CreateSpacePage from "./CreateSpacePage";
import FavouritePage from "./FavouritePage";
import NotificationPage from "./NotificationPage";
import PostPage from "./PostPage";
import SpaceHomePage from "./SpaceHomePage";
import SpaceMemberPage from "./SpaceMemberPage";
import SpacePage from "./SpacePage";
import WikiPage from "./WikiPage";

import type {
  FileSystemNavigatorParams,
  PageType,
  PostNavigatorParams,
  WikiNavigatorParams,
} from "@/lib/store/ElabStore";
interface NotificationNavigatorParams {
  type: "notification";
}

interface FavoriteNavigatorParams {
  type: "favorite";
}

interface SpacePageParams {
  type: "space";
  id: string;
}

interface SpaceMemberPageParams {
  type: "space-member";
  id: string;
}

interface CreatePostPageParams {
  type: "create-post";
  id: string;
}

interface CommonParams {
  type: PageType;
  id: string;
}

interface SpaceNavigatorParamList {
  SpaceHomePage: undefined;
  FileSystemPage: FileSystemNavigatorParams;
  PostPage: PostNavigatorParams;
  WikiPage: WikiNavigatorParams;
  NotificationPage: NotificationNavigatorParams;
  FavoritePage: FavoriteNavigatorParams;
  SpaceMemberPage: SpaceMemberPageParams;
  SpacePage: SpacePageParams;
  CreateSpacePage: undefined;
  CreatePostPage: CreatePostPageParams;
  [key: string]: undefined | any;
}

// 内容Stack导航器
const Stack = createNativeStackNavigator<SpaceNavigatorParamList>();

type SpaceNavigatorProps = NativeStackScreenProps<
  ElabNavigatorParamList,
  "SpaceNavigator"
>;

const SpaceNavigator = observer(({ navigation }: SpaceNavigatorProps) => {
  return (
    <Stack.Navigator
      initialRouteName="SpaceHomePage"
      screenOptions={{
        header: (props) => {
          return (
            <TopNavigation
              title={props.options.title}
              alignment="center"
              subtitle={spaceStore.pageTypeTranslate}
              accessoryLeft={
                spaceStore.canGoBack ? HeaderBackAction : undefined
              }
              accessoryRight={
                spaceStore.currentPage === "home"
                  ? HeaderNewSpaceAction
                  : spaceStore.currentPage === "space"
                  ? HeaderNewPostAction
                  : undefined
              }
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="SpaceHomePage"
        component={SpaceHomePage}
        options={{
          title: "空间",
        }}
      />
      {/* <Stack.Screen name="FileSystemPage" component={FileSystemPage} /> */}
      <Stack.Screen name="PostPage" component={PostPage} />
      <Stack.Screen name="WikiPage" component={WikiPage} />
      <Stack.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FavouritePage"
        component={FavouritePage}
        options={{
          presentation: "modal",
          title: "收藏",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"SpaceMemberPage"}
        component={SpaceMemberPage}
        options={{
          presentation: "containedModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"CreateSpacePage"}
        component={CreateSpacePage}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"CreatePostPage"}
        component={CreatePostPage}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />

      <Stack.Screen name={"SpacePage"} component={SpacePage} />
    </Stack.Navigator>
  );
});

export default SpaceNavigator;
export { type SpaceNavigatorParamList, type CommonParams };
