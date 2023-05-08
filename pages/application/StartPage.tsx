import PermissionAlert from "@/components/application/start/PermissionAlert";
import StartTopBar from "@/components/application/start/StartTopBar";
import WelcomeMessage from "@/components/application/start/WelcomeMessage";
import { Divider, Layout } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

const StartPage = observer(() => {
  return (
    <Layout level="1" style={styles.root}>
      <StartTopBar />
      <Divider />
      <ScrollView>
        <Layout style={styles.container}>
          <WelcomeMessage />
          <Divider />
          <PermissionAlert />
        </Layout>
      </ScrollView>
    </Layout>
  );
});

export default StartPage;
