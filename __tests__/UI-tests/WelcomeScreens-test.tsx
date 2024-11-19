import React from "react";
import { render } from "@testing-library/react-native";
import WelcomeScreens from "@/app/index";

describe("WelcomeScreens Component", () => {
  it("renders the intro screen", () => {
    TestTextAppearsOnScreen(
      "Compete with your friends and people around you\nBecome the goat and win prizes!",
    );
  });

  it("renders the concept screen", () => {
    TestTextAppearsOnScreen(
      "Become the best version of yourself \nInteract with motivated people to reach your goals !prizes!",
    );
  });

  it("renders the personal screen", () => {
    TestTextAppearsOnScreen(
      "Create and share your memories with your friends \nGet rewarded for your creativity",
    );
  });

  it("renders the final screen", () => {
    TestTextAppearsOnScreen("Ready to\nStrive?");
  });
});

function TestTextAppearsOnScreen(text: string) {
  const { getByText } = render(<WelcomeScreens />);

  expect(getByText(text)).toBeTruthy();
}
