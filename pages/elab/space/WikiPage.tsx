import { observer } from "mobx-react";
import React from "react";

import { Avatar, Layout, Text, TopNavigation } from "@ui-kitten/components";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SpaceNavigatorParamList } from "./SpaceNavigator";
import marked from "marked";
import { spaceStore } from "../../../lib/store";
import { Alert, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import RenderHTML from "react-native-render-html";

type WikiPageProps = NativeStackScreenProps<
  SpaceNavigatorParamList,
  "WikiPage"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  author: {
    flex: 1,
    flexDirection: "row",
  },
});

const WikiPage = observer(({ navigation, route }: WikiPageProps) => {
  const { id } = route.params;
  // 首先判断id是否存在于spaceStore.wikis，如果不存在，那么返回
  // 如果存在，那么就渲染
  const wiki = spaceStore.wikis.find((wiki) => wiki.id === id);
  const { width } = Dimensions.get("window");
  const [compiledContent, setCompiledContent] = React.useState("");
  if (wiki === undefined) {
    Alert.alert("错误", "该页面不存在");
    navigation.goBack();
    return null;
  }
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title: wiki.title,
      });
      spaceStore.setCurrentPage("wiki");
      spaceStore.setCanGoBack(true);
      setCompiledContent(marked.marked(wiki.content));
    }, [])
  );
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Text category="h1">{wiki.title}</Text>
        <Layout style={styles.author}>
          <Text>由</Text>
          <Avatar
            source={{ uri: wiki.lastModifiedUser.avatar }}
            size="tiny"
            style={{ marginHorizontal: 4 }}
          />
          <Text style={{ fontWeight: "bold" }}>
            {wiki.lastModifiedUser.name}
          </Text>
          <Text>最后于{wiki.lastModifiedTime.toLocaleDateString()}修改</Text>
        </Layout>
        <RenderHTML source={{ html: compiledContent }} contentWidth={width} />
      </ScrollView>
    </Layout>
  );
});

export default WikiPage;
