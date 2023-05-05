import React from "react";
import { Button, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as PKCE from "expo-auth-session/build/PKCE";
import * as Crypto from "expo-crypto";
import createAuthSession from "@/libs/auth/createSession";

const TestOAuth = () => {
  const discovery = AuthSession.useAutoDiscovery("https://auth.zeithrold.com");
  const redirectUri = AuthSession.makeRedirectUri();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Test OAuth"
        onPress={() => {
          const request = new AuthSession.AuthRequest({
            redirectUri:
              "https://elab-internal.zeithrold.cloud/v1/auth/callback",
            clientId: "ac7e6090893a6233072a",
          });
          PKCE.buildCodeAsync()
            .then(async ({ codeChallenge, codeVerifier }) => {
              request.codeChallenge = codeChallenge;
              request.codeVerifier = codeVerifier;
              return await createAuthSession({
                redirect_uri: redirectUri,
                code_verifier: request.codeVerifier,
                state: request.state,
              });
            })
            .then(async ({ ok }) => {
              return await request.promptAsync(
                discovery as AuthSession.DiscoveryDocument
              );
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error(err);
            });
          // PKCE.buildCodeAsync()
          //   .then({ codeChallenge, codeVerifier }) => {

          //   })
        }}
      />
    </View>
  );
};

export default TestOAuth;
