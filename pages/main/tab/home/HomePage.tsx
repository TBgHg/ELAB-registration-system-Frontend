import React from "react";
import { StyleSheet } from "react-native";
import { Layout, TopNavigation, Text, Divider } from "@ui-kitten/components";
import useTodayWiki from "@/libs/hooks/useTodayWiki";
import { store } from "@/libs/store";
import TodayWiki from "@/components/today/TodayWiki";
import TodayThread from "@/components/today/TodayThread";
import { observer } from "mobx-react";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
});

const HomePage = observer(() => {
  const accessToken = store.user.credential.accessToken;
  const todayWiki = useTodayWiki(accessToken);
  const todayThread = useTodayWiki(accessToken);
  useFocusEffect(
    React.useCallback(() => {
      Promise.all([todayWiki.mutate(), todayThread.mutate()]).catch((err) => {
        console.error(err);
      });
    }, [])
  );
  return (
    <Layout style={styles.root} level="1">
      <TopNavigation title="电气创新实践基地" alignment="center" />
      <Divider />
      <ScrollView style={styles.container}>
        <Layout>
          <Text style={styles.title} category="h2">
            欢迎你，
            <Text status="primary" category="h2">
              {store.user.user.name}
            </Text>
            ！
          </Text>
        </Layout>
        <Layout>
          <Layout>
            {todayWiki.data !== undefined ? (
              <TodayWiki wiki={todayWiki.data} />
            ) : null}
          </Layout>
          <Layout>
            {todayThread.data !== undefined ? (
              <TodayThread thread={todayThread.data} />
            ) : null}
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
});

export default HomePage;
