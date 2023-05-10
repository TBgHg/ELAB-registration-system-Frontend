import type { OperationType } from "@/types/space";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface TitleProps {
  type: OperationType;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    marginBottom: 8,
  },
});

const Title = ({ type }: TitleProps) => {
  return (
    <Layout style={styles.container}>
      <Text category="h2" style={styles.text}>
        {type === "invitation" ? "邀请列表" : "申请列表"}
      </Text>
    </Layout>
  );
};

export default Title;
