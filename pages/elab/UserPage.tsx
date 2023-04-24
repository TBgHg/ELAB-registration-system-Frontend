import React from "react";
import { StyleSheet } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { Avatar, Layout, Text, TopNavigation } from "@ui-kitten/components";

import LogoutAction from "../../components/application/LogoutAction";
import { userCredentialStore } from "../../lib/store";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ElabNavigatorParamList } from "./ElabNavigator";
type ElabUserPageProps = NativeStackScreenProps<ElabNavigatorParamList>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ElabUserPage = ({ navigation }: ElabUserPageProps) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title:
          userCredentialStore.usernameDictionary[userCredentialStore.username],
      });
    }, [userCredentialStore.username])
  );
  return (
    <Layout style={styles.container}>
      <TopNavigation
        title="我"
        alignment="center"
        accessoryLeft={<LogoutAction />}
      ></TopNavigation>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          source={{
            uri: "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
          }}
          style={{
            width: 100,
            height: 100,
            marginBottom: 25,
          }}
        ></Avatar>
        <Text
          category="h2"
          style={{
            marginBottom: 12,
          }}
        >
          金一
        </Text>
        <Text category="p2">软件组 2021级</Text>
      </Layout>
    </Layout>
  );
};

export default ElabUserPage;
