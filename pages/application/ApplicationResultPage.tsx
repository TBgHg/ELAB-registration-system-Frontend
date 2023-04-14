import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { observer } from "mobx-react";

const ApplicationResultPage = observer(() => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">CODE</Text>
    </Layout>
  );
});

export default ApplicationResultPage;
