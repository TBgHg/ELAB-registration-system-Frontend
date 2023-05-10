import MemberClient from "@/libs/client/v1/space/member";
import { store } from "@/libs/store";
import type { MemberResponse } from "@/types/member";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Avatar, Divider, Layout, Text } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, Pressable } from "react-native";
import useSWR from "swr";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginRight: 8,
  },
});

const Member = observer(() => {
  const navigation = useNavigation();
  const { data, isLoading, isValidating, mutate } = useSWR(
    [store.space.space.space_id, store.user.credential.accessToken, "avatar"],
    async ([spaceId, accessToken, type]) => {
      const client = new MemberClient(accessToken, spaceId);
      const members: MemberResponse[] = await client.fetchMemberList();
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
    <Pressable
      onPress={() => {
        navigation.navigate("SpacePopupNavigator", {
          screen: "SpaceMemberNavigator",
          params: {
            screen: "SpaceMemberPage",
          },
        });
      }}
    >
      <Divider />
      <Layout style={styles.container}>
        <Layout>
          <Text category="p2" style={styles.text}>
            {isLoading || isValidating
              ? "正在加载"
              : `共${(data as MemberResponse[]).length}名成员`}
          </Text>
        </Layout>
        <Layout>
          {isLoading || isValidating || data === undefined
            ? null
            : data.map((value, index) => {
                if (index >= 4) {
                  return null;
                }
                return (
                  <Avatar
                    source={{
                      uri: value.avatar,
                    }}
                    key={`avatar-${index}`}
                  />
                );
              })}
        </Layout>
      </Layout>
      <Divider />
    </Pressable>
  );
});

export default Member;
