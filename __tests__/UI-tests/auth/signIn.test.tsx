import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import SignInScreen from "@/src/app/screens/auth/sign_in_screen";
import { logInWithEmail } from "@/src/types/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import FirestoreCtrl from "@/src/firebase/FirestoreCtrl";

const Stack = createNativeStackNavigator();

// Create a mock FirestoreCtrl object
const mockFirestoreCtrl = new FirestoreCtrl();

// Mock setUser
const setUser = jest.fn();

// Create a test component to wrap SignInScreen with navigation
const SignInTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn">
          {(props) => (
            <SignInScreen
              {...props}
              setUser={setUser}
              firestoreCtrl={mockFirestoreCtrl}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword">
          {() => (
            <Text testID="forgot-password-screen">Forgot Password Screen</Text>
          )}
        </Stack.Screen>
        {/* Add other screens if necessary */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("SignInScreen", () => {
  // Test for successful email login
  it("allows email login", async () => {
    const { getByText, getByTestId } = render(<SignInTest />);

    // Enter email and password
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");

    // Press the Sign In button
    fireEvent.press(getByText("Sign In"));

    // Expect logInWithEmail to have been called with correct arguments
    expect(logInWithEmail).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
      mockFirestoreCtrl,
      expect.any(Object), // navigation prop
      setUser,
    );
  });

  // Test navigation to Forgot Password screen
  it("navigates to the forgot password screen when the link is pressed", async () => {
    const { getByText } = render(<SignInTest />);

    // Press the Forgot Password link
    fireEvent.press(getByText("Forgot Password?"));

    // Wait for the Forgot Password screen to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("forgot-password-screen")).toBeTruthy();
    });
  });

  // Test password visibility toggle if implemented
  // it("toggles password visibility when the eye icon is pressed", () => {
  //   // Implement this test if your password input has a visibility toggle
  // });
});
