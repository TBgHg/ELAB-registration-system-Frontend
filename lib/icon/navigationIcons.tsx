import React from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function buildNavigationIcon(key: string) {
  if (Platform.OS === "ios") {
    function iosNavigationIcon({ size, color }) {
      return (
        <Ionicons
          name={("ios-" + key) as unknown as undefined}
          color={color}
          size={size}
        />
      );
    }
    return iosNavigationIcon;
  } else {
    return key;
  }
}

function getNavigationIcon(
  param:
    | string
    | {
        ios?: string;
        default: string;
      }
) {
  if (typeof param === "string") {
    return buildNavigationIcon(param);
  }
  let iconKey = param.default;
  if (Platform.OS === "ios" && param.ios !== undefined) {
    iconKey = param.ios;
  }
  return buildNavigationIcon(iconKey);
}

export { getNavigationIcon };
