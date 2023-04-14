import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import type { RootNavigationParamList } from "../RootNavigatior";
// import { useAutoDiscovery } from "expo-auth-session";
// import { useEffectOnce } from "usehooks-ts";

type LoginPageProps = NativeStackScreenProps<
  RootNavigationParamList,
  "LoginPage"
>;

const LoginPage = (props: LoginPageProps) => {
  // const discoveryDocument = useAutoDiscovery("https://auth.zeithrold.com");
  // useEffectOnce(() => {
  //   console.log(discoveryDocument);
  // });
  return (
    <View>
      <Text>让我们来帮你登陆吧。</Text>
    </View>
  );
};

export default LoginPage;

export type { LoginPageProps };
