import React from "react";
import { Spinner, TopNavigation, Text } from "@ui-kitten/components";
import { applicationStore } from "../../../lib/store";
import { observer } from "mobx-react-lite";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { ApplicationNavigatorParamList } from "../../../pages/old/application/Navigator";
import type { RenderProp } from "@ui-kitten/components/devsupport";
import type { ParamListBase } from "@react-navigation/native";

const titleAlignment = "center";

function translateStatus(status?: string) {
  if (status === undefined) {
    return "加载中";
  }
  switch (status) {
    case undefined:
      return "加载中";
    case "unsubmitted":
      return "待申请";
    case "submitted":
      return "待选座";
    case "seats_selected":
      return "待签到";
    case "checked_in":
      return "等待结果";
  }
  return "";
}

interface HeaderProps<T extends ParamListBase = ApplicationNavigatorParamList> {
  navigation: NativeStackNavigationProp<T> | any;
  accessoryRight?: RenderProp;
  accessoryLeft?: RenderProp;
}

const ApplicationHeader = observer(
  ({ navigation, accessoryLeft, accessoryRight }: HeaderProps) => {
    const applicationStatus = translateStatus(applicationStore.status);
    return (
      <TopNavigation
        accessoryLeft={accessoryLeft}
        accessoryRight={
          applicationStore.loading ? <Spinner size="small" /> : accessoryRight
        }
        alignment={titleAlignment}
        title={(evaProps) => (
          <>
            <Text {...evaProps}>电气创新实践基地加入申请</Text>
          </>
        )}
        subtitle={(evaProps) => <Text {...evaProps}>{applicationStatus}</Text>}
      />
    );
  }
);

export default ApplicationHeader;
export { titleAlignment };
