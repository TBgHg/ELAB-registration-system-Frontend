/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";

import { Layout, Text } from "@ui-kitten/components";

import Header from "../../components/application/ApplicationHeader";
import LogoutAction from "../../components/application/LogoutAction";
import { applicationStore } from "../../lib/store";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ApplicationNavigatorParamList } from "./Navigator";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  cardContainer: {
    borderRadius: 16,
    backgroundColor: "#3366FF",
    marginVertical: 16,
    padding: 16,
    color: "white",
  },
  cardText: {
    color: "white",
    marginVertical: 4,
  },
  cardTitle: {
    backgroundColor: "#3366FF",
  },
  qrCodeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    padding: 32,
    marginTop: 16,
    backgroundColor: "white",
  },
  qrCode: {
    marginBottom: 32,
  },
});

type ApplicationCodePageProps = NativeStackScreenProps<
  ApplicationNavigatorParamList,
  "ApplicationCodePage"
>;

const ApplicationCodePage = observer(
  ({ navigation }: ApplicationCodePageProps) => {
    return (
      <Layout
        level="1"
        style={{
          flex: 1,
        }}
      >
        <Header navigation={navigation} accessoryLeft={<LogoutAction />} />
        <ScrollView>
          <Layout style={styles.container}>
            <Layout>
              <Text category="h2">我们海映楼见。</Text>
              <Text style={styles.descriptionText}>
                您的申请已经提交，请在下面签到卡所指示的时间与地点前往海映楼进行面试。
              </Text>
            </Layout>
            <Layout style={styles.cardContainer}>
              <Layout style={styles.cardTitle}>
                <Text category="h6" style={[styles.cardText]}>
                  电气创新实践基地面试签到码
                </Text>
                <Text category="s1" style={[styles.cardText]}>
                  {applicationStore.selectedRoom?.name}
                </Text>

                <Text category="p2" style={[styles.cardText]}>
                  {`${applicationStore.selectedRoom!.time} ${
                    applicationStore.selectedRoom!.place
                  }`}
                </Text>
              </Layout>
              <Layout style={styles.qrCodeContainer}>
                <Layout style={styles.qrCode}>
                  <QRCode
                    value="Ahead Against Fate. Zeithrold."
                    backgroundColor="transparent"
                    size={192}
                  />
                </Layout>
                <Layout>
                  <Text category="s1">
                    {applicationStore.form.name!} (
                    {applicationStore.form.studentId!})
                  </Text>

                  <Text
                    category="p2"
                    style={{
                      marginTop: 8,
                    }}
                  >
                    {applicationStore.form.department}
                  </Text>
                </Layout>
              </Layout>
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default ApplicationCodePage;
