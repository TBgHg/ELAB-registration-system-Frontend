import React from "react";
import {
  TopNavigation,
  OverflowMenu,
  TopNavigationAction,
  Icon,
  MenuItem,
} from "@ui-kitten/components";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PlusIcon = (props) => (
  <View>
    <Icon {...props} name="plus" color="black" />
  </View>
);

const Header = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  return (
    <TopNavigation
      title="空间"
      alignment="center"
      accessoryRight={() => (
        <OverflowMenu
          anchor={() => {
            return (
              <TopNavigationAction
                icon={PlusIcon}
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
          <MenuItem
            title="创建空间"
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
                        type: "add",
                      },
                    },
                  },
                },
              });
            }}
          />
          <MenuItem title="空间邀请列表" />
        </OverflowMenu>
      )}
    />
  );
};

export default Header;
