import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  TopNavigation,
} from "@ui-kitten/components";

import { userCredentialStore } from "../../lib/store";

import type { RootNavigationParamList } from "../RootNavigatior";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textBox: {
    paddingVertical: 8,
  },
  title: {
    paddingBottom: 8,
  },
  inputBox: {
    paddingVertical: 8,
  },
  input: {
    paddingVertical: 8,
  },
  buttonBox: {
    flex: 1,
    paddingVertical: 8,
  },
});

type LoginPageProps = NativeStackScreenProps<
  RootNavigationParamList,
  "LoginPage"
>;

const LoginPage = ({ navigation }: LoginPageProps) => {
  return (
    <Layout
      level="1"
      style={{
        flex: 1,
      }}
    >
      <TopNavigation title="登陆" alignment="center" />
      <ScrollView>
        <Layout style={styles.container}>
          <Layout style={styles.textBox}>
            <Text category="h2" style={styles.title}>
              让我们帮你登陆吧。
            </Text>
            <Text>OneELAB需要登陆。请点击下面的按钮以进行登录。</Text>
          </Layout>
          <Layout style={styles.buttonBox}>
            <ButtonGroup style={{ flex: 1 }}>
              <Button
                style={{ flex: 1 }}
                size="giant"
                onPress={() => {
                  if (username === "" || password === "") {
                    Alert.alert("请填写完整信息");
                    return;
                  }
                  if (
                    userCredentialStore.passwordDictionary[username] ===
                    password
                  ) {
                    userCredentialStore.setUserName(username);
                    userCredentialStore.saveCredential();
                    navigation.navigate("ElabNavigator");
                    return;
                  }
                  Alert.alert("用户名或密码错误", "请检查后重试.");
                }}
              >
                登陆
              </Button>
              <Button size="giant" disabled style={{ flex: 1 }}>
                注册未开放
              </Button>
            </ButtonGroup>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default LoginPage;

export type { LoginPageProps };
