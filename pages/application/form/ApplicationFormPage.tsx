import React from "react";
import {
  Layout,
  Text,
  Button,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";
import { observer } from "mobx-react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ApplicationFormNavigatorParamList } from "./ApplicationFormNavigator";
import {
  ApplicationHeader,
  NavigationBackAction,
} from "../../../components/application";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NameInput } from "../../../components/application/form";
import StudentIdInput from "../../../components/application/form/StudentIdInput";
import DepartmentInput from "../../../components/application/form/DepartmentInput";
import ContactInput from "../../../components/application/form/ContactInput";
import { applicationStore } from "../../../lib/store";
import { useFocusEffect } from "@react-navigation/native";
import type ApplicationStore from "../../../lib/store/ApplicationStore";
import { getLongTextTranslate } from "../../../lib/store/ApplicationStore";
import GroupInput from "../../../components/application/form/GroupInput";

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
    const [group, setGroup] = React.useState<"电子组" | "软件组" | "助课组">(
      "电子组"
    );
    useFocusEffect(
      React.useCallback(() => {
        setName(applicationStore.form.name);
        setStudentId(applicationStore.form.studentId);
        setDepartment(applicationStore.form.department);
        setContact(applicationStore.form.contact);
        setGroup(applicationStore.form.group);
        return () => {};
      }, [])
    );
    React.useEffect(() => {
      applicationStore.setForm({ name, studentId, department, contact, group });
    }, [name, studentId, department, contact]);
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
                  navigation.navigate("ApplicationSeatSelectionPage");
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
