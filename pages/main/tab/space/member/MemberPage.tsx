import NavigationCloseAction from "@/components/NavigationCloseAction";
import { store } from "@/libs/store";
import {
  Layout,
  TopNavigation,
  Text,
  Divider,
  ListItem,
  Avatar,
  Button,
  ButtonGroup,
} from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { Alert, RefreshControl, StyleSheet } from "react-native";
import useSWR from "swr";
import { ScrollView } from "react-native-gesture-handler";
import MemberClient from "@/libs/client/v1/space/member";
import { useFocusEffect } from "@react-navigation/native";
import type { SpaceMemberNavigatorScreenProps } from "@/navigators/main/tab/space/popup/member";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  itemImage: {
    tintColor: undefined,
  },
});

const MemberPage = observer(
  ({ navigation }: SpaceMemberNavigatorScreenProps<"MemberPage">) => {
    const { data, isLoading, isValidating, mutate } = useSWR(
      [store.space.space.space_id, store.user.credential.accessToken, "avatar"],
      async ([spaceId, accessToken, type]) => {
        const client = new MemberClient(accessToken, spaceId);
        const members = await client.fetchMemberList();
        return members;
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
      <Layout style={styles.root}>
        <TopNavigation
          title="成员"
          subtitle={store.space.space.name}
          alignment="center"
          accessoryLeft={NavigationCloseAction}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading || isValidating}
              onRefresh={() => {
                mutate().catch((err) => {
                  console.error(err);
                  Alert.alert("刷新失败", "请稍后再试");
                });
              }}
            />
          }
        >
          <Layout style={styles.container}>
            <Text category="h2" style={styles.title}>
              成员列表
            </Text>
            <Text>在这里您可以查看空间成员。</Text>
          </Layout>
          {store.space.position === "moderator" ||
          store.space.position === "owner" ? (
            <Layout style={styles.container}>
              <ButtonGroup
                style={{
                  flex: 1,
                }}
                appearance="outline"
              >
                <Button
                  style={{
                    flex: 1,
                  }}
                  onPress={() => {
                    navigation.navigate("SpaceAddMemberPage");
                  }}
                >
                  邀请成员
                </Button>
                <Button
                  style={{
                    flex: 1,
                  }}
                  onPress={() => {
                    navigation.navigate("SpaceMemberOperationPage", {
                      type: "invitation",
                      space: true,
                    });
                  }}
                >
                  邀请列表
                </Button>
                <Button
                  style={{
                    flex: 1,
                  }}
                  onPress={() => {
                    navigation.navigate("SpaceMemberOperationPage", {
                      type: "apply",
                      space: true,
                    });
                  }}
                >
                  申请列表
                </Button>
              </ButtonGroup>
            </Layout>
          ) : null}
          <Layout>
            <Divider />
            {data === undefined || isLoading || isValidating
              ? null
              : data.map((value, index) => {
                  return (
                    <Layout key={`space-member-${index}`}>
                      <ListItem
                        title={(props) => <Text {...props}>{value.name}</Text>}
                        accessoryLeft={(props) => (
                          <Avatar
                            {...props}
                            style={[props?.style, styles.itemImage]}
                            source={{
                              uri: value.avatar,
                            }}
                          />
                        )}
                        onLongPress={() => {
                          Alert.alert("提示", "您确定要移除该成员吗？", [
                            {
                              text: "取消",
                              style: "cancel",
                            },
                            {
                              text: "确定",
                              style: "destructive",
                              onPress: () => {
                                const client = new MemberClient(
                                  store.user.credential.accessToken,
                                  store.space.space.space_id
                                );
                                client
                                  .deleteExistingMember(value.openid)
                                  .then(async () => {
                                    return await mutate();
                                  })
                                  .catch((err) => {
                                    console.error(err);
                                  });
                              },
                            },
                          ]);
                        }}
                        description={`${
                          value.position === "none"
                            ? "成员"
                            : value.position === "moderator"
                            ? "管理员"
                            : "所有者"
                        }${
                          value.openid === store.user.user.openid
                            ? "，本人"
                            : ""
                        }`}
                      />
                      <Divider />
                    </Layout>
                  );
                })}
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default MemberPage;
