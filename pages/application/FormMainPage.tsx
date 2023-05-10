import {
  Layout,
  TopNavigation,
  Text,
  Icon,
  TopNavigationAction,
  Spinner,
  Button,
  Divider,
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
import type { LongTextForm } from "@/types/application";

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
  buttonGroup: {
    borderColor: "#E4E9F2",
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  button: {
    marginVertical: 8,
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

const checkLongTextFormLength = (longTextForm: LongTextForm) => {
  // 只需获取所有value即可。
  console.log(longTextForm);
  const values = Object.values(longTextForm);
  for (const value of values) {
    if (value.length === 0) {
      return false;
    }
  }
  return true;
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
    const [loading, setLoading] = React.useState(false);
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
          setLoading(true);
          const userClient = new UserClient(store.user.credential.accessToken);
          const fetchedUser = await userClient.fetchUser(
            store.user.user.openid,
            true
          );
          // 遍历，如果当中有undefined用""替代。
          setUser({
            name: fetchedUser.name,
            class_name: fetchedUser.class_name,
            group: fetchedUser.group,
            contact: fetchedUser.contact,
            student_id: fetchedUser.student_id,
          });
          setLoading(false);
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
            loading ? (
              <TopNavigationAction icon={<Spinner />} />
            ) : (
              <TopNavigationAction
                icon={
                  <View>
                    <Icon name="save-outline" fill="black" />
                  </View>
                }
                onPress={() => {
                  if (
                    !checkLength(length) ||
                    !checkLongTextFormLength(store.user.longTextForm)
                  ) {
                    Alert.alert("请检查您的表单是否填写完整。");
                    return;
                  }
                  setLoading(true);
                  handleUserForm(user)
                    .then(async () => {
                      await store.user.fetchExtraInfo();
                    })
                    .then(() => {
                      setLoading(false);
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
        <Divider />
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
            <Form value={user} setValue={setUser} loading={loading} />
            <Layout style={styles.buttonGroup}>
              <Button
                style={styles.button}
                onPress={() => {
                  navigation.navigate("ApplicationFormLongTextPage", {
                    type: "reason",
                  });

                  handleUserForm(user).catch(() => {
                    Alert.alert("保存失败，请检查您的网络连接。");
                  });
                }}
              >
                编辑申请加入理由
              </Button>
              <Button
                style={styles.button}
                onPress={() => {
                  navigation.navigate("ApplicationFormLongTextPage", {
                    type: "experience",
                  });
                  handleUserForm(user).catch(() => {
                    Alert.alert("保存失败，请检查您的网络连接。");
                  });
                }}
              >
                编辑个人经历
              </Button>
              <Button
                style={styles.button}
                onPress={() => {
                  navigation.navigate("ApplicationFormLongTextPage", {
                    type: "self_evaluation",
                  });
                  handleUserForm(user).catch(() => {
                    Alert.alert("保存失败，请检查您的网络连接。");
                  });
                }}
              >
                编辑自我评价
              </Button>
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default FormMainPage;
