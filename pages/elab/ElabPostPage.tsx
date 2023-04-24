import { observer } from "mobx-react";
import React from "react";

import { Layout, Text } from "@ui-kitten/components";

const ElabPostPage = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">POSTS</Text>
  </Layout>
);

export default observer(ElabPostPage);
