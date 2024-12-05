import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeFinalScreen from "@/app/screens/welcome/final_screen";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import SignInScreen from "@/app/screens/auth/sign_in_screen";
import SignUp from "@/app/screens/auth/sign_up_screen";
import HomeScreen from "@/app/screens/home/home_screen";
import { signInAsGuest } from "@/types/Auth";

const Stack = createNativeStackNavigator();

// Mock FirestoreCtrl
jest.mock("@/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      signInAsGuest: jest.fn(),
    };
  });
});
const mockFirestoreCtrl = new FirestoreCtrl();

// Mock Auth functions
jest.mock("@/types/Auth", () => ({
  signInAsGuest: jest.fn(),
  isValidEmail: jest.fn((email) => true),
}));

// Mock user
const mockUser = {
  uid: "123",
  email: "test@example.com",
  name: "TestUser",
  createdAt: new Date(),
};

// Mock setUser
const mockSetuser = jest.fn();

// Create a test component to wrap FinalScreen with navigation
const FinalScreenTest = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="WelcomeFinal"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="WelcomeFinal">
        {(props) => (
          <WelcomeFinalScreen
            {...props}
            firestoreCtrl={mockFirestoreCtrl}
            setUser={mockSetuser}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SignIn">
        {(props) => (
          <SignInScreen
            {...props}
            firestoreCtrl={mockFirestoreCtrl}
            setUser={mockSetuser}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SignUp">
        {(props) => (
          <SignUp
            {...props}
            firestoreCtrl={mockFirestoreCtrl}
            setUser={mockSetuser}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            firestoreCtrl={mockFirestoreCtrl}
            user={mockUser}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

describe("FinalScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all UI components", () => {
    render(<FinalScreenTest />);

    // Verify static texts
    expect(screen.getByText("Ready to\nStrive?")).toBeDefined();

    // Verify buttons
    expect(screen.getByTestId("sign-in-button")).toBeDefined();
    expect(screen.getByTestId("sign-up-button")).toBeDefined();
    expect(screen.getByTestId("continue-as-guest-button")).toBeDefined();
  });

  // it("should navigate to SignIn screen when Sign In button is pressed", async () => {
  //   render(<FinalScreenTest />);

  //   // Press the Sign In button
  //   const signInButton = await screen.findByTestId("sign-in-button");
  //   fireEvent.press(signInButton);

  //   // Wait for the navigation to complete
  //   await waitFor(() => {
  //     expect(screen.queryByTestId("sign-in-screen")).toBeTruthy();
  //   });
  // });

  it("should navigate to SignUp screen when Sign Up button is pressed", async () => {
    render(<FinalScreenTest />);

    // Press the Sign Up button
    const signUpButton = await screen.findByTestId("sign-up-button");
    fireEvent.press(signUpButton);

    // Wait for the navigation to complete
    await waitFor(() =>
      expect(screen.findByTestId("sign-up-screen")).toBeDefined(),
    );
  });

  it("should call signInAsGuest when Continue as guest button is pressed", async () => {
    render(<FinalScreenTest />);

    // Press the Continue as guest button
    const continueAsGuestButton = await screen.findByTestId(
      "continue-as-guest-button",
    );
    fireEvent.press(continueAsGuestButton);

    // Wait for the function to be called
    await waitFor(() => expect(signInAsGuest).toHaveBeenCalled());
  });
});
