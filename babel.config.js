module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "react-native-reanimated/plugin",
        {
          relativeSourceLocation: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@/pages": "./pages",
            "@/libs": "./libs",
            "@/lib": "./lib",
            "@/components": "./components",
            "@/types": "./types",
            "@/constants": "./constants",
            "@/navigators": "./navigators",
          },
        },
      ],
    ],
  };
};
