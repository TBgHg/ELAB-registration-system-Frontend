module.exports = {
  name: "ELAB",
  slug: "elab-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/SevenRealms.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  scheme: "elab-mobile",
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.zeithrold.elabapp",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/SevenRealmsAdaptive.png",
      backgroundColor: "#ffffff",
    },
    package: "com.zeithrold.elabapp",
  },
  plugins: [
    [
      "expo-updates",
      {
        username: "zeithrold",
      },
    ],
  ],
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "a4797a56-efb5-4ab9-b9e5-56b54fc9561c",
    },
    apiEndpoint: process.env.API_ENDPOINT,
  },
  owner: "zeithrold",
  updates: {
    url: "https://u.expo.dev/a4797a56-efb5-4ab9-b9e5-56b54fc9561c",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
};
