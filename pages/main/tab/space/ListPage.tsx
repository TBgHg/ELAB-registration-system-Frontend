import type { SpaceNavigatorScreenProps } from "@/navigators/main/tab/space";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const ListPage = ({
  navigation,
  route,
}: SpaceNavigatorScreenProps<"SpaceContentListPage">) => {
  return <Layout style={styles.root}></Layout>;
};

export default ListPage;
