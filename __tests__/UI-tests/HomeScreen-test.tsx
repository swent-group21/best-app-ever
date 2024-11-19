import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "@/app/screens/home/home_screen";

describe("HomeScreen Component", () => {
  // Test if the TopBar is rendered
  it("renders the TopBar", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("topBar")).toBeTruthy();
    expect(getByTestId("topTitle-Commute by foot")).toBeTruthy();
  });

  // Test if the TopBar icons are rendered
  it("renders the left icon in TopBar", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("topLeftIcon-people-outline")).toBeTruthy();
  });

  it("renders the right icon in TopBar", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("topRightIcon-person-circle-outline")).toBeTruthy();
  });

  // Test if the Challenge components are rendered
  it("renders at least a Challenge", () => {
    const { queryAllByTestId } = render(<HomeScreen />);
    expect(queryAllByTestId("challengeX")).toHaveLength(3);
  });

  // Test if the BottomBar is rendered
  it("renders the BottomBar", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("bottomBar")).toBeTruthy();
  });

  // Test if the BottomBar icons are rendered
  it("renders the left icon in BottomBar", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("bottomLeftIcon-map-outline")).toBeTruthy();
  });

  it("renders the center icon in BottomBar", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("bottomCenterIcon-camera-outline")).toBeTruthy();
  });

  it("renders the right icon in BottomBar", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("bottomRightIcon-trophy-outline")).toBeTruthy();
  });
});
