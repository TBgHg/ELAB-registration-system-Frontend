import type { Space } from "@/types/space";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
});

const Title = (space: Space) => {
  return (
    <Layout style={styles.container}>
      <Text category="h2" style={styles.title}>
        {space.name}
      </Text>
      <Text>{space.description}</Text>
    </Layout>
  );
};

export default Title;
