import Constants from "expo-constants";

if (Constants.expoConfig == null || Constants.expoConfig.extra == null) {
  throw new Error("Invalid Expo config");
}

interface Config {
  apiEndpoint: string;
  oidcDiscovery?: string;
  oidcClientId?: string;
}

const {
  apiEndpoint,
  oidcDiscovery = "https://auth.zeithrold.com",
  oidcClientId = "ac7e6090893a6233072a",
}: Config = Constants.expoConfig.extra as Config;

export { apiEndpoint, oidcDiscovery, oidcClientId };
