import React from "react";
import { observer } from "mobx-react-lite";
import { Button, Layout, Text } from "@ui-kitten/components";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { ElabNavigatorParamList } from "./ElabNavigator";

type ElabHomePageProps = BottomTabScreenProps<
  ElabNavigatorParamList,
  "ElabHomePage"
>;

const ElabHomePage = ({ navigation }: ElabHomePageProps) => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">七域与你</Text>
      <Text category="h1">点亮现在每一刻。</Text>
      <Button
        onPress={() => {
          navigation.navigate("LoginPage");
        }}
      >
        Navigate
      </Button>
    </Layout>
  );
};

export default observer(ElabHomePage);
