import type { SpaceMemberNavigatorScreenProps } from "@/navigators/main/tab/space/popup/member";
import { Layout, Text } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
    return (
      <Layout style={styles.root}>
        <ScrollView>
          <Layout style={styles.container}>
            <Text category="h2"></Text>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default OperationPage;
