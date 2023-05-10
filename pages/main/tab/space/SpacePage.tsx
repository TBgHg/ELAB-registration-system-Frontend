import NavigationBackAction from "@/components/application/NavigationBackAction";
import { Divider, Layout, Text, TopNavigation } from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import useSWR from "swr";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { store } from "@/libs/store";

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
});

const SpacePage = observer(() => {
  return (
    <Layout style={styles.root} level="1">
      <TopNavigation
        title="空间"
        alignment="center"
        accessoryLeft={NavigationBackAction}
      />
      <Divider />
      <ScrollView>
        <Text>{store.space.space.name}</Text>
      </ScrollView>
    </Layout>
  );
});

export default SpacePage;
