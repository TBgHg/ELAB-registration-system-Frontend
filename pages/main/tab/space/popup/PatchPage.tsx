import type { PopupNavigatorScreenProps } from "@/navigators/main/tab/space/popup";
import {
  Divider,
  Layout,
  TopNavigation,
  Text,
  Input,
  TopNavigationAction,
  Icon,
  Toggle,
} from "@ui-kitten/components";
import React from "react";
import useSWR from "swr";
import { Alert, StyleSheet, View } from "react-native";
import { store } from "@/libs/store";
import SpaceClient from "@/libs/client/v1/space/space";
import NavigationCloseAction from "@/components/NavigationCloseAction";
import { useFocusEffect } from "@react-navigation/native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginTop: 16,
  },
  form: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

const PatchPage = ({
  navigation,
  route,
}: PopupNavigatorScreenProps<"SpacePatchPage">) => {
  const { params } = route;
  const { data, isLoading, isValidating, mutate } = useSWR(
    [params.id, store.user.credential.accessToken, "space"],
    async ([spaceId, accessToken, type]) => {
      if (spaceId === undefined) {
        return undefined;
      }
      const client = new SpaceClient(accessToken);
      const space = await client.fetchSpace(spaceId);
      return space;
    }
  );
  const disabled = isLoading || isValidating;
  const [value, setValue] = React.useState({
    name: "",
    description: "",
    private: false,
  });
  useFocusEffect(
    React.useCallback(() => {
      const fetchSpace = async () => {
        const data = await mutate();
        if (data === undefined) {
          setValue({
            name: "",
            description: "",
            private: false,
          });
          return;
        }
        setValue({
          name: data.name,
          description: data.description,
          private: data.private,
        });
      };
      fetchSpace().catch((err) => {
        console.error(err);
      });
    }, [])
  );
  const isNameEmpty = value.name.length === 0;
  const isDescriptionEmpty = value.description.length === 0;
  const createAction = async () => {
    const client = new SpaceClient(store.user.credential.accessToken);
    await client.create(value.name, value.description, value.private);
    navigation.goBack();
  };
  const patchAction = async () => {
    const client = new SpaceClient(store.user.credential.accessToken);
    await client.update(params.id as string, value);
    navigation.goBack();
  };
  const alertAction = async () => {
    Alert.alert("内容为空", "请将内容填写完整。");
  };
  return (
    <Layout style={styles.root} level="1">
      <TopNavigation
        title={params.type === "add" ? "创建空间" : "编辑空间"}
        subtitle={data === undefined ? "" : data.name}
        alignment="center"
        accessoryLeft={NavigationCloseAction}
        accessoryRight={
          <TopNavigationAction
            icon={
              <View>
                <Icon name="save-outline" fill="black" />
              </View>
            }
            disabled={disabled}
            onPress={() => {
              if (isNameEmpty || isDescriptionEmpty) {
                alertAction().catch((err) => {
                  console.error(err);
                });
                return;
              }
              switch (params.type) {
                case "add":
                  createAction().catch((err) => {
                    console.error(err);
                    Alert.alert("请求失败", "请检查您的网络连接。");
                  });
                  break;
                case "edit":
                  patchAction().catch((err) => {
                    console.error(err);
                    Alert.alert("请求失败", "请检查您的网络连接。");
                  });
                  break;
              }
            }}
          />
        }
      />
      <Divider />
      <Layout style={styles.container}>
        <Text category="h2">
          {params.type === "add" ? "创建空间" : "编辑空间"}
        </Text>
        <Layout style={styles.form}>
          <Input
            value={value.name}
            onChangeText={(name) => {
              setValue({
                ...value,
                name,
              });
            }}
            disabled={disabled}
            label="名称"
            style={styles.input}
            status={isNameEmpty ? "danger" : "basic"}
            size="large"
            textStyle={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          />
          <Input
            value={value.description}
            onChangeText={(description) => {
              setValue({
                ...value,
                description,
              });
            }}
            disabled={disabled}
            label="说明"
            multiline
            style={styles.input}
            textStyle={{
              paddingVertical: 4,
              fontSize: 16,
              lineHeight: 24,
            }}
            status={isDescriptionEmpty ? "danger" : "basic"}
          />
          <Toggle
            checked={!value.private}
            onChange={(isChecked) => {
              setValue({
                ...value,
                private: !isChecked,
              });
            }}
            style={styles.input}
          >
            {value.private ? "非公开空间" : "公开空间"}
          </Toggle>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PatchPage;
