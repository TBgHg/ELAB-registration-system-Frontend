// 与SpacePage同理，创建一个临时页面
import React from "react";
import {
  Avatar,
  Layout,
  List,
  ListItem,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type SpaceNavigatorParamList } from "./SpaceNavigator";
import { type Space } from "../../../lib/store/SpaceStore";
import { spaceStore } from "../../../lib/store";
import HeaderCloseAction from "../../../components/elab/space/HeaderCloseAction";
import { ScrollView, StyleSheet } from "react-native";

type SpaceMemberPageProps = NativeStackScreenProps<
  SpaceNavigatorParamList,
  "SpaceMemberPage"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  title: {
    paddingHorizontal: 16,
  },
  itemImage: {
    tintColor: null,
  },
});

const SpaceMemberPage = observer(
  ({ navigation, route }: SpaceMemberPageProps) => {
    const { params } = route;
    const { id } = params;
    const space: Space = spaceStore.spaces.find(
      (space) => space.id === id
    ) as Space;
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          title={space.title}
          subtitle="成员列表"
          alignment="center"
          accessoryLeft={HeaderCloseAction}
        />
        <ScrollView>
          <Layout style={styles.container}>
            <Layout style={styles.title}>
              <Text category="h1">成员列表</Text>
            </Layout>
            <Layout>
              <List
                data={space.members}
                renderItem={({ item, index }) => {
                  return <ListItem title={item.name}></ListItem>;
                }}
              />
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default SpaceMemberPage;
