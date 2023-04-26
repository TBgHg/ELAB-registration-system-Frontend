import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { elabStore } from "../../lib/store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    borderRadius: 16,
    borderColor: "#F0F0F0",
    borderWidth: 1,
    marginVertical: 8,
  },
  title: {
    paddingVertical: 8,
  },
  remindCardContainer: {
    paddingVertical: 8,
  },
});

const RemindCardList = () => {
  return (
    <Layout style={styles.remindCardContainer}>
      {elabStore.remindCards.map((card, index) => (
        <Layout
          key={index}
          style={StyleSheet.compose(
            {
              backgroundColor: card.content.backgroundColor,
            },
            styles.container
          )}
        >
          <Text
            category="s1"
            style={{
              color: card.content.textColor,
            }}
          >
            {card.content.title}
          </Text>
          <Layout
            style={{
              flex: 1,
              backgroundColor: card.content.backgroundColor,
            }}
          >
            <Text
              category="h4"
              style={{
                marginVertical: 8,
                color: card.content.textColor,
              }}
            >
              {card.content.prompt}
            </Text>
            <Text
              style={{
                color: card.content.textColor,
              }}
            >
              {card.content.description}
            </Text>
          </Layout>
        </Layout>
      ))}
    </Layout>
  );
};

export default RemindCardList;
