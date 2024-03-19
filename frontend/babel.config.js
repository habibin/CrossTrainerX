module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      "@babel/plugin-transform-export-namespace-from",
      'react-native-reanimated/plugin',
    ],
  };
};
