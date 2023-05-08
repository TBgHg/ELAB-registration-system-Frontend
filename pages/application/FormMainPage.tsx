import {
  Layout,
  TopNavigation,
  Text,
  Icon,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";
import NavigationBackAction from "@/components/application/NavigationBackAction";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import React from "react";
import type { FormNavigatorScreenProps } from "@/navigators/application/form";
import type { Group, User } from "@/types/user";
import Form from "@/components/application/form/Form";
import NavigationCloseAction from "@/components/application/NavigationCloseAction";
import { observer } from "mobx-react";
import { store } from "@/libs/store";
import UserClient from "@/libs/client/v1/user";
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
  description: {
    marginBottom: 16,
  },
});

const checkLength = (length: {
  name: number;
  class_name: number;
  group: number;
  contact: number;
  student_id: number;
}) => {
  return (
    length.name > 0 &&
    length.class_name > 0 &&
    length.contact === 11 &&
    length.student_id === 11
  );
};

const handleUserForm = async (
  form: Omit<User, "openid" | "is_elab_member" | "meta" | "email">
) => {
  const email = store.user.userInfo.email;
  const userClient = new UserClient(store.user.credential.accessToken);
  await userClient.updateUser(store.user.user.openid, {
    ...form,
    email,
  });
};

const FormMainPage = observer(
  ({
    route,
    navigation,
  }: FormNavigatorScreenProps<"ApplicationFormMainPage">) => {
    const [user, setUser] = React.useState({
      name: "",
      class_name: "",
      group: "" as Group,
      contact: "",
      student_id: "",
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const preview = route.params.preview !== undefined && route.params.preview;
    const [length, setLength] = React.useState({
      name: 0,
      class_name: 0,
      group: 0,
      contact: 0,
      student_id: 0,
    });
    useFocusEffect(
      React.useCallback(() => {
        const fetchUser = async () => {
          const userClient = new UserClient(store.user.credential.accessToken);
          const user = await userClient.fetchUser(store.user.user.openid);
          setUser({
            name: user.name,
            class_name: user.class_name,
            group: user.group,
            contact: user.contact,
            student_id: user.student_id,
          });
        };
        fetchUser().catch((e) => {
          console.error(e);
        });
      }, [])
    );
    React.useEffect(() => {
      setLength({
        name: user.name.length,
        class_name: user.class_name.length,
        group: user.group.length,
        contact: user.contact.length,
        student_id: user.student_id.length,
      });
    }, [user]);
    return (
      <Layout level="1" style={styles.root}>
        <TopNavigation
          title="科中加入申请"
          subtitle={preview ? "预览个人信息" : "填写个人信息"}
          alignment="center"
          accessoryLeft={
            preview ? <NavigationCloseAction /> : <NavigationBackAction />
          }
          accessoryRight={
            isSubmitting ? (
              <TopNavigationAction icon={<Spinner />} />
            ) : (
              <TopNavigationAction
                icon={
                  <View>
                    <Icon name="save-outline" fill="black" />
                  </View>
                }
                onPress={() => {
                  if (!checkLength(length)) {
                    Alert.alert("请检查您的表单是否填写完整。");
                    return;
                  }
                  setIsSubmitting(true);
                  handleUserForm(user)
                    .then(async () => {
                      await store.user.fetchExtraInfo();
                    })
                    .then(() => {
                      setIsSubmitting(false);
                      navigation.push("ApplicationSeatSelectionPage");
                    })
                    .catch(() => {
                      Alert.alert("保存失败，请检查您的网络连接。");
                    });
                }}
              />
            )
          }
        />
        <ScrollView>
          <Layout style={styles.container}>
            <Layout>
              <Text category="h2" style={styles.title}>
                {preview ? "您的表单预览" : "现在，请填写表单。"}
              </Text>
              <Text style={styles.description}>
                {preview
                  ? "这是您填写的表单内容。"
                  : "填写完成后，请点击右上角的保存按钮。"}
              </Text>
            </Layout>
            <Form value={user} setValue={setUser} />
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default FormMainPage;
