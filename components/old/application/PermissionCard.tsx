import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Icon } from "@ui-kitten/components";

const styles = StyleSheet.create({
  textBox: {
    paddingBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  subText: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    width: 32,
    height: 32,
  },
  card: {
    padding: 16,
    borderColor: "#efefef",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 16,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    flex: 1,
  },
  cardTextContainer: {
    flex: 1,
    width: "100%",
  },
});

interface PermissionCardProps {
  title: string;
  icon: string;
  iconBackground: string;
  description: string;
  subDescription?: string;
}

const PermissionCard = ({
  title,
  icon,
  iconBackground,
  description,
  subDescription,
}: PermissionCardProps) => {
  return (
    <Layout style={styles.card}>
      <Layout style={styles.cardContent}>
        <Layout
          style={StyleSheet.compose(styles.iconContainer, {
            backgroundColor: iconBackground,
          })}
        >
          <Icon style={styles.icon} name={icon} fill="white"></Icon>
        </Layout>
        <Layout style={styles.cardTextContainer}>
          <Layout style={styles.cardText}>
            <Text
              style={{
                marginBottom: 8,
              }}
              category="h6"
            >
              {title}
            </Text>
            <Text style={styles.text}>{description}</Text>
            {subDescription !== undefined ? (
              <Text style={StyleSheet.compose(styles.text, styles.subText)}>
                {subDescription}
              </Text>
            ) : null}
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PermissionCard;

export type { PermissionCardProps };
