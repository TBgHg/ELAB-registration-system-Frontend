import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    paddingBottom: 16,
  },
  textBox: {
    paddingBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

const messageGroups = [
  "欢迎来到大连理工大学电气创新实践基地（科中）！",
  "通过简短的步骤，您即可申请加入科中。待考核通过，您就会成为科中的一员！",
  "申请加入科中期间，我们需要您的以下授权，请您知晓。",
  "如您已准备好，请点击右上角按钮开始申请，我们将自动向您请求通知权限。",
];

const WelcomeMessage = () => {
  return (
    <Layout>
      <Layout style={styles.title}>
        <Text category="h2">科中欢迎你！</Text>
      </Layout>
      {messageGroups.map((message, index) => (
        <Layout style={styles.textBox} key={index}>
          <Text style={styles.text}>{message}</Text>
        </Layout>
      ))}
    </Layout>
  );
};

export default WelcomeMessage;
