import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  TopNavigation,
  Text,
  Input,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import HeaderCloseAction from "../../../components/elab/space/HeaderCloseAction";
import { spaceStore } from "../../../lib/store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 16,
  },
});

const CreatePostPage = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const navigation = useNavigation();
  return (
    <Layout style={styles.container}>
      <TopNavigation
        title="新建帖子"
        alignment="center"
        accessoryLeft={HeaderCloseAction}
        accessoryRight={() => {
          return (
            <TopNavigationAction
              icon={
                <View>
                  <Icon fill="black" name="save-outline" />
                </View>
              }
              onPress={() => {
                spaceStore.createPost(
                  spaceStore.currentSpaceId,
                  title,
                  description
                );
                navigation.goBack();
              }}
            />
          );
        }}
      />
      <Layout style={styles.subContainer}>
        <Text category="h2">新建帖子</Text>
      </Layout>
      <Layout style={[styles.subContainer]}>
        <Input value={title} onChangeText={setTitle} label="帖子标题"></Input>
        <Input
          multiline={true}
          label="内容"
          placeholder="您可以在这里输入多行文字，支持Markdown语法。"
          textStyle={{
            minHeight: 300,
          }}
          style={{
            marginTop: 24,
          }}
          value={description}
          onChangeText={setDescription}
        />
      </Layout>
    </Layout>
  );
};

export default CreatePostPage;
