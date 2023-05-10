import React from "react";

import * as PKCE from "expo-auth-session/build/PKCE";
import { Alert, Platform, ScrollView, StyleSheet } from "react-native";

import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from "@ui-kitten/components";

import { store } from "@/libs/store";

import * as AuthSession from "expo-auth-session";
import * as Linking from "expo-linking";
import { apiEndpoint, oidcClientId, oidcDiscovery } from "@/constants/index";
import createAuthSession from "@/libs/auth/createSession";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

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
  description: {
    paddingBottom: 18,
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
  discovery: AuthSession.DiscoveryDocument;
  redirectUri: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const loginButtonOnPress = async ({
  discovery,
  redirectUri,
  setLoading,
}: LoginButtonOnPress) => {
  const oidcRedirectUri = apiEndpoint + "/auth/callback";
  const request = new AuthSession.AuthRequest({
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
  store.user.setState(request.state);
  setLoading(false);
  const result = await request.promptAsync(discovery);
  if (result.type === "success" && result.authentication != null) {
    store.user.setCredential({
      accessToken: result.authentication.accessToken,
      refreshToken: result.authentication.refreshToken as string,
    });
  }
};

const LoginPage = () => {
  const codeHandler = React.useCallback((event: Linking.EventType) => {
    const { url } = event;
    const parsedUrl = Linking.parse(url);
    if (
      parsedUrl.path === "auth/callback" &&
      parsedUrl.queryParams?.state === store.user.state
    ) {
      // 登陆成功！
      store.user.setCredential({
        accessToken: parsedUrl.queryParams.access_token as string,
        refreshToken: parsedUrl.queryParams.refresh_token as string,
      });
    }
  }, []);
  React.useEffect(() => {
    console.log(store.user.userInfo);
    console.log(store.user.user);
  }, [store.user.userInfo, store.user.user]);
  React.useEffect(() => {
    if (Platform.OS === "android") {
      Linking.addEventListener("url", codeHandler);
    }
    return () => {};
  }, [codeHandler]);
  // discovery 可能为空值，需要进行判定
  const discovery = AuthSession.useAutoDiscovery(oidcDiscovery);
  const redirectUri = AuthSession.makeRedirectUri({
    path: "/auth/callback",
  });
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
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
            <Text style={styles.description}>
              OneELAB需要登陆。请点击下面的按钮以进行登录。
            </Text>
          </Layout>
          <Button
            disabled={discovery == null || loading}
            size="giant"
            onPress={() => {
              setLoading(true);
              loginButtonOnPress({
                discovery: discovery as AuthSession.DiscoveryDocument,
                redirectUri,
                setLoading,
              }).catch((err) => {
                console.error(err);
              });
            }}
          >
            {discovery == null || loading ? "正在加载..." : "点击登录"}
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
export default observer(LoginPage);
