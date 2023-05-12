import {
  Avatar,
  Layout,
  TopNavigation,
  Text,
  Icon,
  TopNavigationAction,
} from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as Crypto from "expo-crypto";
import { store } from "@/libs/store";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  user: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    marginTop: 16,
  },
});

const ProfilePage = observer(() => {
  const [hash, setHash] = React.useState("");
  React.useEffect(() => {
    const fetchHash = async () => {
      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.MD5,
        store.user.user.email
      );
      setHash(hash);
    };
    fetchHash().catch((err) => {
      console.error(err);
    });
  }, [store.user.user.email]);
  return (
    <Layout style={styles.root} level="1">
      <TopNavigation
        title="我"
        alignment="center"
        accessoryLeft={
          <TopNavigationAction
            icon={
              <View>
                <Icon name="log-out-outline" fill="black"></Icon>
              </View>
            }
            onPress={() => {
              Alert.alert("确定要登出吗？", "您仍可重新登录。", [
                {
                  text: "取消",
                  style: "cancel",
                },
                {
                  text: "登出",
                  style: "destructive",
                  onPress: () => {
                    store.user.clearUserData();
                  },
                },
              ]);
            }}
          />
        }
      />
      <Layout style={styles.user}>
        <Avatar
          size="giant"
          source={{
            uri: `https://gravatar.loli.net/avatar/${hash}`,
          }}
        />
        <Text style={styles.username} category="h5">
          {store.user.user.name}
        </Text>
      </Layout>
    </Layout>
  );
});

export default ProfilePage;
