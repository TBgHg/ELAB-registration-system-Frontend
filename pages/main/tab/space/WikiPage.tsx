import Markdown from "@/components/space/content/Markdown";
import WikiHeader from "@/components/space/content/WikiHeader";
import useWiki from "@/libs/hooks/useWiki";
import { store } from "@/libs/store";
import type { SpaceNavigatorScreenProps } from "@/navigators/main/tab/space";
import { Layout, Spinner } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  spinner: {
    flex: 1,
    paddingVertical: 8,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

const WikiPage = observer(
  ({ navigation, route }: SpaceNavigatorScreenProps<"SpaceWikiPage">) => {
    const wikiId = route.params.id;
    const spaceId = store.space.space.space_id;
    const accessToken = store.user.credential.accessToken;
    const { data, isLoading, isValidating } = useWiki(
      spaceId,
      accessToken,
      wikiId
    );
    return (
      <Layout style={styles.root}>
        <WikiHeader content={data} />
        <ScrollView style={styles.container}>
          {isLoading || isValidating || data === undefined ? (
            <Spinner />
          ) : (
            <Markdown content={data.content} />
          )}
        </ScrollView>
      </Layout>
    );
  }
);

export default WikiPage;
