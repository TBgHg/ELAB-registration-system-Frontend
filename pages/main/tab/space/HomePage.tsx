import UserClient from "@/libs/client/v1/user";
import { store } from "@/libs/store";
import type { SpaceNavigatorScreenProps } from "@/navigators/main/tab/space";
import { useFocusEffect } from "@react-navigation/native";
import {
  Divider,
  Layout,
  ListItem,
  TopNavigation,
  Text,
  OverflowMenu,
  MenuItem,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useSWR from "swr";

const randomTitle = ["今天是科研的好天气。", "今天科研运势：大吉"];

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  title: {
    padding: 16,
  },
  container: {
    flex: 1,
  },
  description: {
    marginTop: 8,
  },
  listItemTitle: {
    flex: 1,
    flexDirection: "column",
  },
  tag: {
    backgroundColor: "#E4E9F2",
    borderRadius: 8,
    padding: 4,
  },
});

const HomePage = observer(
  ({ navigation }: SpaceNavigatorScreenProps<"SpaceHomePage">) => {
    const { data, isLoading, isValidating, mutate } = useSWR(
      [store.user.user.openid, store.user.credential.accessToken],
      async ([openid, accessToken]) => {
        const client = new UserClient(accessToken);
        const spaces = await client.fetchSpaces(openid);
        return spaces === null ? [] : spaces;
      }
    );
    const [titleIndex, setTitleIndex] = React.useState(0);
    const [visible, setVisible] = React.useState(false);
    useFocusEffect(
      React.useCallback(() => {
        setTitleIndex(Math.floor(Math.random() * randomTitle.length));
        mutate().catch((err) => {
          console.error(err);
          Alert.alert("刷新失败", "请稍后再试");
        });
      }, [])
    );
    return (
      <Layout style={styles.root} level="1">
        <TopNavigation
          title="空间"
          alignment="center"
          accessoryRight={() => (
            <OverflowMenu
              anchor={() => {
                return (
                  <TopNavigationAction
                    icon={(props) => (
                      <View>
                        <Icon {...props} name="plus" />
                      </View>
                    )}
                    onPress={() => {
                      setVisible(true);
                    }}
                  />
                );
              }}
              visible={visible}
              // selectedIndex={selectedIndex}
              onSelect={(index) => {
                setVisible(false);
              }}
              onBackdropPress={() => {
                setVisible(false);
              }}
            >
              <MenuItem title="创建空间" />
              <MenuItem title="空间邀请列表" />
            </OverflowMenu>
          )}
        />
        <Divider />
        <ScrollView
          style={styles.container}
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
          <Layout style={styles.title}>
            <Text category="h2">{randomTitle[titleIndex]}</Text>
            <Text style={styles.description} category="p2">
              在OneELAB中，科研从空间开始。您可以点击下面已经加入的空间，也可以自己创建一个空间。
            </Text>
          </Layout>
          <Layout>
            {data === undefined
              ? null
              : data.map((space, index) => {
                  return (
                    <Layout key={space.space_id}>
                      <ListItem
                        title={
                          <Layout style={styles.listItemTitle}>
                            <Text category="h6" style={{ flex: 1 }}>
                              {space.name}
                            </Text>
                            {space.private ? (
                              <Layout
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  paddingVertical: 4,
                                }}
                              >
                                <Layout style={styles.tag}>
                                  <Text category="c1" appearance="hint">
                                    未公开空间
                                  </Text>
                                </Layout>
                              </Layout>
                            ) : null}
                          </Layout>
                        }
                        style={{
                          flex: 1,
                        }}
                        description={
                          <Layout>
                            <Text category="c1" appearance="hint">
                              {space.description}
                            </Text>
                          </Layout>
                        }
                        onLongPress={() => {
                          Alert.alert("长按", "长按");
                        }}
                        onPress={() => {
                          store.space.setSpace(space);
                          navigation.push("SpacePage", {
                            id: space.space_id,
                          });
                        }}
                      />
                      {index === data.length - 1 ? null : <Divider />}
                    </Layout>
                  );
                })}
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default HomePage;
