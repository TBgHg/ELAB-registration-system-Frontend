import { observer } from "mobx-react";
import React from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  Icon,
  Layout,
  Button,
  Text,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";

import type { ApplicationNavigatorScreenProps } from "@/navigators/application";
import useSWR from "swr";
import { store } from "@/libs/store";
import ApplicationClient from "@/libs/client/v1/application";
import NavigationBackAction from "@/components/application/NavigationBackAction";
import DeadLineCountdown from "@/components/old/application/DeadLineCountdown";
import RoomCardGroup from "@/components/application/seat-selection/RoomCardGroup";
import { useFocusEffect } from "@react-navigation/native";

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

const SeatSelectionPage = observer(
  ({
    navigation,
  }: ApplicationNavigatorScreenProps<"ApplicationSeatSelectionPage">) => {
    const { data, isLoading, isValidating, error, mutate } = useSWR(
      [store.user.credential.accessToken, "application"],
      async ([token, type]) => {
        const client = new ApplicationClient(token);
        const fetchRoomPromise = client.fetchRooms();
        const fetchCountdownPromise = client.getCountdown();
        const fetchCurrentRoomSelectionPromise = fetchRoomPromise.then(
          async () => {
            const room = await client.fetchCurrentRoomSelection();
            return room;
          }
        );
        return await Promise.all([
          fetchRoomPromise,
          fetchCountdownPromise,
          fetchCurrentRoomSelectionPromise,
        ]).catch((err) => {
          console.error("Error while fetching data");
          console.error(err);
          throw err;
        });
      }
    );
    const rooms = data?.[0];
    const countdown = data?.[1];
    const currentRoomSelection = data?.[2];
    const [roomIndex, setRoomIndex] = React.useState<number | null>(null);
    const [alreadySelected, setAlreadySelected] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    React.useEffect(() => {
      if (error !== undefined) {
        console.error(error);
        Alert.alert("加载失败", "请检查您的网络连接。");
      }
    }, [error]);
    useFocusEffect(
      React.useCallback(() => {
        mutate().catch(() => {
          Alert.alert("加载失败", "请检查您的网络连接。");
        });
        return () => {};
      }, [])
    );
    React.useEffect(() => {
      if (currentRoomSelection !== undefined) {
        if (currentRoomSelection === null) {
          setAlreadySelected(false);
          return;
        }
        const index = rooms?.findIndex(
          (room) => room.room_id === currentRoomSelection?.room_id
        );
        if (index !== undefined && index !== -1) {
          setRoomIndex(index);
          setAlreadySelected(true);
        }
      }
    }, [currentRoomSelection]);
    return (
      <Layout
        level="1"
        style={{
          flex: 1,
        }}
      >
        <TopNavigation
          accessoryLeft={NavigationBackAction}
          accessoryRight={
            isLoading || isValidating || isSubmitting ? (
              <TopNavigationAction icon={<Spinner />} />
            ) : alreadySelected ? (
              <TopNavigationAction
                icon={
                  <View>
                    <Icon name="arrow-forward-outline" fill="black" />
                  </View>
                }
                onPress={() => {
                  navigation.push("ApplicationCodePage");
                }}
              />
            ) : (
              <TopNavigationAction
                icon={
                  <View>
                    <Icon name="paper-plane-outline" fill="black" />
                  </View>
                }
                onPress={() => {
                  if (roomIndex === null) {
                    Alert.alert("请选择面试场次", "您还没有选择面试场次。");
                    return;
                  }
                  const client = new ApplicationClient(
                    store.user.credential.accessToken
                  );
                  const roomId = rooms?.[roomIndex].room_id as string;
                  setIsSubmitting(true);
                  client
                    .setRoom(roomId)
                    .then(() => {
                      setIsSubmitting(false);
                      navigation.push("ApplicationCodePage");
                    })
                    .catch((err) => {
                      console.error(err);
                      Alert.alert("提交失败", "请检查您的网络连接。");
                    });
                }}
              />
            )
          }
          title="科中加入申请"
          subtitle={isLoading || isValidating ? "正在加载" : "面试场次选择"}
          alignment="center"
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading || isValidating}
              onRefresh={() => {
                mutate().catch(() => {
                  Alert.alert("刷新失败", "请检查您的网络连接。");
                });
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
                {alreadySelected
                  ? "您已选择面试场次，若需要修改面试场次，请先点击下面的取消选择按钮，再重新选择面试场次。\n您可以点击右上角的箭头直接前往签到码页面。"
                  : "点击下面您想选择的面试批次，再点击右上角的按钮提交。您可以下拉刷新面试批次的余量情况。"}
              </Text>
              <Text style={styles.text} category="s1" status="primary">
                请您注意，在您提交申请后，您仍可以修改您的面试信息，但若需要修改场次，需要先取消您原先申请的面试场次。
              </Text>
            </Layout>
            <Layout>
              {countdown !== undefined ? (
                <DeadLineCountdown deadLine={new Date(countdown * 1000)} />
              ) : null}
            </Layout>
            {alreadySelected && (
              <Layout
                style={{
                  marginVertical: 16,
                }}
              >
                <Button
                  status="danger"
                  size="giant"
                  appearance="outline"
                  onPress={() => {
                    Alert.alert(
                      "取消选择",
                      "您确定要取消您的面试场次选择吗？",
                      [
                        {
                          text: "取消选择",
                          style: "destructive",
                          onPress: () => {
                            const client = new ApplicationClient(
                              store.user.credential.accessToken
                            );
                            client
                              .deleteRoom()
                              .then(async () => {
                                setAlreadySelected(false);
                                setRoomIndex(null);
                                await mutate();
                              })
                              .catch((err) => {
                                console.error(err);
                                Alert.alert("取消失败", "请检查您的网络连接。");
                              });
                          },
                        },
                        {
                          text: "维持选择",
                        },
                      ]
                    );
                  }}
                >
                  取消选择
                </Button>
              </Layout>
            )}
            <Layout>
              {rooms !== undefined && rooms.length !== 0 ? (
                <RoomCardGroup
                  rooms={rooms}
                  value={roomIndex}
                  onChange={setRoomIndex}
                  alreadySelected={alreadySelected}
                />
              ) : (
                <Text>似乎没有房间可选了...</Text>
              )}
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default SeatSelectionPage;
