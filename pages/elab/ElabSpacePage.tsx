import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { observer } from "mobx-react";

const ElabSpacePage = observer(() => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">SPACES</Text>
  </Layout>
));

export default ElabSpacePage;
