import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import Header from "../../components/application/ApplicationHeader";
import { observer } from "mobx-react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ApplicationNavigatorParamList } from "./ApplicationNavigator";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { applicationStore } from "../../lib/store";
import DeadLineCountdown from "../../components/application/DeadLineCountdown";
import { NavigationBackAction } from "../../components/application";
import RoomCardGroup from "../../components/application/RoomCardGroup";
import NavigationSeatSaveAction from "../../components/application/NavigationSeatSaveAction";

type ApplicationSeatSelectionPageProps = NativeStackScreenProps<
  ApplicationNavigatorParamList,
  "ApplicationSeatSelectionPage"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
});

const ApplicationSeatSelectionPage = observer(
  ({ navigation }: ApplicationSeatSelectionPageProps) => {
    const [roomIndex, setRoomIndex] = React.useState<number | null>(null);
    useFocusEffect(
      React.useCallback(() => {
        applicationStore.setStatus("submitted");
        applicationStore.refreshRooms().catch(() => {});
        return () => {};
      }, [])
    );
    return (
      <Layout
        level="1"
        style={{
          flex: 1,
        }}
      >
        <Header
          navigation={navigation}
          accessoryLeft={NavigationBackAction}
          accessoryRight={
            <NavigationSeatSaveAction
              roomIndex={roomIndex}
              navigation={navigation}
            />
          }
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={applicationStore.roomLoading}
              onRefresh={() => {
                applicationStore.refreshRooms().catch(() => {});
              }}
            />
          }
        >
          <Layout style={styles.container}>
            <Layout>
              <Text category="h2" style={{ marginBottom: 8 }}>
                现在，请选择面试批次。
              </Text>
              <Text style={styles.text}>
                点击下面您想选择的面试批次，再点击右上角的按钮提交。您可以下拉刷新面试批次的余量情况。
              </Text>
              <Text style={styles.text} category="s1" status="danger">
                请您注意，在您提交申请后，您将无法更改您的申请表与面试批次。
              </Text>
            </Layout>
            <Layout>
              <DeadLineCountdown deadLine={applicationStore.deadline} />
            </Layout>
            <Layout>
              <RoomCardGroup
                rooms={applicationStore.rooms}
                value={roomIndex}
                onChange={setRoomIndex}
              />
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default ApplicationSeatSelectionPage;
