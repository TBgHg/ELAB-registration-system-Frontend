import NavigationCloseAction from "@/components/NavigationCloseAction";
import SpaceListItem from "@/components/space/home/SpaceListItem";
import useSpaceSearch from "@/libs/hooks/useSpaceSearch";
import { store } from "@/libs/store";
import { useFocusEffect } from "@react-navigation/native";
import {
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  spinner: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: 16,
  },
});

const SearchPage = observer(() => {
  const [query, setQuery] = React.useState("");
  const accessToken = store.user.credential.accessToken;
  const { data, isLoading, isValidating, mutate } = useSpaceSearch(
    accessToken,
    query
  );
  useFocusEffect(
    React.useCallback(() => {
      mutate().catch((err) => {
        console.error(err);
      });
    }, [])
  );
  return (
    <Layout style={styles.root}>
      <TopNavigation
        title="搜索空间"
        alignment="center"
        accessoryLeft={NavigationCloseAction}
      />
      <ScrollView>
        <Layout style={styles.container}>
          <Input
            value={query}
            onChangeText={setQuery}
            size="large"
            textStyle={{
              fontSize: 18,
            }}
            accessoryLeft={
              <View>
                <Icon name="search-outline" fill="#8F9BB3" />
              </View>
            }
          />
        </Layout>
        {isLoading || isValidating ? (
          <Layout style={styles.spinner}>
            <Spinner />
          </Layout>
        ) : null}
        <Layout>
          {data === undefined ? (
            <Layout style={styles.empty}>
              <Text appearance="hint">在搜索栏输入以开始...</Text>
            </Layout>
          ) : data === null ? (
            <Layout style={styles.empty}>
              <Text appearance="hint">找不到空间...</Text>
            </Layout>
          ) : (
            data.map((space) => {
              return (
                <SpaceListItem
                  key={`spaceSearchResult-${space.space_id}`}
                  space={space}
                />
              );
            })
          )}
        </Layout>
      </ScrollView>
    </Layout>
  );
});

export default SearchPage;
