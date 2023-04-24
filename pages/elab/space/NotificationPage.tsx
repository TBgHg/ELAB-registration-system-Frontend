import { observer } from "mobx-react";
import React from "react";

import { StyleSheet } from "react-native";
import {
  Layout,
  Button,
  List,
  ListItem,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import HeaderCloseAction from "../../../components/elab/space/HeaderCloseAction";
import { spaceStore } from "../../../lib/store";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const NotificationPage = observer(() => {
  // Layout -> ScrollView -> Layout -> List -> ListItem
  // 使用spaceStore.notifications
  return (
    <Layout style={styles.container}>
      <TopNavigation
        title="通知"
        subtitle={`${spaceStore.notifications.length.toString()}条消息`}
        alignment="center"
        accessoryLeft={HeaderCloseAction}
      ></TopNavigation>
      <ScrollView>
        <Layout
          style={{
            padding: 16,
          }}
        >
          <Text category="h1">通知</Text>
        </Layout>
        <List
          data={spaceStore.notifications}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                style={{
                  padding: 16,
                }}
                title={item.title}
                description={`${item.content}`}
                accessoryRight={(props) => {
                  return (
                    <Button
                      appearance="outline"
                      size="small"
                      status="danger"
                      onPress={() => {
                        spaceStore.removeNotifications(item.id);
                      }}
                    >
                      删除
                    </Button>
                  );
                }}
              ></ListItem>
            );
          }}
        ></List>
      </ScrollView>
    </Layout>
  );
});

export default NotificationPage;
