const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  ...tsjPreset,
  preset: "jest-expo",
  setupFiles: ["<rootDir>/jestSetupFile.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  globals: { "process.env": {
      //EXPO_PUBLIC_FIREBASE: "your-firebase-endpoint-url",
    },
  },
  transform: {
    "^.+\\.(js|jsx|ts)$": "babel-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  // ignore the src/services/ folder
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
    "!types/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  //moduleNameMapper: {
  //  "\\.(ttf|png|jpg)$": "<rootDir>/jestAssetTransformer.js",
  //  "\\.(css)$": "identity-obj-proxy",
  //},
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native|@react-native|@react-navigation|@firebase|firebase|firebase/firestore|firebase/app|@react-native-async-storage)",
  ],
};

// setupFiles: [
//   "./node_modules/react-native-gesture-handler/jestSetup.js"
// ],
