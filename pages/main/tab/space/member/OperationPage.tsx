import Header from "@/components/space/space/operation/Header";
import Title from "@/components/space/space/operation/Title";
import { store } from "@/libs/store";
import type { SpaceMemberNavigatorScreenProps } from "@/navigators/main/tab/space/popup/member";
import { Layout, ListItem, Text } from "@ui-kitten/components";
import { observer } from "mobx-react";
import useSWR from "swr";
import React from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { fetchOperations } from "@/libs/hooks/memberOperation";
import OperateButton from "@/components/space/space/operation/OperateButton";

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
});

const OperationPage = observer(
  ({
    navigation,
    route,
  }: SpaceMemberNavigatorScreenProps<"SpaceMemberOperationPage">) => {
    const { type, space } = route.params;
    const { data, isValidating, isLoading, mutate } = useSWR(
      [store.user.credential.accessToken, space, type, "operation"],
      async ([accessToken, _space, _type, requestType]) => {
        return await fetchOperations(accessToken, _space, _type);
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
        <Header type={type} space={space} />
        <ScrollView
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
          <Title type={type} />
          {data === undefined || data.length === 0 ? (
            <Layout
              style={[
                styles.container,
                {
                  flex: 1,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text appearance="hint" category="p1">
                找不到内容...
              </Text>
            </Layout>
          ) : (
            <Layout>
              {data.map((item, index) => {
                return (
                  <Layout key={`operation-list-${index}`}>
                    <ListItem
                      title={item.name}
                      description={`创建于 ${item.operation.created_at.getFullYear()}年${
                        item.operation.created_at.getMonth() + 1
                      }月${item.operation.created_at.getDate()}日${" "}${item.operation.created_at
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${item.operation.created_at
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`}
                      accessoryRight={
                        <OperateButton
                          type={type}
                          space={space}
                          spaceId={item.operation.space_id}
                          openid={item.operation.openid}
                        />
                      }
                    />
                  </Layout>
                );
              })}
            </Layout>
          )}
        </ScrollView>
      </Layout>
    );
  }
);

export default OperationPage;
