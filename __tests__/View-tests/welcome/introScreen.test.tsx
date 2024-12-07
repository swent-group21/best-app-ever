import React from "react";
import { render } from "@testing-library/react-native";
import WelcomeIntroScreen from "@/src/views/welcome/intro_screen";

describe("WelcomeIntroScreen UI Tests", () => {
  it("renders the screen container", () => {
    const { getByTestId } = render(<WelcomeIntroScreen />);
    const container = getByTestId("container");
    expect(container).toBeTruthy();
  });

  it("renders the background shape", () => {
    const { getByTestId } = render(<WelcomeIntroScreen />);
    const ovalShape = getByTestId("background-image-1");
    expect(ovalShape).toBeTruthy();
  });

  it("renders the main title correctly", () => {
    const { getByText } = render(<WelcomeIntroScreen />);
    const mainTitle = getByText("So what is\nStrive\nabout ?");
    expect(mainTitle).toBeTruthy();
  });

  it("renders the small title correctly", () => {
    const { getByText } = render(<WelcomeIntroScreen />);
    const smallTitle = getByText("Participating in Weekly challenges !");
    expect(smallTitle).toBeTruthy();
  });

  it("renders the description text correctly", () => {
    const { getByText } = render(<WelcomeIntroScreen />);
    const description = getByText(
      "Compete with your friends and people around you\nBecome the goat and win prizes!",
    );
    expect(description).toBeTruthy();
  });

  it("renders the logo image correctly", () => {
    const { getByTestId } = render(<WelcomeIntroScreen />);
    const logoImage = getByTestId("test-image");
    expect(logoImage).toBeTruthy();
  });
});
