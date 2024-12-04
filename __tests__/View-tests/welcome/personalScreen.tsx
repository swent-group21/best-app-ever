import React from "react";
import { render } from "@testing-library/react-native";
import WelcomeConceptScreen from "../../../src/app/views/welcome/personal_screen";

describe("WelcomeConceptScreen UI Tests", () => {
  it("renders the main container", () => {
    const { getByTestId } = render(<WelcomeConceptScreen />);
    const container = getByTestId("container");
    expect(container).toBeTruthy();
  });

  it("renders the background shape", () => {
    const { getByTestId } = render(<WelcomeConceptScreen />);
    const ovalShape = getByTestId("ovalShape");
    expect(ovalShape).toBeTruthy();
  });

  it("renders the main title correctly", () => {
    const { getByText } = render(<WelcomeConceptScreen />);
    const mainTitle = getByText("Building up memories ");
    expect(mainTitle).toBeTruthy();
  });

  it("renders the description text correctly", () => {
    const { getByText } = render(<WelcomeConceptScreen />);
    const description = getByText(
      "Create and share your memories with your friends\nGet rewarded for your creativity"
    );
    expect(description).toBeTruthy();
  });

  it("renders the image correctly", () => {
    const { getByTestId } = render(<WelcomeConceptScreen />);
    const image = getByTestId("challenge-image");
    expect(image).toBeTruthy();
  });
});
