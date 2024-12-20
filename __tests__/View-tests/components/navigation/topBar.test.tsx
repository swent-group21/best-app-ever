import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { TopBar } from "@/src/views/components/navigation/top_bar";

// Mock du ViewModel
jest.mock("@/src/viewmodels/components/navigation/TopBarViewModel", () => ({
  useTopBarViewModel: jest.fn(),
}));

describe("TopBar Component", () => {
  const mockUseTopBarViewModel =
    require("@/src/viewmodels/components/navigation/TopBarViewModel").useTopBarViewModel;

  it("renders correctly the component", () => {
    mockUseTopBarViewModel.mockReturnValue({
      color: "white",
      isLeftPP: jest.fn(() => false),
      isRightPP: jest.fn(() => false),
    });

    const { getByTestId } = render(
      <TopBar
        leftIcon="icon"
        leftAction={() => {}}
        rightIcon=""
        rightAction={() => {}}
        title=""
        colorType="white"
      />,
    );

    expect(getByTestId("top-bar")).toBeTruthy();
  });

  it("renders correctly the icons and execute the actions", async () => {
    const mockLeftPP = jest.fn(() => false);
    const mockRightPP = jest.fn(() => false);

    mockUseTopBarViewModel.mockReturnValue({
      color: "white",
      isLeftPP: mockLeftPP,
      isRightPP: mockRightPP,
    });
    const mockLeftAction = jest.fn();
    const mockRightAction = jest.fn();

    const { getByTestId } = render(
      <TopBar
        leftIcon="left-icon"
        leftAction={mockLeftAction}
        rightIcon="right-icon"
        rightAction={mockRightAction}
        title="title"
        colorType="white"
      />,
    );

    expect(getByTestId("topLeftIcon-left-icon")).toBeTruthy();
    expect(getByTestId("topRightIcon-right-icon")).toBeTruthy();
    expect(getByTestId("topTitle-title")).toBeTruthy();

    // Press the icons
    await waitFor(() => {
      fireEvent.press(getByTestId("topLeftIcon-left-icon"));
      fireEvent.press(getByTestId("topRightIcon-right-icon"));
    });

    // Check if the actions are called
    expect(mockLeftAction).toHaveBeenCalled();
    expect(mockRightAction).toHaveBeenCalled;
  });

  it("renders correctly images", () => {
    const mockLeftPP = jest.fn(() => true);
    const mockRightPP = jest.fn(() => true);

    mockUseTopBarViewModel.mockReturnValue({
      color: "white",
      isLeftPP: mockLeftPP,
      isRightPP: mockRightPP,
    });

    const mockLeftAction = jest.fn();
    const mockCenterAction = jest.fn();
    const mockRightAction = jest.fn();

    const { getByTestId } = render(
      <TopBar
        leftIcon="left-icon"
        leftAction={mockLeftAction}
        rightIcon="right-icon"
        rightAction={mockRightAction}
        title="title"
        colorType="white"
      />,
    );

    expect(getByTestId("topLeftImage-left-icon")).toBeTruthy();
    expect(getByTestId("topRightImage-right-icon")).toBeTruthy();
  });
});
