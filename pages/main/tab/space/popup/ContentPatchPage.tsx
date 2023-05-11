import PatchHeader from "@/components/space/content/PatchHeader";
import useContent from "@/libs/hooks/useContent";
import { store } from "@/libs/store";
import type { PopupNavigatorScreenProps } from "@/navigators/main/tab/space/popup";
import { useFocusEffect } from "@react-navigation/native";
import { Input, Layout, Text } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";

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
  input: {
    marginTop: 16,
  },
});

const ContentPatchPage = observer(
  ({
    navigation,
    route,
  }: PopupNavigatorScreenProps<"SpacePatchContentPage">) => {
    const { params } = route;
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const isTitleEmpty = title === "";
    const isContentEmpty = content === "";
    const spaceId = store.space.space.space_id;
    const accessToken = store.user.credential.accessToken;
    const { isValidating, isLoading, mutate } = useContent(
      spaceId,
      accessToken,
      params.contentType,
      params.id
    );
    const loading = isValidating || isLoading;
    const pageTitle = `${params.patchType === "create" ? "新增" : "编辑"}${
      params.contentType === "thread" ? "帖子" : "知识库"
    }"`;
    useFocusEffect(
      React.useCallback(() => {
        mutate()
          .then((value) => {
            if (value === undefined) {
              return;
            }
            setTitle(value.title);
            setContent(value.content);
          })
          .catch((err) => {
            console.error(err);
          });
      }, [])
    );
    return (
      <Layout style={styles.container}>
        <PatchHeader
          loading={loading || isContentEmpty || isTitleEmpty}
          title={title}
          content={content}
          contentType={params.contentType}
          patchType={params.patchType}
          id={params.id}
        />
        <ScrollView style={styles.container}>
          <Layout>
            <Text category="h2" style={styles.title}>
              {pageTitle}
            </Text>
          </Layout>
          <Layout>
            <Input
              value={title}
              onChangeText={setTitle}
              disabled={loading}
              label="名称"
              style={styles.input}
              status={isTitleEmpty ? "danger" : "basic"}
              size="large"
              textStyle={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            />
            <Input
              value={content}
              onChangeText={setContent}
              disabled={loading}
              label="说明"
              multiline
              style={styles.input}
              textStyle={{
                paddingVertical: 4,
                fontSize: 16,
                lineHeight: 24,
              }}
              status={isContentEmpty ? "danger" : "basic"}
            />
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default ContentPatchPage;
