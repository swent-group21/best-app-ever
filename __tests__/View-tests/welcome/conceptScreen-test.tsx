import React from "react";
import { render } from "@testing-library/react-native";
import WelcomeConceptScreen from "../../../temp/src/views/welcome/concept_screen";

describe("WelcomeConceptScreen", () => {
  it("renders the container correctly", () => {
    const { getByTestId } = render(<WelcomeConceptScreen />);
    const container = getByTestId("container");

    expect(container).toBeTruthy();
  });

  it("renders the background shape", () => {
    const { getByTestId } = render(<WelcomeConceptScreen />);
    const ovalShape = getByTestId("ovalShape");

    expect(ovalShape).toBeTruthy();
    expect(ovalShape.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          position: "absolute",
          top: "70%",
          left: "-30%",
        }),
      ])
    );
  });

  it("renders the title text correctly", () => {
    const { getByText } = render(<WelcomeConceptScreen />);
    const titleText = getByText("Competing\nyourself");

    expect(titleText).toBeTruthy();
  });

  it("renders the description text correctly", () => {
    const { getByText } = render(<WelcomeConceptScreen />);
    const descriptionText = getByText(
      "Become the best version of yourself\nInteract with motivated people to reach your goals !prizes!"
    );

    expect(descriptionText).toBeTruthy();
  });

  it("ensures styles for the description text are applied", () => {
    const { getByText } = render(<WelcomeConceptScreen />);
    const descriptionText = getByText(
      "Become the best version of yourself\nInteract with motivated people to reach your goals !prizes!"
    );

    expect(descriptionText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textAlign: "center",
        }),
      ])
    );
  });
});
