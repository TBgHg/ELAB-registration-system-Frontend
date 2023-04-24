import type { ParamListBase } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TopNavigationAction, Icon } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { Alert, View } from "react-native";
import { applicationStore } from "../../lib/store";
import type { ApplicationNavigatorParamList } from "../../pages/application/Navigator";

interface NavigationSeatSaveActionProps<T extends ParamListBase> {
  roomIndex: number | null;
  navigation: NativeStackNavigationProp<T>;
}

const NavigationSeatSaveAction = observer(
  ({
    roomIndex,
    navigation,
  }: NavigationSeatSaveActionProps<ApplicationNavigatorParamList>) => {
    return (
      <TopNavigationAction
        icon={
          <View>
            <Icon name="save-outline" fill="black" />
          </View>
        }
        onPress={() => {
          if (roomIndex === null) {
            Alert.alert("您还没有选择您的面试批次", "请选择面试批次。");
            return;
          }
          Alert.alert(
            "你确定吗？",
            `在您提交申请后，您将无法更改您的申请表与面试批次！\n你确认选择 ${applicationStore.rooms[roomIndex].name} 的面试批次吗？`,
            [
              {
                text: "取消",
                style: "cancel",
              },
              {
                text: "确定",
                style: "destructive",
                onPress: () => {
                  const selectedRoom = Object.assign(
                    {
                      seatNumber: 1,
                    },
                    applicationStore.rooms[roomIndex]
                  );
                  applicationStore.setSelectedRoom(selectedRoom);
                  applicationStore.setStatus("seats_selected");
                  applicationStore.saveStatus();
                  applicationStore.saveSelectedRoom();
                },
              },
            ]
          );
        }}
      />
    );
  }
);

export default NavigationSeatSaveAction;
