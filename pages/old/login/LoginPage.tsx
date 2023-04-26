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
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
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
            <Text>OneELAB需要登陆。请填写账户与密码以进行登录。</Text>
          </Layout>
          <Layout style={styles.inputBox}>
            <Input
              label="你的账户"
              placeholder="用户名/手机号/邮箱"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              size="large"
            ></Input>
            <Input
              label="你的密码"
              placeholder="你的密码"
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              size="large"
            ></Input>
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
