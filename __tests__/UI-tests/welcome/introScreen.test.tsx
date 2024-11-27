// intro_screen.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import WelcomeIntroScreen from "@/app/screens/welcome/intro_screen";
import { NavigationContainer } from "@react-navigation/native";

describe("WelcomeIntroScreen", () => {
  it("renders the screen correctly", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <WelcomeIntroScreen />
      </NavigationContainer>,
    );

    // Check if the main title is rendered
    expect(getByText("So what is\nStrive\nabout ?")).toBeTruthy();

    // Check if the small title is rendered
    expect(getByText("Participating in Weekly challenges !")).toBeTruthy();

    // Check if the description is rendered
    expect(
      getByText(
        "Compete with your friends and people around you\nBecome the goat and win prizes!",
      ),
    ).toBeTruthy();

    // Check if the image is rendered
    expect(getByTestId("test-image")).toBeTruthy();
  });
});
