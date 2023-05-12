import type { SpaceNavigatorScreenProps } from "@/navigators/main/tab/space";
import {
  Avatar,
  Icon,
  Input,
  Layout,
  ListItem,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import React from "react";
import type { NativeScrollEvent } from "react-native";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { observer } from "mobx-react";
import { store } from "@/libs/store";
import useContentList from "@/libs/hooks/useContentList";
import { useFocusEffect } from "@react-navigation/native";
import NavigationBackAction from "@/components/NavigationBackAction";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  itemImage: {
    tintColor: undefined,
  },
  title: {
    marginBottom: 8,
  },
  spinner: {
    flex: 1,
    paddingVertical: 8,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    paddingVertical: 32,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const ListPage = observer(
  ({
    navigation,
    route,
  }: SpaceNavigatorScreenProps<"SpaceContentListPage">) => {
    const { params } = route;
    const { type } = params;
    const spaceId = store.space.space.space_id;
    const accessToken = store.user.credential.accessToken;
    const [query, setQuery] = React.useState("");
    const { data, size, setSize, isLoading, isValidating, mutate } =
      useContentList(type, spaceId, query, accessToken);
    useFocusEffect(
      React.useCallback(() => {
        mutate()
          // .then((data) => {
          //   console.log({ data });
          // })
          .catch((err) => {
            console.error(err);
            Alert.alert("加载失败", "请稍后再试");
          });
      }, [])
    );
    return (
      <Layout style={styles.root}>
        <TopNavigation
          accessoryLeft={NavigationBackAction}
          title={`${type === "wiki" ? "知识库" : "帖子"}列表`}
          subtitle={store.space.space.name}
          alignment="center"
        />
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (
              data !== undefined &&
              data.flat().length >= 10 &&
              isCloseToBottom(nativeEvent)
            ) {
              setSize(size + 1).catch((err) => {
                console.error(err);
                Alert.alert("加载失败", "请稍后再试");
              });
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={isValidating || isLoading}
              onRefresh={() => {
                mutate().catch((err) => {
                  console.error(err);
                });
              }}
            />
          }
        >
          <Layout style={styles.container}>
            <Text category="h2" style={styles.title}>
              {type === "wiki" ? "知识库" : "帖子"}列表
            </Text>
            <Input
              size="large"
              textStyle={{
                fontSize: 18,
              }}
              placeholder={`搜索${type === "wiki" ? "知识库" : "帖子"}...`}
              value={query}
              onChangeText={setQuery}
              accessoryLeft={
                <View>
                  <Icon name="search-outline" fill="#8F9BB3" />
                </View>
              }
              style={styles.title}
            />
          </Layout>
          {data !== undefined && data.flat().length !== 0 ? (
            data.flat().map((item) => {
              return (
                <ListItem
                  key={item.content_id}
                  title={
                    <Layout>
                      <Text category="h6" style={{ marginBottom: 4 }}>
                        {item.title}
                      </Text>
                    </Layout>
                  }
                  accessoryLeft={(props) => (
                    <Avatar
                      {...props}
                      style={[props?.style, styles.itemImage]}
                      source={{
                        uri: item.author.avatar,
                      }}
                    />
                  )}
                  description={
                    <Layout>
                      <Text category="p2" appearance="hint">{`${
                        item.author.name
                        // "Zeithrold"
                      } 最后更新于 ${item.last_update_at.getFullYear()}年${
                        item.last_update_at.getMonth() + 1
                      }月${item.last_update_at.getDate()}日${" "}${item.last_update_at
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${item.last_update_at
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`}</Text>
                      <Text
                        // appearance="hint"
                        style={{
                          marginTop: 8,
                        }}
                      >{`${item.summary}`}</Text>
                    </Layout>
                  }
                />
              );
            })
          ) : (
            <Layout style={styles.empty}>
              <Text
                style={[
                  styles.title,
                  {
                    marginBottom: 8,
                  },
                ]}
                category="h5"
              >
                空空如也...
              </Text>
              <Text appearance="hint">
                回到空间主页，创建新的{type === "wiki" ? "知识库" : "帖子"}！
              </Text>
            </Layout>
          )}
        </ScrollView>
      </Layout>
    );
  }
);

export default ListPage;
