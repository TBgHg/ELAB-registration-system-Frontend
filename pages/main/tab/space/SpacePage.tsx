import { Divider, Layout } from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
// import useSWR from "swr";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { store } from "@/libs/store";
import SpacePageHeader from "@/components/space/space/Header";
import Title from "@/components/space/space/Title";
import Member from "@/components/space/space/Member";
import Today from "@/components/space/space/Today";

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
    padding: 16,
  },
  description: {
    marginTop: 8,
  },
});

const SpacePage = observer(() => {
  return (
    <Layout style={styles.root} level="1">
      <SpacePageHeader />
      <Divider />
      <ScrollView>
        <Layout>
          <Title {...store.space.space} />
          <Member />
          <Today />
        </Layout>
      </ScrollView>
    </Layout>
  );
});

export default SpacePage;
