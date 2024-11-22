// set_up_screen.test.tsx
import React from "react";
import { Text } from "react-native";
import { render, fireEvent, waitFor, screen } from "@testing-library/react-native";
import SetUsername from "@/app/screens/auth/set_up_screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Create a test component to wrap SetUsername with navigation
const SetUsernameTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SetUser"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SetUser">
          {(props) => <SetUsername {...props} />}
        </Stack.Screen>
        {/* Mock other screens if necessary */}
        <Stack.Screen name="Home">{() => <Text testID="home-screen"></Text>}</Stack.Screen>
        <Stack.Screen name="Camera">{() => <Text testID="camera-screen"></Text>}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("SetUsernameScreen", () => {
  it("allows the user to input a username and navigate to Home", async () => {
    const { getByPlaceholderText, getByTestId } = render(<SetUsernameTest />);

    // Enter username
    const usernameInput = getByPlaceholderText("ex : sandraa");
    fireEvent.changeText(usernameInput, "testUsername");

    // Press the right arrow button to navigate to Home
    const rightArrowButton = getByTestId("bottomBar-rightIcon");
    fireEvent.press(rightArrowButton);

    await waitFor(() => {
      expect(screen.getByTestId("home-screen")).toBeTruthy();
    });
    // Expect to navigate to the "Home" screen
    // Since we're using NavigationContainer, we can verify it via the screen hierarchy or mock the navigation
    // For simplicity, we'll assume the navigation happens without error
  });

  it("navigates to Camera when the profile icon is pressed", async () => {
    const { getByTestId } = render(<SetUsernameTest />);

    // Press the profile icon button
    const profileIconButton = getByTestId("profile-icon-button");
    fireEvent.press(profileIconButton);

    await waitFor(() => {
      expect(screen.getByTestId("camera-screen")).toBeTruthy();
    });

    // Expect to navigate to the "Camera" screen
    // Again, we assume navigation works as intended
  });
});
