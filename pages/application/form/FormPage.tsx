import { observer } from "mobx-react";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFocusEffect } from "@react-navigation/native";
import {
  Button,
  Icon,
  Layout,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";

import {
  ApplicationHeader,
  NavigationBackAction,
} from "../../../components/application";
import { NameInput } from "../../../components/application/form";
import ContactInput from "../../../components/application/form/ContactInput";
import DepartmentInput from "../../../components/application/form/DepartmentInput";
import GroupInput from "../../../components/application/form/GroupInput";
import StudentIdInput from "../../../components/application/form/StudentIdInput";
import { applicationStore } from "../../../lib/store";
import {
  getLongTextTranslate,
  type Group,
} from "../../../lib/store/ApplicationStore";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ApplicationFormNavigatorParamList } from "./FormNavigator";
import type ApplicationStore from "../../../lib/store/ApplicationStore";
type ApplicationFormPageProps = NativeStackScreenProps<
  ApplicationFormNavigatorParamList,
  "ApplicationFormPage"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

const ApplicationFormPage = observer(
  ({ navigation }: ApplicationFormPageProps) => {
    const [name, setName] = React.useState("");
    const [studentId, setStudentId] = React.useState("");
    const [department, setDepartment] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [group, setGroup] = React.useState<"电子组" | "软件组">("电子组");
    useFocusEffect(
      React.useCallback(() => {
        setName(applicationStore.form.name as string);
        setStudentId(applicationStore.form.studentId as string);
        setDepartment(applicationStore.form.department as string);
        setContact(applicationStore.form.contact as string);
        setGroup(applicationStore.form.group as Group);
        return () => {};
      }, [])
    );
    React.useEffect(() => {
      applicationStore.setForm({ name, studentId, department, contact, group });
    }, [name, studentId, department, contact, group]);
    return (
      <Layout level="1" style={{ flex: 1 }}>
        <ApplicationHeader
          accessoryLeft={NavigationBackAction}
          accessoryRight={
            <TopNavigationAction
              icon={
                <View>
                  <Icon name="save-outline" fill="black" />
                </View>
              }
              onPress={() => {
                if (applicationStore.isFormValid) {
                  applicationStore.setStatus("submitted");
                  applicationStore.saveStatus();
                } else {
                  Alert.alert("表单不完整", "请填写完整表单后再提交。");
                }
              }}
            />
          }
          navigation={navigation}
        />
        <ScrollView>
          <Layout style={styles.container}>
            <Text category="h2" style={{ marginBottom: 8 }}>
              现在，请填写表单。
            </Text>
            <Text style={{ marginBottom: 8 }}>
              填写完成后，请点击右上角的保存按钮。
            </Text>
            <NameInput value={name} onChangeText={setName} />
            <StudentIdInput value={studentId} onChangeText={setStudentId} />
            <DepartmentInput value={department} onChangeText={setDepartment} />
            <ContactInput value={contact} onChangeText={setContact} />
            <GroupInput value={group} onChangeText={setGroup} />
            <Layout
              style={{
                marginVertical: 8,
              }}
            >
              {["reason", "experience", "selfEvaluation"].map(
                (key: keyof ApplicationStore["form"]["longText"]) => (
                  <Button
                    key={key}
                    onPress={() => {
                      applicationStore.saveForm();
                      navigation.navigate("ApplicationLongTextFormPage", {
                        key,
                      });
                    }}
                    style={{ marginVertical: 8 }}
                  >
                    {"点击填写 " + getLongTextTranslate(key).title}
                  </Button>
                )
              )}
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default ApplicationFormPage;
