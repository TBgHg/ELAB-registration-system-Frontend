import React from "react";
import { Divider, List, ListItem } from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import { spaceStore } from "../../../lib/store";

const SpaceList = observer(({ navigation }: { navigation: any }) => {
  React.useEffect(() => {
    console.log(spaceStore.spaces.length);
  }, [spaceStore.spaces.length]);
  return (
    <List
      data={spaceStore.spaces}
      ItemSeparatorComponent={Divider}
      renderItem={({ item, index }) => (
        <ListItem
          title={item.title}
          description={item.description}
          onPress={() => {
            navigation.navigate("SpacePage", {
              id: item.id,
              type: "space",
            });
          }}
        />
      )}
    />
  );
});

export default SpaceList;
