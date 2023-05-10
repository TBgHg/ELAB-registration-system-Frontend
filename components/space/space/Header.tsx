import React from "react";
import {
  TopNavigation,
  OverflowMenu,
  TopNavigationAction,
  Icon,
  MenuItem,
} from "@ui-kitten/components";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { store } from "@/libs/store";
import NavigationBackAction from "@/components/NavigationBackAction";
import SpaceClient from "@/libs/client/v1/space/space";

interface MenuItemListProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItemList = ({ setVisible }: MenuItemListProps) => {
  const navigation = useNavigation();
  return (
    <>
      {store.space.position === "owner" ||
      store.space.position === "moderator" ? (
        <>
          <MenuItem
            title="编辑空间"
            onPress={() => {
              navigation.navigate("MainNavigator", {
                screen: "TabNavigator",
                params: {
                  screen: "SpaceNavigator",
                  params: {
                    screen: "SpacePopupNavigator",
                    params: {
                      screen: "SpacePatchPage",
                      params: {
                        id: store.space.space.space_id,
                        type: "edit",
                      },
                    },
                  },
                },
              });
              setVisible(false);
            }}
          />
        </>
      ) : null}
      {store.space.position === "owner" ? (
        <MenuItem
          title="删除空间"
          onPress={() => {
            Alert.alert("真的要删除空间吗？", "此操作不可逆！", [
              {
                text: "取消",
                style: "cancel",
              },
              {
                text: "删除空间",
                style: "destructive",
                onPress: () => {
                  const client = new SpaceClient(
                    store.user.credential.accessToken
                  );
                  client
                    .delete(store.space.space.space_id)
                    .then(() => {
                      navigation.navigate("MainNavigator", {
                        screen: "TabNavigator",
                        params: {
                          screen: "SpaceNavigator",
                          params: {
                            screen: "SpaceHomePage",
                          },
                        },
                      });
                    })
                    .catch((err) => {
                      console.error(err);
                      Alert.alert("删除失败", "请检查您的网络连接。");
                    });
                },
              },
            ]);
          }}
        />
      ) : null}
    </>
  );
};

const SpacePageHeader = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <TopNavigation
      title={store.space.space.name}
      subtitle="空间"
      alignment="center"
      accessoryLeft={NavigationBackAction}
      accessoryRight={() => (
        <OverflowMenu
          anchor={() => {
            return (
              <TopNavigationAction
                icon={(props) => (
                  <View>
                    <Icon {...props} name="more-horizontal" color="black" />
                  </View>
                )}
                onPress={() => {
                  setVisible(true);
                }}
              />
            );
          }}
          visible={visible}
          // selectedIndex={selectedIndex}
          onSelect={(index) => {
            setVisible(false);
          }}
          onBackdropPress={() => {
            setVisible(false);
          }}
        >
          <MenuItemList setVisible={setVisible} />
        </OverflowMenu>
      )}
    />
  );
};

export default SpacePageHeader;
