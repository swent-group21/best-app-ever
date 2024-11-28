// final_screen.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WelcomeFinalScreen from "@/app/screens/welcome/final_screen";
import { NavigationContainer } from "@react-navigation/native";

describe("WelcomeFinalScreen", () => {
  it("renders the screen correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeFinalScreen />
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
        <WelcomeFinalScreen navigation={{ navigate }} />
      </NavigationContainer>,
    );

    fireEvent.press(getByText("Sign In"));
    expect(navigate).toHaveBeenCalledWith("SignIn");
  });

  it("navigates to SignUp screen on 'Sign Up' button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeFinalScreen navigation={{ navigate }} />
      </NavigationContainer>,
    );

    fireEvent.press(getByText("Sign Up"));
    expect(navigate).toHaveBeenCalledWith("SignUp");
  });

  it("navigates to Home screen on 'Continue as guest' button press", () => {
    const reset = jest.fn();
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeFinalScreen navigation={{ reset }} />
      </NavigationContainer>,
    );

    fireEvent.press(getByText("Continue as guest"));
    expect(reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "Home" }],
    });
  });
});
