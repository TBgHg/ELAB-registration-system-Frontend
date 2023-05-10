import NavigationBackAction from "@/components/NavigationBackAction";
import { store } from "@/libs/store";
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  ListItem,
  Spinner,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { observer } from "mobx-react";
import useSWR from "swr";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import UserClient from "@/libs/client/v1/user";
import { useFocusEffect } from "@react-navigation/native";
import MemberClient from "@/libs/client/v1/space/member";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  spinner: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  hint: {
    flex: 1,
    alignItems: "center",
  },
  list: {},
  itemImage: {
    tintColor: undefined,
  },
});

const AddPage = observer(() => {
  const [query, setQuery] = React.useState("");
  const { data, isLoading, isValidating, mutate } = useSWR(
    [store.space.space.name, query, "user_search"],
    async ([spaceId, query, type]) => {
      if (query === "") {
        return undefined;
      }
      const userClient = new UserClient(store.user.credential.accessToken);
      const memberClient = new MemberClient(
        store.user.credential.accessToken,
        store.space.space.space_id
      );
      const [members, users] = await Promise.all([
        memberClient.fetchMemberList(),
        userClient.searchUser(query),
      ]);
      const result = users.map((value) => {
        let tag = "normal";
        if (value.openid === store.user.user.openid) {
          tag = "self";
        }
        if (
          members.findIndex((member) => {
            return value.openid === member.openid;
          }) > 1
        ) {
          tag = "invited";
        }
        return {
          user: value,
          tag,
        };
      });
      return result;
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
    <Layout style={styles.root} level="1">
      <TopNavigation
        accessoryLeft={NavigationBackAction}
        title="邀请成员"
        alignment="center"
        subtitle={store.space.space.name}
      />
      <ScrollView>
        <Layout>
          <Layout style={styles.container}>
            <Text category="h2" style={styles.title}>
              邀请成员
            </Text>
            <Text style={styles.title}>
              在搜索框输入名字，选中想要邀请的成员。
            </Text>
            <Input
              size="large"
              textStyle={{
                fontSize: 18,
              }}
              placeholder="搜索用户..."
              value={query}
              onChangeText={setQuery}
              accessoryLeft={
                <View>
                  <Icon name="search-outline" fill="#8F9BB3" />
                </View>
              }
            />
          </Layout>
          <Layout
            style={{
              flex: 1,
            }}
          >
            {isLoading || isValidating ? (
              <Layout style={styles.spinner}>
                <Spinner />
              </Layout>
            ) : null}
            <Layout>
              {query === "" ? (
                <Layout style={[styles.container, styles.hint]}>
                  <Text appearance="hint">在搜索栏输入以开始...</Text>
                </Layout>
              ) : data === undefined || data.length === 0 ? (
                <Layout style={[styles.container, styles.hint]}>
                  <Text appearance="hint">找不到用户...</Text>
                </Layout>
              ) : (
                <Layout>
                  <Divider />
                  {data.map((value) => {
                    return (
                      <Layout key={`addmember-${value.user.openid}`}>
                        <ListItem
                          title={value.user.name}
                          description={
                            value.tag === "self"
                              ? "自己"
                              : value.tag === "invited"
                              ? "成员"
                              : ""
                          }
                          accessoryRight={
                            value.tag === "normal"
                              ? (props) => (
                                  <Button
                                    size="small"
                                    appearance="outline"
                                    onPress={() => {}}
                                  >
                                    邀请
                                  </Button>
                                )
                              : undefined
                          }
                        />
                        <Divider />
                      </Layout>
                    );
                  })}
                </Layout>
              )}
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
});

export default AddPage;
