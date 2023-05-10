import React from "react";

import type { FormNavigatorScreenProps } from "@/navigators/application/form";
import {
  Divider,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderCloseAction from "@/components/old/elab/space/HeaderCloseAction";
import { useFocusEffect } from "@react-navigation/native";
import { store } from "@/libs/store";
import ApplicationClient from "@/libs/client/v1/application";
import { observer } from "mobx-react";

const titles = {
  reason: "申请加入理由",
  experience: "您的经历",
  self_evaluation: "自我评价",
};

const descriptions = {
  reason: "您为什么想来科中？",
  experience: "您有什么经历（学生职务、竞赛奖励等）？",
  self_evaluation: "你对自己有什么样的评价？请不要过于简略填写。",
};

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
    marginVertical: 8,
  },
});

const LongTextFormPage = observer(
  ({
    navigation,
    route,
  }: FormNavigatorScreenProps<"ApplicationFormLongTextPage">) => {
    const [value, setValue] = React.useState("");
    const { type } = route.params;
    const title = titles[type];
    const description = descriptions[type];
    const [loading, setLoading] = React.useState(false);
    useFocusEffect(
      React.useCallback(() => {
        console.log(store.user.longTextForm);
        setValue(store.user.longTextForm[type]);
      }, [])
    );
    return (
      <Layout style={styles.root} level="1">
        <TopNavigation
          title={`编辑${title}`}
          subtitle="可以使用Markdown语法"
          alignment="center"
          accessoryLeft={HeaderCloseAction}
          accessoryRight={
            loading ? (
              <TopNavigationAction icon={<Spinner />}></TopNavigationAction>
            ) : (
              <TopNavigationAction
                icon={
                  <View>
                    <Icon name="save-outline" fill="black"></Icon>
                  </View>
                }
                onPress={() => {
                  const client = new ApplicationClient(
                    store.user.credential.accessToken
                  );
                  setLoading(true);
                  client
                    .updateLongTextForm({
                      [type]: value,
                    })
                    .then(async () => {
                      await store.user.fetchExtraInfo();
                    })
                    .then(() => {
                      setLoading(false);
                      navigation.goBack();
                    })
                    .catch(() => {
                      Alert.alert("保存失败", "请检查您的网络连接。");
                    });
                }}
              ></TopNavigationAction>
            )
          }
        />
        <Divider />
        <ScrollView>
          <Layout style={styles.container}>
            <Layout>
              <Text category="h2" style={styles.title}>
                {title}
              </Text>
              <Text>{description}</Text>
            </Layout>
            <Layout style={styles.input}>
              <Input
                multiline
                value={value}
                onChangeText={setValue}
                disabled={loading}
                placeholder="支持使用Markdown语法。您的填写内容将作为考核指标之一。"
                textStyle={{
                  minHeight: 300,
                  fontSize: 16,
                  lineHeight: 24,
                }}
                status={value.length === 0 ? "warning" : "basic"}
                caption={value.length === 0 ? "空白内容将不会更新。" : ""}
              ></Input>
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default LongTextFormPage;
