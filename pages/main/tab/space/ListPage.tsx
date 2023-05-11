import type { SpaceNavigatorScreenProps } from "@/navigators/main/tab/space";
import {
  Avatar,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Spinner,
  Text,
} from "@ui-kitten/components";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { observer } from "mobx-react";
import { store } from "@/libs/store";
import useContentList from "@/libs/hooks/useContentList";
import { useFocusEffect } from "@react-navigation/native";

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
});

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
        mutate().catch((err) => {
          console.error(err);
          Alert.alert("加载失败", "请稍后再试");
        });
      }, [])
    );
    return (
      <List
        data={
          // 将双重数组转换为单重数组
          data?.reduce((prev, curr) => {
            return [...prev, ...curr];
          }, []) ?? []
        }
        onEndReached={() => {
          setSize(size + 1).catch((err) => {
            console.error(err);
            Alert.alert("加载失败", "请稍后再试");
          });
        }}
        renderItem={({ item, index }) => {
          return (
            <>
              {index === 0 && (
                <Layout style={styles.container}>
                  <Text category="h2" style={styles.title}>
                    {type === "wiki" ? "知识库" : "帖子"}列表
                  </Text>
                  <Input
                    size="large"
                    textStyle={{
                      fontSize: 18,
                    }}
                    placeholder={`搜索${
                      type === "wiki" ? "知识库" : "帖子"
                    }...`}
                    value={query}
                    onChangeText={setQuery}
                    accessoryLeft={
                      <View>
                        <Icon name="search-outline" fill="#8F9BB3" />
                      </View>
                    }
                    style={styles.title}
                  ></Input>
                  {!(isLoading || isValidating) && (
                    <Layout style={styles.spinner}>
                      <Spinner />
                    </Layout>
                  )}
                </Layout>
              )}
              <ListItem
                key={item.content_id}
                title={item.title}
                accessoryLeft={(props) => (
                  <Avatar
                    {...props}
                    style={[props?.style, styles.itemImage]}
                    source={{
                      uri: item.author.avatar,
                    }}
                  />
                )}
                description={`${
                  item.author.name
                } 最后更新于 ${item.last_update_at
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${item.last_update_at
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}}`}
              />
            </>
          );
        }}
      >
        <Layout></Layout>
      </List>
    );
  }
);

export default ListPage;
