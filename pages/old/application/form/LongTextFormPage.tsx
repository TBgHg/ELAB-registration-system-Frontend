import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFocusEffect } from "@react-navigation/native";
import {
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

import { titleAlignment } from "../../../../components/old/application/ApplicationHeader";
import { applicationStore } from "../../../../lib/store";
import { getLongTextTranslate } from "../../../../lib/store/ApplicationStore";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ApplicationFormNavigatorParamList } from "./FormNavigator";
type ApplicationLongTextFormPageProps = NativeStackScreenProps<
  ApplicationFormNavigatorParamList,
  "ApplicationLongTextFormPage"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    paddingBottom: 16,
  },
});

const ApplicationLongTextFormPage = observer(
  ({ navigation, route }: ApplicationLongTextFormPageProps) => {
    const { key } = route.params;
    const [longText, setLongText] = React.useState("");
    useFocusEffect(
      React.useCallback(() => {
        setLongText(applicationStore.form.longText[key] as string);
        return () => {
          applicationStore.saveForm();
        };
      }, [])
    );
    React.useEffect(() => {
      const query = {};
      query[key] = longText;
      applicationStore.setLongText(query);
    }, [longText]);
    const { title, description } = getLongTextTranslate(key);
    return (
      <Layout level="1" style={{ flex: 1 }}>
        <TopNavigation
          title={`修改${title}`}
          subtitle="可使用Markdown"
          alignment={titleAlignment}
          accessoryRight={
            <TopNavigationAction
              icon={
                <View>
                  <Icon name="checkmark-outline" fill="black" />
                </View>
              }
              onPress={() => {
                navigation.goBack();
              }}
            />
          }
        />
        <ScrollView>
          <Layout style={styles.container}>
            <Layout>
              <Text category="h2" style={styles.title}>
                {title}
              </Text>
              <Text category="h6">{description}</Text>
            </Layout>
            <Layout>
              <Input
                multiline={true}
                placeholder="您可以在这里输入多行文字，支持Markdown语法。"
                textStyle={{
                  minHeight: 300,
                }}
                style={{
                  marginVertical: 24,
                }}
                value={longText}
                onChangeText={setLongText}
              />
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
);

export default ApplicationLongTextFormPage;
