import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { BottomBar } from "@/src/views/components/navigation/bottom_bar";

// Mock du ViewModel
jest.mock("@/src/viewmodels/components/navigation/BottomBarViewModel", () => ({
    useBottomBarViewModel: jest.fn(),
}));

describe("BottomBar Component", () => {

    const mockUseBottomBarViewModel =
    require("@/src/viewmodels/components/navigation/BottomBarViewModel").useBottomBarViewModel;

  it("renders correctly the component", () => {
    mockUseBottomBarViewModel.mockReturnValue({
        color: "white",
      });

    const { getByTestId } = render(
        <BottomBar
            leftIcon="icon"
            leftAction={() => {}}
            centerIcon=""
            centerAction={() => {}}
            rightIcon=""
            rightAction={() => {}}
            colorType="white"
        />
  );

  expect(getByTestId("bottom-bar")).toBeTruthy();
  });

  it("renders correctly the icons and execute the actions", async () => {
    mockUseBottomBarViewModel.mockReturnValue({
        color: "white",
      });
    const mockLeftAction = jest.fn();
    const mockCenterAction = jest.fn();
    const mockRightAction = jest.fn();

    const { getByTestId } = render(
        <BottomBar
            leftIcon="left-icon"
            leftAction={mockLeftAction}
            centerIcon="center-icon"
            centerAction={mockCenterAction}
            rightIcon="right-icon"
            rightAction={mockRightAction}
            colorType="white"
        />
  );

  expect(getByTestId("bottom-left-icon-left-icon")).toBeTruthy();
  expect(getByTestId("bottom-right-icon-right-icon")).toBeTruthy();
  expect(getByTestId("bottom-center-icon-center-icon")).toBeTruthy();

  // Press the icons
  await waitFor(() => {
    fireEvent.press(getByTestId("bottom-left-icon-left-icon"));
    fireEvent.press(getByTestId("bottom-right-icon-right-icon"));
    fireEvent.press(getByTestId("bottom-center-icon-center-icon"));
  });

    expect(mockLeftAction).toHaveBeenCalled();
    expect(mockCenterAction).toHaveBeenCalled();
    expect(mockRightAction).toHaveBeenCalled

  });

  it("renders correctly a empty placeholder ", () => {

    mockUseBottomBarViewModel.mockReturnValue({
        color: "white",
      });

    const { getByTestId } = render(
        <BottomBar
            leftIcon={undefined}
            leftAction={() => {}}
            centerIcon={undefined}
            centerAction={() => {}}
            rightIcon={undefined}
            rightAction={() => {}}
            colorType="white"
        />
  );

  expect(getByTestId("empty-bar")).toBeTruthy();
});
});