import type { RootNavigatorParamList } from "./navigators/index";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParamList {}
  }
}
