import React from "react";

import * as PKCE from "expo-auth-session/build/PKCE";
import { Alert, ScrollView, StyleSheet } from "react-native";

import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from "@ui-kitten/components";

import { store } from "@/libs/store";

import type { DiscoveryDocument } from "expo-auth-session";
import {
  makeRedirectUri,
  useAutoDiscovery,
  AuthRequest,
} from "expo-auth-session";
import { apiEndpoint, oidcClientId, oidcDiscovery } from "@/constants/index";
import createAuthSession from "@/libs/auth/createSession";
import type { LoginNavigatorScreenProps } from "@/navigators/login";
import type { Credential } from "@/types/user";
import { observer } from "mobx-react";
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

interface LoginButtonOnPress {
  discovery: DiscoveryDocument;
  redirectUri: string;
}

const loginButtonOnPress = async ({
  discovery,
  redirectUri,
}: LoginButtonOnPress) => {
  const oidcRedirectUri = apiEndpoint + "/auth/callback";
  const request = new AuthRequest({
    redirectUri: oidcRedirectUri,
    clientId: oidcClientId,
    scopes: ["openid", "profile", "email"],
  });
  const { codeChallenge, codeVerifier } = await PKCE.buildCodeAsync();
  request.codeChallenge = codeChallenge;
  request.codeVerifier = codeVerifier;
  try {
    await createAuthSession({
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
      state: request.state,
    });
  } catch (e) {
    console.error(e);
    Alert.alert("无法启动登录会话", "请检查你的网络连接。");
  }
  const result = await request.promptAsync(discovery, {
    showInRecents: true,
  });
  console.log(result);
  if (result.type === "success") {
    store.user.setCredential(result.authentication as Credential);
  }
};

const LoginPage = observer(
  ({ navigation }: LoginNavigatorScreenProps<"LoginPage">) => {
    // discovery 可能为空值，需要进行判定
    const discovery = useAutoDiscovery(oidcDiscovery);
    const redirectUri = makeRedirectUri();
    React.useEffect(() => {
      console.log(store.user.userStatus);
      if (store.user.userStatus === "authorized") {
        navigation.navigate("MainNavigator", {
          screen: "TabNavigator",
          params: {
            screen: "HomeNavigator",
            params: {
              screen: "HomePage",
            },
          },
        });
      } else if (store.user.userStatus === "not_elab_member") {
        navigation.navigate("ApplicationNavigator", {
          screen: "ApplicationStartPage",
        });
      }
    }, [store.user.userStatus]);
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation title="登陆" alignment="center" />
        <Divider />
        <ScrollView>
          <Layout style={styles.container}>
            <Layout style={styles.textBox}>
              <Text category="h2" style={styles.title}>
                让我们帮你登陆吧。
              </Text>
              <Text>OneELAB需要登陆。请点击下面的按钮以进行登录。</Text>
            </Layout>
            <Button
              disabled={discovery == null}
              onPress={() => {
                loginButtonOnPress({
                  discovery: discovery as DiscoveryDocument,
                  redirectUri,
                })
                  .then(() => {
                    console.log(store.user.userStatus);
                    // navigation.navigate("RootNavigator", {
                    // });
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
            >
              点击登录
            </Button>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default LoginPage;
