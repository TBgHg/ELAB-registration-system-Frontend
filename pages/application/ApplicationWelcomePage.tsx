import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useEffectOnce } from "usehooks-ts";

import { Button, Divider, Layout, Text } from "@ui-kitten/components";

import {
  PermissionCard,
  type PermissionCardProps,
} from "../../components/application";
import Header from "../../components/application/ApplicationHeader";
import { applicationStore } from "../../lib/store";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ApplicationNavigatorParamList } from "./ApplicationNavigator";
import LogoutAction from "../../components/application/LogoutAction";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
  cardGroup: {
    marginVertical: 16,
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

const permissionCards: PermissionCardProps[] = [
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

type ApplicationWelcomePageProps = NativeStackScreenProps<
  ApplicationNavigatorParamList,
  "ApplicationWelcomePage"
>;

const ApplicationWelcomePage = observer(
  ({ navigation }: ApplicationWelcomePageProps) => {
    useEffectOnce(() => {
      applicationStore.toggleLoading(false);
    });
    return (
      <Layout level="1">
        <Header
          navigation={navigation}
          accessoryRight={
            <Button
              size="small"
              appearance="ghost"
              onPress={() => {
                navigation.navigate("ApplicationFormNavigator");
              }}
            >
              开始申请
            </Button>
          }
          accessoryLeft={<LogoutAction />}
        />
        <ScrollView>
          <Layout style={styles.container}>
            <WelcomeMessage />
            <Divider />
            <Layout style={styles.cardGroup}>
              {permissionCards.map((card, index) => (
                <PermissionCard key={index} {...card} />
              ))}
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default ApplicationWelcomePage;
