/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import React from "react";
import useSWR from "swr";
import { StyleSheet } from "react-native";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";

import { Layout, Text, TopNavigation } from "@ui-kitten/components";
import { store } from "@/libs/store";
import ApplicationClient from "@/libs/client/v1/application";
import { useFocusEffect } from "@react-navigation/native";
import NavigationBackAction from "@/components/application/NavigationBackAction";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  cardContainer: {
    borderRadius: 16,
    backgroundColor: "#3366FF",
    marginVertical: 16,
    padding: 16,
    color: "white",
  },
  cardText: {
    color: "white",
    marginVertical: 4,
  },
  cardTitle: {
    backgroundColor: "#3366FF",
  },
  qrCodeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    padding: 32,
    marginTop: 16,
    backgroundColor: "white",
  },
  qrCode: {
    marginBottom: 32,
  },
});

const CodePage = observer(() => {
  const { data, isLoading, isValidating, mutate } = useSWR(
    [store.user.credential.accessToken, "code"],
    async ([token, code]) => {
      const client = new ApplicationClient(token);
      const currentRoomSelectionPromise = client.fetchCurrentRoomSelection();
      const roomsPromise = client.fetchRooms();
      const [currentRoom, rooms] = await Promise.all([
        currentRoomSelectionPromise,
        roomsPromise,
      ]);
      const roomIndex = rooms.findIndex(
        (room) => room.room_id === currentRoom?.room_id
      );
      if (roomIndex === -1) {
        return undefined;
      }
      const targetRoom = rooms[roomIndex];
      return targetRoom;
    }
  );
  useFocusEffect(
    React.useCallback(() => {
      mutate().catch((err) => {
        console.error(err);
      });
    }, [])
  );
  return (
    <Layout
      level="1"
      style={{
        flex: 1,
      }}
    >
      <TopNavigation
        title="科中加入申请"
        alignment="center"
        subtitle="面试签到码"
        accessoryLeft={NavigationBackAction}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading || isValidating} />
        }
      >
        <Layout style={styles.container}>
          <Layout>
            <Text category="h2">我们海映楼见。</Text>
            <Text style={styles.descriptionText}>
              您的申请已经提交，请在下面签到卡所指示的时间与地点前往海映楼进行面试。
            </Text>
          </Layout>
          {isLoading || data === undefined ? null : (
            <Layout style={styles.cardContainer}>
              <Layout style={styles.cardTitle}>
                <Text category="h6" style={styles.cardText}>
                  电气创新实践基地面试签到码
                </Text>
                <Text category="s1" style={styles.cardText}>
                  {data.name}
                </Text>

                <Text category="p2" style={styles.cardText}>
                  {`${data.time.getFullYear()}年${
                    data.time.getMonth() + 1
                  }月${data.time.getDate()}日${" "}${data.time
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${data.time
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`}
                </Text>
              </Layout>
              <Layout style={styles.qrCodeContainer}>
                <Layout style={styles.qrCode}>
                  <QRCode
                    value={JSON.stringify(data)}
                    backgroundColor="transparent"
                    size={192}
                  />
                </Layout>
                <Layout
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text category="s1">
                    {store.user.user.name} ({store.user.user.student_id})
                  </Text>
                  <Text
                    category="s1"
                    style={{
                      marginTop: 8,
                    }}
                  >
                    申报组别：{store.user.user.group}
                  </Text>
                </Layout>
              </Layout>
            </Layout>
          )}
        </Layout>
      </ScrollView>
    </Layout>
  );
});

export default CodePage;
