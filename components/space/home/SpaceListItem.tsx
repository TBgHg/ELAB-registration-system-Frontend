import React from "react";
import { Layout, ListItem, Text } from "@ui-kitten/components";
import type { Space } from "@/types/space";
import { StyleSheet, Alert } from "react-native";
import { observer } from "mobx-react";
import { store } from "@/libs/store";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: "column",
  },
  tag: {
    backgroundColor: "#E4E9F2",
    borderRadius: 8,
    padding: 4,
  },
});

interface SpaceListItemProps {
  space: Space;
}

const SpaceListItem = observer(({ space }: SpaceListItemProps) => {
  const navigation = useNavigation();
  return (
    <ListItem
      title={
        <Layout style={styles.title}>
          <Text category="h6" style={{ flex: 1 }}>
            {space.name}
          </Text>
          {space.private ? (
            <Layout
              style={{
                flex: 1,
                flexDirection: "row",
                paddingVertical: 4,
              }}
            >
              <Layout style={styles.tag}>
                <Text category="c1" appearance="hint">
                  未公开空间
                </Text>
              </Layout>
            </Layout>
          ) : null}
        </Layout>
      }
      style={{
        flex: 1,
      }}
      description={
        <Layout>
          <Text category="c1" appearance="hint">
            {space.description}
          </Text>
        </Layout>
      }
      onPress={() => {
        store.space
          .setSpaceId(space.space_id)
          .then(() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
            navigation.navigate("SpacePage");
          })
          .catch((err) => {
            console.error(err);
            Alert.alert("网络请求失败", "请检查您的网络连接。");
          });
      }}
    />
  );
});

export default SpaceListItem;
