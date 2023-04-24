import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { elabStore } from "../../lib/store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    borderRadius: 16,
    borderColor: "#3366FF",
    borderWidth: 4,
    marginVertical: 8,
  },
  title: {
    paddingVertical: 8,
  },

  imageContainer: {
    flex: 1,
    maxWidth: 72,
    maxHeight: 72,
  },
  image: {
    flex: 1,
    width: "100%",
  },
});

const TodayWikiCard = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("SpaceNavigator", {
          screen: "WikiPage",
          params: elabStore.todayWiki.navigation.param,
          initial: false,
        });
      }}
    >
      <Layout style={styles.container}>
        <Text category="s1" status="primary">
          今天的知识
        </Text>
        <Layout
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Layout
            style={{
              flex: 1,
            }}
          >
            <Text
              category="h4"
              style={{
                marginVertical: 8,
              }}
              status="primary"
            >
              {elabStore.todayWiki.title}
            </Text>
            <Text>{elabStore.todayWiki.description}</Text>
          </Layout>
          <Layout style={styles.imageContainer}>
            <Image
              source={require("../../assets/wiki/favicon-gopher.png")}
              style={styles.image}
            />
          </Layout>
        </Layout>
      </Layout>
    </Pressable>
  );
};

export default TodayWikiCard;
