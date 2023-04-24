import { observer } from "mobx-react-lite";
import React from "react";

import { Button, Layout, Text } from "@ui-kitten/components";

import { userCredentialStore } from "../../lib/store";

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { ElabNavigatorParamList } from "./ElabNavigator";
import { ScrollView, StyleSheet } from "react-native";
import RemindCardList from "../../components/elab/RemindCardList";
import HomeFastAction from "../../components/elab/HomeFastAction";
import axios from "axios";
import TodayWikiCard from "../../components/elab/TodayWikiCard";
type ElabHomePageProps = BottomTabScreenProps<
  ElabNavigatorParamList,
  "ElabHomePage"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    paddingVertical: 8,
  },
  remindCardContainer: {
    paddingVertical: 8,
  },
});

const ElabHomePage = ({ navigation }: ElabHomePageProps) => {
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout style={styles.title}>
          <Text category="h2">
            欢迎你，
            {
              userCredentialStore.usernameDictionary[
                userCredentialStore.username
              ]
            }
            ！
          </Text>
        </Layout>
        <RemindCardList />
        <TodayWikiCard />
      </ScrollView>
    </Layout>
  );
};

export default observer(ElabHomePage);
