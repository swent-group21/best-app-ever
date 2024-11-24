# Testing Setup Documentation

This document provides an overview of the testing setup for the application, explaining how each configuration file works and how tests are structured and executed. We'll break down the key components:

- [`jest.config.js`](#jestconfigjs)
- [`jestSetupFile.js`](#jestsetupfilejs)
- [`jestAssetTransformer.js`](#jestassettransformerjs)
- [Example Test File: `home.test.tsx`](#example-test-file-hometesttsx)

---

## `jest.config.js`

The `jest.config.js` file contains the configuration for Jest, the testing framework used in this project. It specifies how Jest should behave when running tests, including how to handle different file types, how to transform code, and which files to include or ignore when collecting coverage data.

```javascript
const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  ...tsjPreset,
  preset: "jest-expo",
  setupFiles: ["<rootDir>/jestSetupFile.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  globals: {
    "process.env": {
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
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
    "!types/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native|@react-native|@react-navigation|@firebase|firebase|firebase/firestore|firebase/app|@react-native-async-storage)",
  ],
};
```

### Breakdown of Configuration:

- **TypeScript Preset**:
  ```javascript
  const { defaults: tsjPreset } = require("ts-jest/presets");
  module.exports = {
    ...tsjPreset,
    // ...
  };
  ```
  - **Explanation**: This imports the default configuration presets from `ts-jest`, which is a Jest transformer for handling TypeScript files. By spreading `tsjPreset`, we inherit the default settings for TypeScript testing.

- **Preset**:
  ```javascript
  preset: "jest-expo",
  ```
  - **Explanation**: Specifies the Jest preset for React Native apps using Expo. `jest-expo` provides a Jest preset that's pre-configured to work with Expo apps.

- **Setup Files**:
  ```javascript
  setupFiles: ["<rootDir>/jestSetupFile.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  ```
  - **`setupFiles`**: Executes before the test framework is installed, setting up any necessary mocks or configurations. Here, it includes `jestSetupFile.js`, which we'll discuss later.
  - **`setupFilesAfterEnv`**: Executes after the test framework is installed. It includes `@testing-library/jest-native/extend-expect` to extend Jest's matchers with custom matchers for React Native testing.

- **Globals**:
  ```javascript
  globals: {
    "process.env": {
      //EXPO_PUBLIC_FIREBASE: "your-firebase-endpoint-url",
    },
  },
  ```
  - **Explanation**: Defines global variables available in all test environments. This is useful for setting environment variables like Firebase config. The actual values are commented out and can be filled as needed.

- **Transform**:
  ```javascript
  transform: {
    "^.+\\.(js|jsx|ts)$": "babel-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  ```
  - **Explanation**: Specifies how to transform files before testing.
    - Files ending with `.js`, `.jsx`, or `.ts` are transformed using `babel-jest`.
    - Files ending with `.ts` or `.tsx` are transformed using `ts-jest` with a specific TypeScript configuration (`tsconfig.jest.json`).

- **Module File Extensions**:
  ```javascript
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  ```
  - **Explanation**: Lists the file extensions Jest should look for when resolving modules.

- **Coverage Collection**:
  ```javascript
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
    "!types/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  ```
  - **Explanation**:
    - **`collectCoverage`**: Enables coverage collection.
    - **`collectCoverageFrom`**: Specifies which files to collect coverage from.
      - Collects from all `.ts` and `.tsx` files in the `app` directory.
      - Excludes TypeScript declaration files (`.d.ts`) and files in the `types` directory.
    - **`coverageDirectory`**: Output directory for coverage reports.
    - **`coverageReporters`**: Specifies coverage reporters to use (`text` for console output, `lcov` for LCOV files).

- **Transform Ignore Patterns**:
  ```javascript
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native|@react-native|@react-navigation|@firebase|firebase|firebase/firestore|firebase/app|@react-native-async-storage)",
  ],
  ```
  - **Explanation**: Specifies patterns for modules that should not be transformed. By default, Jest ignores `node_modules`, but some modules (like React Native and Expo packages) need to be transformed. This pattern tells Jest to transform specific modules within `node_modules`.

---

## `jestSetupFile.js`

The `jestSetupFile.js` is a setup file that Jest executes before running any tests. It’s used to configure or set up the testing environment, such as mocking modules and functions that are used across multiple test files.

```javascript
const resolvedUser = {
  user: {
    metadata: {
      creationTime: 0,
      lastSignInTime: 0,
    },
    uid: "12345",
  },
};

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock Firebase modules
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
  FirebaseError: jest.fn(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadString: jest.fn(),
  getDownloadURL: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  initializeFirestore: jest.fn(),
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn().mockResolvedValue({
    exists: jest.fn().mockReturnValue(true),
    data: jest.fn().mockReturnValue({
      withConverter: jest.fn(),
      getUser: "admin",
    }),
  }),
  getDocs: jest.fn(),
  query: jest.fn(),
  setDoc: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
  signInWithCredential: jest.fn(() => Promise.resolve(resolvedUser)),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(resolvedUser)),
  signOut: jest.fn(() => Promise.resolve()),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve(resolvedUser)),
  signInWithPopup: jest.fn(() => Promise.resolve(resolvedUser)),
  signInWithRedirect: jest.fn(() => Promise.resolve(resolvedUser)),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  onAuthStateChanged: jest.fn(),
  updateCurrentUser: jest.fn(),
  updateEmail: jest.fn(),
  updatePassword: jest.fn(),
  updateProfile: jest.fn(),
}));

// Mock React Navigation
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock expo and other modules
jest.mock("expo", () => ({
  registerRootComponent: jest.fn(),
}));

jest.mock("@/gesture-handler", () => {});

// Mock custom modules and components
jest.mock("@/types/Auth", () => ({
  ...jest.requireActual("@/types/Auth"),
  isValidEmail: jest.fn(),
  signUpWithEmail: jest.fn(),
  logInWithEmail: jest.fn(),
  resetPassword: jest.fn(),
}));

jest.mock("@/firebase/FirestoreCtrl");

jest.mock("react-native-elements", () => {
  const React = require('react');
  return {
    Icon: (props) => <React.Fragment />,
    IconProps: {},
  };
});

jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: jest.fn().mockImplementation((props) => <View {...props} testID="map-view" />),
    Marker: jest.fn().mockImplementation((props) => <View {...props} testID="map-marker" />),
  };
});

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: "granted" })),
}));
```

### Breakdown of Mocks:

- **Mocking `AsyncStorage`**:
  ```javascript
  jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
  );
  ```
  - **Explanation**: Uses the provided mock for `AsyncStorage`, which simulates the storage API for testing purposes.

- **Mocking Firebase Modules**:
  - **Firebase App**:
    ```javascript
    jest.mock("firebase/app", () => ({
      initializeApp: jest.fn(),
      getApps: jest.fn(() => []),
      getApp: jest.fn(),
      FirebaseError: jest.fn(),
    }));
    ```
  - **Firebase Storage**:
    ```javascript
    jest.mock("firebase/storage", () => ({
      getStorage: jest.fn(),
      ref: jest.fn(),
      uploadString: jest.fn(),
      getDownloadURL: jest.fn(),
    }));
    ```
  - **Firebase Firestore**:
    ```javascript
    jest.mock("firebase/firestore", () => ({
      // ...
    }));
    ```
  - **Firebase Auth**:
    ```javascript
    jest.mock("firebase/auth", () => ({
      // ...
    }));
    ```
  - **Explanation**: Mocks Firebase modules to prevent actual network calls during tests. Functions are replaced with Jest mock functions (`jest.fn()`), and methods that return Promises are mocked to return resolved Promises with predefined values.

- **Mocking React Navigation**:
  ```javascript
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }));
  ```
  - **Explanation**: Mocks the `useNavigation` hook from React Navigation to prevent navigation errors during tests and to track navigation calls.

- **Mocking Expo Modules**:
  ```javascript
  jest.mock("expo", () => ({
    registerRootComponent: jest.fn(),
  }));
  ```
  - **Explanation**: Mocks Expo's `registerRootComponent`.

- **Mocking Custom Modules**:
  - **Authentication Types**:
    ```javascript
    jest.mock("@/types/Auth", () => ({
      ...jest.requireActual("@/types/Auth"),
      isValidEmail: jest.fn(),
      signUpWithEmail: jest.fn(),
      logInWithEmail: jest.fn(),
      resetPassword: jest.fn(),
    }));
    ```
  - **Firestore Controller**:
    ```javascript
    jest.mock("@/firebase/FirestoreCtrl");
    ```
  - **Explanation**: Mocks custom modules and their methods to control their behavior during tests.

- **Mocking External Libraries**:
  - **React Native Elements**:
    ```javascript
    jest.mock('react-native-elements', () => {
      const React = require('react');
      return {
        Icon: (props) => <React.Fragment />,
        IconProps: {},
      };
    });
    ```
  - **React Native Maps**:
    ```javascript
    jest.mock("react-native-maps", () => {
      const { View } = require("react-native");
      return {
        __esModule: true,
        default: jest.fn().mockImplementation((props) => <View {...props} testID="map-view" />),
        Marker: jest.fn().mockImplementation((props) => <View {...props} testID="map-marker" />),
      };
    });
    ```
  - **Expo Location**:
    ```javascript
    jest.mock("expo-location", () => ({
      requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: "granted" })),
    }));
    ```
  - **Explanation**: Mocks external libraries that are difficult to test due to native modules or dependencies. Provides simple mocked implementations to allow tests to run without errors.

---

## `jestAssetTransformer.js`

The `jestAssetTransformer.js` file is used to transform static assets (like images and fonts) during tests. Jest doesn't handle static assets like images by default, so we need to mock them to prevent errors.

```javascript
module.exports = {
  process() {
    return "module.exports = {};";
  },
  getCacheKey() {
    // The output is always the same.
    return "staticAssetTransformer";
  },
};
```

### Explanation:

- **`process` Function**:
  - **Explanation**: Returns an empty object (`module.exports = {};`) for any imported assets. This prevents errors when modules import assets like images, fonts, or styles during tests.
  
- **`getCacheKey` Function**:
  - **Explanation**: Returns a constant cache key (`"staticAssetTransformer"`), ensuring that the transformed output is always cached consistently.

- **Usage**:
  - **Explanation**: In the `jest.config.js`, you would typically use `jestAssetTransformer.js` with `moduleNameMapper` to tell Jest how to handle static asset imports. However, in the provided `jest.config.js`, the `moduleNameMapper` configuration is commented out. If needed, you would uncomment and configure it to use `jestAssetTransformer.js` for specific file types.

---

## Example Test File: `home.test.tsx`

The `home.test.tsx` file is a test suite for the `HomeScreen` component. It uses React Testing Library to render the component and verify its behavior.

```typescript
import React from "react";
import { Text } from "react-native";
import {
  render,
  waitFor,
} from "@testing-library/react-native";
import HomeScreen from "@/app/screens/home/home_screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import { DBChallenge } from "@/firebase/FirestoreCtrl";

const Stack = createNativeStackNavigator();

const mockFirestoreCtrl = new FirestoreCtrl();

// Mock data for challenges
const mockChallenges: DBChallenge[] = [
  {
    challenge_id: "1",
    challenge_name: "Challenge 1",
    description: "Description 1",
    uid: "12345",
    date: new Date(),
  },
  {
    challenge_id: "2",
    challenge_name: "Challenge 2",
    description: "Description 2",
    uid: "12345",
    date: new Date(),
  },
];

// Mock getChallengesByUserId method
mockFirestoreCtrl.getChallengesByUserId = jest.fn().mockResolvedValue(mockChallenges);

// Create a test component to wrap HomeScreen with navigation
const HomeScreenTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
          name="Home"
          initialParams={{ user: { uid: '12345' } }}
        >
          {(props) => (
            <HomeScreen {...props} firestoreCtrl={mockFirestoreCtrl} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Camera"
        >
          {() => (
            <Text testID="camera-screen">Camera Screen</Text>
          )}
        </Stack.Screen>
        {/* Add other screens if necessary */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("HomeScreen", () => {
  it("renders challenges fetched from Firestore", async () => {
    const { getByTestId } = render(<HomeScreenTest />);

    // Wait for the challenges to be fetched and rendered
    await waitFor(() => {
      expect(getByTestId("challenge-id-0")).toBeTruthy();
      expect(getByTestId("challenge-id-1")).toBeTruthy();
    });
  });
});
```

### Breakdown of the Test:

1. **Imports**:
   - Imports necessary modules and components, including React, React Native components, testing utilities, the `HomeScreen` component, navigation components, and the `FirestoreCtrl` class.

2. **Setting Up Navigation**:
   ```typescript
   const Stack = createNativeStackNavigator();

   // Create a test component to wrap HomeScreen with navigation
   const HomeScreenTest = () => {
     return (
       <NavigationContainer>
         <Stack.Navigator
           initialRouteName="Home"
           screenOptions={{ headerShown: false }}
         >
           {/* Screens */}
         </Stack.Navigator>
       </NavigationContainer>
     );
   };
   ```
   - **Explanation**: Creates a `HomeScreenTest` component that wraps the `HomeScreen` with a navigation container and stack navigator. This is necessary because the `HomeScreen` likely depends on navigation props provided by React Navigation.

3. **Mocking Firestore Controller**:
   ```typescript
   const mockFirestoreCtrl = new FirestoreCtrl();

   // Mock data for challenges
   const mockChallenges: DBChallenge[] = [
     // ...mock challenge objects...
   ];

   // Mock getChallengesByUserId method
   mockFirestoreCtrl.getChallengesByUserId = jest.fn().mockResolvedValue(mockChallenges);
   ```
   - **Explanation**: Creates a mock instance of `FirestoreCtrl` and mocks the `getChallengesByUserId` method to return predefined mock challenges. This prevents actual database calls during the test and provides controlled data for testing.

4. **Passing Mock Props**:
   ```typescript
   <Stack.Screen 
     name="Home"
     initialParams={{ user: { uid: '12345' } }}
   >
     {(props) => (
       <HomeScreen {...props} firestoreCtrl={mockFirestoreCtrl} />
     )}
   </Stack.Screen>
   ```
   - **Explanation**: Passes the `mockFirestoreCtrl` as a prop to the `HomeScreen` component. Also provides initial parameters like `user` with a `uid`. This ensures that the component has all the necessary props and context to run.

5. **Defining the Test Suite**:
   ```typescript
   describe("HomeScreen", () => {
     it("renders challenges fetched from Firestore", async () => {
       // Test implementation
     });
   });
   ```
   - **Explanation**: Defines a test suite for `HomeScreen` and a test case to verify that challenges are rendered correctly.

6. **Running the Test**:
   ```typescript
   const { getByTestId } = render(<HomeScreenTest />);

   // Wait for the challenges to be fetched and rendered
   await waitFor(() => {
     expect(getByTestId("challenge-id-0")).toBeTruthy();
     expect(getByTestId("challenge-id-1")).toBeTruthy();
   });
   ```
   - **Explanation**:
     - Renders the `HomeScreenTest` component.
     - Uses `waitFor` to wait until the asynchronous fetching and rendering of challenges is complete.
     - Checks that elements with test IDs `challenge-id-0` and `challenge-id-1` are present in the rendered output, indicating that the challenges have been fetched and displayed.

### Key Points:

- **Mocking Dependencies**: By mocking the `FirestoreCtrl` and its methods, we ensure that our tests are deterministic and do not rely on external services.

- **Testing Asynchronous Code**: The use of `async/await` and `waitFor` handles the asynchronous nature of data fetching in the component.

- **Using Test IDs**: The `getByTestId` method looks for elements with specific `testID` props. This is a best practice in React Native testing to reliably find and interact with components.

- **Integration with Navigation**: Wrapping the component with a navigation container and stack navigator ensures that navigation-related functionalities within the component can be tested.

---

# Conclusion

This testing setup provides a robust framework for testing React Native components in an Expo environment, with support for TypeScript, React Navigation, and Firebase. By carefully configuring Jest and mocking external dependencies, we can write tests that are reliable, maintainable, and free from side effects caused by network requests or complex native modules.

The provided example demonstrates how to structure tests using React Testing Library and how to ensure that components behave as expected when interacting with mocked dependencies.
