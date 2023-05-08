import React from "react";
import { Layout, Icon, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderColor: "#efefef",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

const iconStyles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

const textStyles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  sub: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
  title: {
    marginBottom: 8,
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
    <Layout style={styles.root}>
      <Layout style={styles.container}>
        <Layout
          style={StyleSheet.compose(iconStyles.container, {
            backgroundColor: iconBackground,
          })}
        >
          <Icon style={iconStyles.icon} name={icon} fill="white"></Icon>
        </Layout>
        <Layout style={textStyles.container}>
          <Text
            style={StyleSheet.compose(textStyles.text, textStyles.title)}
            category="h6"
          >
            {title}
          </Text>
          <Text style={textStyles.text}>{description}</Text>
          {subDescription !== undefined ? (
            <Text style={StyleSheet.compose(textStyles.text, textStyles.sub)}>
              {subDescription}
            </Text>
          ) : null}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PermissionCard;
export type { PermissionCardProps };
