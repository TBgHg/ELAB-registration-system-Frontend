import Header from "@/components/space/home/Header";
import SpaceListItem from "@/components/space/home/SpaceListItem";
import UserClient from "@/libs/client/v1/user";
import { store } from "@/libs/store";
import type { SpaceNavigatorScreenProps } from "@/navigators/main/tab/space";
import { useFocusEffect } from "@react-navigation/native";
import { Divider, Layout, Text } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { Alert, RefreshControl, StyleSheet } from "react-native";
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
  empty: {
    padding: 16,
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
        <Header />
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
          <Divider />
          <Layout>
            {data === undefined || data.length === 0 ? (
              <Layout style={styles.empty}>
                <Text category="h5">您似乎没有空间...</Text>
                <Text style={styles.description} category="p2">
                  先从加入或创建空间开始吧！
                </Text>
              </Layout>
            ) : (
              data.map((space, index) => {
                return (
                  <Layout key={space.space_id}>
                    <SpaceListItem space={space} />
                    {index !== data.length - 1 ? <Divider /> : null}
                  </Layout>
                );
              })
            )}
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default HomePage;
