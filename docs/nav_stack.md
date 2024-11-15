# How to Use the Navigation Stack in React Navigation and Add New Screens

React Navigation is a widely used library for managing navigation in React Native applications. It provides a simple and flexible API for navigating between different screens and handling navigation history. In this tutorial, we'll walk through how to set up a navigation stack using React Navigation and how to add new screens to it.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up React Navigation](#setting-up-react-navigation)
- [Creating a Stack Navigator](#creating-a-stack-navigator)
- [Adding Screens to the Navigator](#adding-screens-to-the-navigator)
- [Navigating Between Screens](#navigating-between-screens)
- [Passing Props to Screens](#passing-props-to-screens)
- [Grouping Screens](#grouping-screens)
- [Adding New Screens](#adding-new-screens)
- [Full Example](#full-example)
- [Conclusion](#conclusion)

## Prerequisites

Before you begin, ensure you have the following:

- Basic knowledge of React Native and TypeScript.
- An existing React Native project set up with TypeScript.
- React Navigation packages installed:

  ```bash
  npm install @react-navigation/native @react-navigation/stack
  ```

- Required dependencies installed (if not already):

  ```bash
  npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
  ```

## Setting Up React Navigation

First, import the necessary modules in your navigation file (e.g., `Nav.tsx`):

```tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
```

Define the types for your navigation stack parameters using TypeScript:

```tsx
type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  // Add other screens here
};
```

## Creating a Stack Navigator

Create an instance of the stack navigator:

```tsx
const Stack = createStackNavigator<RootStackParamList>();
```

## Adding Screens to the Navigator

Use the `Stack.Screen` component to define your screens within the `Stack.Navigator`. Each screen corresponds to a component in your application.

````tsx
<Stack.Navigator initialRouteName="Welcome">
  <Screen name="WelcomeConcept" options={{ title: "Final Screen" }}>
    {(props: any) => <WelcomeFinalScreen {...props} firestoreCtrl={{ firestoreCtrl }} />}
  </Screen>
  <Screen name="SignUp">
    {(props: any) => <SignUp {...props} firestoreCtrl={{ firestoreCtrl }} />}
  </Screen>
  {/* Add more screens as needed */}
</Stack.Navigator> ```


## Navigating Between Screens

To navigate between screens, use the `navigation` prop available in your screen components.

```tsx
import { Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }: any) => {
  return (
    <Button
      title="Go to Home"
      onPress={() => navigation.navigate('Home')}
    />
  );
};
````

## Passing Props to Screens

### Passing Props to Screen Components

When defining screens, you can pass additional props via render functions:

```tsx
<Stack.Screen name="Home">
  {(props) => <HomeScreen {...props} extraData={someData} />}
</Stack.Screen>
```

## Grouping Screens

You can group screens using `Stack.Group` to apply common options or configurations.

```tsx
<Stack.Navigator>
  <Stack.Group
    screenOptions={{
      headerStyle: { backgroundColor: "lightblue" },
    }}
  >
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
  </Stack.Group>

  <Stack.Group
    screenOptions={{
      headerStyle: { backgroundColor: "white" },
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Group>
</Stack.Navigator>
```

## Adding New Screens

To add a new screen to your navigation stack, follow these steps:

### 1. Create the Screen Component

Create a new component for your screen, e.g., `ProfileScreen.tsx`:

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
```

### 2. Update the RootStackParamList

Add the new screen to your stack parameter list:

```tsx
type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Profile: undefined;
  // Add other screens here
};
```

### 3. Import and Add the Screen to the Navigator

Import your new screen and add it to the navigator:

```tsx
import ProfileScreen from "./screens/ProfileScreen";

<Stack.Screen name="Profile" component={ProfileScreen} />;
```

### 4. Navigate to the New Screen

Use the `navigation` prop to navigate to the new screen from any component:

```tsx
navigation.navigate("Profile");
```

## Conclusion

Using React Navigation's stack navigator allows you to handle screen transitions and navigation history in your React Native app effectively. By grouping screens and passing parameters, you can create a flexible and powerful navigation structure.

Remember to always update your `RootStackParamList` when adding new screens, especially when using TypeScript, to maintain type safety throughout your application.

---

By following this guide, you should now be able to:

- Set up a navigation stack using React Navigation.
- Add new screens to your navigation stack.
- Navigate between screens and pass parameters.
- Organize your navigation structure using screen groups.

For more detailed information, refer to the [React Navigation documentation](https://reactnavigation.org/docs/getting-started).
