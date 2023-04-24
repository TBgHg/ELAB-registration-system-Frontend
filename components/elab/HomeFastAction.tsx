import { useNavigation } from "@react-navigation/native";
import { ButtonGroup, Button, Layout, Text, Icon } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
});

const fastActions: Array<{
  title: string;
  targetNavigationScreen: string;
  icon: string;
}> = [
  {
    title: "我的通知",
    targetNavigationScreen: "NotificationPage",
    icon: "bell-outline",
  },
  {
    title: "我的收藏",
    targetNavigationScreen: "FavouritePage",
    icon: "heart-outline",
  },
];

const HomeFastAction = () => {
  const navigation = useNavigation();
  return (
    <Layout
      style={{
        marginVertical: 4,
      }}
    >
      <ButtonGroup
        appearance="ghost"
        size="large"
        style={{
          flex: 1,
        }}
      >
        {fastActions.map((action, index) => {
          return (
            <Button
              key={index}
              style={styles.button}
              size="giant"
              accessoryLeft={(props) => (
                <View>
                  <Icon color="#3366FF" name={action.icon} {...props} />
                </View>
              )}
              onPress={() => {
                navigation.navigate("SpaceNavigator", {
                  screen: action.targetNavigationScreen,
                  params: {
                    type: "notification",
                  },
                });
              }}
            >
              {action.title}
            </Button>
          );
        })}
      </ButtonGroup>
    </Layout>
  );
};

export default HomeFastAction;
