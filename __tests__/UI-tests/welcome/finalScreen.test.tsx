// final_screen.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WelcomeFinalScreen from "@/app/screens/welcome/final_screen";
import { NavigationContainer } from "@react-navigation/native";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import WelcomeScreens from "@/app/screens/welcome/welcome_screen";

const mockFirestoreCtrl = new FirestoreCtrl();

jest.mock("@/types/Auth", () => ({
  signInAsGuest: jest.fn(),
}));

describe("WelcomeFinalScreen", () => {
  it("renders the screen correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeScreens 
          setUser={jest.fn()}
          navigation={{}} 
          firestoreCtrl={mockFirestoreCtrl}
        /> 
      </NavigationContainer>,
    );

    // Check if the title is rendered
    expect(getByText("Ready to\nStrive?")).toBeTruthy();

    // Check if the buttons are rendered
    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
    expect(getByText("Continue as guest")).toBeTruthy();
  });

  it("navigates to SignIn screen on 'Sign In' button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeFinalScreen 
          setUser={jest.fn()}
          navigation={{ navigate }} 
          firestoreCtrl={mockFirestoreCtrl}
        />
      </NavigationContainer>,
    );

    fireEvent.press(getByText("Sign In"));
    expect(navigate).toHaveBeenCalledWith("SignIn");
  });

  it("navigates to SignUp screen on 'Sign Up' button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeFinalScreen 
          setUser={jest.fn()}
          navigation={{ navigate }} 
          firestoreCtrl={mockFirestoreCtrl}
        />
      </NavigationContainer>,
    );

    fireEvent.press(getByText("Sign Up"));
    expect(navigate).toHaveBeenCalledWith("SignUp");
  });

  it("navigates to Home screen on 'Continue as guest' button press", () => {
    const signInAsGuest = require("@/types/Auth").signInAsGuest;
    const reset = jest.fn();
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeFinalScreen 
          setUser={jest.fn()}
          navigation={{ reset }} 
          firestoreCtrl={mockFirestoreCtrl}
        />
      </NavigationContainer>,
    );

    fireEvent.press(getByText("Continue as guest"));
    expect(signInAsGuest).toHaveBeenCalled();
  });
});
