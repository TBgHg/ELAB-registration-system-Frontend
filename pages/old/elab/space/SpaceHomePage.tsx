import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text } from "@ui-kitten/components";

import HomeFastAction from "@/components/elab/HomeFastAction";
import SpaceList from "@/components/elab/space/SpaceList";
import { spaceStore } from "@/lib/store";
import type { SpaceNavigatorParamList } from "./SpaceNavigator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
});

type SpaceHomePageProps = NativeStackScreenProps<
  SpaceNavigatorParamList,
  "SpaceHomePage"
>;

const SpaceHomePage = observer(({ navigation }: SpaceHomePageProps) => {
  useFocusEffect(
    React.useCallback(() => {
      spaceStore.setCurrentPage("home");
      spaceStore.setCanGoBack(false);
    }, [])
  );
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout style={styles.title}>
          <Text
            category="h2"
            style={{
              marginBottom: 8,
            }}
          >
            今天科研运气：大吉
          </Text>
          <HomeFastAction />
          <Text category="h6">空间列表</Text>
        </Layout>
        <SpaceList navigation={navigation} />
      </ScrollView>
    </Layout>
  );
});

export default SpaceHomePage;
