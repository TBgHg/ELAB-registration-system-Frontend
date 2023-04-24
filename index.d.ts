import type { RootNavigationParamList } from "./pages/RootNavigatior";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigationParamList {}
  }
}
