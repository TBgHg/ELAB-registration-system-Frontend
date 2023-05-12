import type { SpaceNavigatorScreenProps } from "@/navigators/main/tab/space";
import { store } from "@/libs/store";
import { Divider, Layout } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { NativeScrollEvent } from "react-native";
import ThreadContent from "@/components/space/content/ThreadContent";
import ThreadHeader from "@/components/space/content/ThreadHeader";
import CommentList from "@/components/space/content/CommentList";
import useThread from "@/libs/hooks/useThread";

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

const ThreadPage = observer(
  ({ navigation, route }: SpaceNavigatorScreenProps<"SpaceThreadPage">) => {
    const { params } = route;
    const { id } = params;
    const spaceId = store.space.space.space_id;
    const accessToken = store.user.credential.accessToken;
    const [isReachEnd, setIsReachEnd] = React.useState(false);
    const { data } = useThread(spaceId, accessToken, id);
    return (
      <Layout style={styles.root}>
        <ThreadHeader content={data} />
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setIsReachEnd(true);
            } else {
              setIsReachEnd(false);
            }
          }}
        >
          <ThreadContent
            spaceId={spaceId}
            threadId={id}
            accessToken={accessToken}
          />
          <Divider />
          <CommentList
            spaceId={spaceId}
            threadId={id}
            accessToken={accessToken}
            isReachEnd={isReachEnd}
          />
        </ScrollView>
      </Layout>
    );
  }
);

export default ThreadPage;
