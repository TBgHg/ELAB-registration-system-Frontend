import { Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    padding: 16,
  },
});

const TodayWiki = () => {
  return <Layout style={styles.containter}></Layout>;
};
