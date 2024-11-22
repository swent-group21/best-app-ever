// personal_screen.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import WelcomeConceptScreen from "@/app/screens/welcome/personal_screen";
import { NavigationContainer } from "@react-navigation/native";

describe("WelcomePersonalScreen", () => {
  it("renders the screen correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeConceptScreen />
      </NavigationContainer>
    );

    // Check if the title is rendered
    expect(getByText("Building up memories")).toBeTruthy();

    // Check if the description is rendered
    expect(
      getByText(
        "Create and share your memories with your friends\nGet rewarded for your creativity"
      )
    ).toBeTruthy();
  });
});
