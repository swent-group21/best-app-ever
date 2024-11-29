// concept_screen.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import WelcomeConceptScreen from "@/app/screens/welcome/concept_screen";
import { NavigationContainer } from "@react-navigation/native";

describe("WelcomeConceptScreen", () => {
  it("renders the screen correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeConceptScreen />
      </NavigationContainer>,
    );

    // Check if the title is rendered
    expect(getByText("Competing\nyourself")).toBeTruthy();

    // Check if the description is rendered
    expect(
      getByText(
        "Become the best version of yourself\nInteract with motivated people to reach your goals !prizes!",
      ),
    ).toBeTruthy();
  });
});
