import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SignUp from "@/app/screens/auth/sign_up_screen";
import { signUpWithEmail } from "@/types/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Create a mock FirestoreCtrl object
const mockFirestoreCtrl = {};

// Create a test component to wrap SignUp with navigation
const SignUpTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignUp">
          {(props) => <SignUp {...props} firestoreCtrl={mockFirestoreCtrl} />}
        </Stack.Screen>
        {/* Add other screens if necessary */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("SignUpScreen", () => {
  // Test for successful email sign-up
  it("allows email sign-up", async () => {
    const { getByText, getByTestId } = render(<SignUpTest />);

    // Enter email, password, confirm password
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("name-input"), "randomName");
    fireEvent.changeText(getByTestId("surname-input"), "randomSurname");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "password123");

    // Press the Sign Up button
    fireEvent.press(getByText("Join Us!"));

    // Expect signUpWithEmail to have been called with correct arguments
    expect(signUpWithEmail).toHaveBeenCalledWith(
      "randomNamerandomSurname",
      "test@example.com",
      "password123",
      mockFirestoreCtrl,
      expect.any(Object), // navigation prop
    );
  });
});
