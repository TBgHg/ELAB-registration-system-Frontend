import { Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import PermissionCard from "./PermissionCard";
import type { PermissionCardProps } from "./PermissionCard";

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});

const permissionAlerts: PermissionCardProps[] = [
  {
    title: "我们需要获取您的教务信息。",
    icon: "book-open-outline",
    iconBackground: "#3366FF",
    description:
      "电气创新实践基地是受教务处管理的大连理工大学创新实践班。为了登记您的信息，我们需要获取的您的姓名、学号、所属学部院系。",
  },
  {
    title: "我们需要获取您的联系方式。",
    icon: "phone-outline",
    iconBackground: "#3366FF",
    description: "为了能够联系上您，我们需要您的联系方式，包括您的手机号码。",
  },
  {
    title: "我们需要获取推送权限。",
    icon: "bell-outline",
    iconBackground: "#3366FF",
    description: "为了方便您获得来自科中的考核通知，我们需要获取您的推送权限。",
    subDescription:
      "本应用使用的推送服务为极光推送，有关极光推送的隐私政策请参阅极光推送的官方网站。",
  },
];

const PermissionAlert = () => {
  return (
    <Layout style={styles.container}>
      {permissionAlerts.map((permissionAlert, index) => (
        <PermissionCard {...permissionAlert} key={index} />
      ))}
    </Layout>
  );
};

export default PermissionAlert;
