import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { ThemedTextInput } from "@/src/views/components/theme/themed_text_input";

// Mock du ViewModel
jest.mock("@/src/viewmodels/components/theme/ThemedTextInputViewModel", () => ({
  useThemedTextInputViewModel: jest.fn(),
}));

describe("ThemedTextInput Component", () => {
  const mockUseThemedTextInputViewModel =
    require("@/src/viewmodels/components/theme/ThemedTextInputViewModel").useThemedTextInputViewModel;

  const mockGetInputProps = jest.fn();

  beforeEach(() => {
    mockUseThemedTextInputViewModel.mockReturnValue({
      color: Colors["light"]["backgroundPrimary"],
      borderColor: Colors["light"]["backgroundPrimary"],
      getInputProps: mockGetInputProps,
    });
  });

  it("renders correctly the component", () => {
    // Render the component with all basic values
    const { getByTestId } = render(
      <ThemedTextInput
        lightColor=""
        darkColor=""
        onPress={() => {}}
        style={{}}
        title=""
        titleStyle={{}}
        colorType="backgroundPrimary"
        testID="themed-text-input"
      />,
    );

    expect(getByTestId("themed-text-input")).toBeTruthy();
  });

  it("renders correctly the text and basic value of getInputProps", () => {
    // Render the component with all basic values
    const { getByText } = render(
      <ThemedTextInput
        lightColor=""
        darkColor=""
        onPress={() => {}}
        style={{}}
        title="title-test"
        titleStyle={{}}
        colorType="backgroundPrimary"
        testID="themed-text-input"
      />,
    );

    expect(getByText("title-test")).toBeTruthy();
    expect(mockGetInputProps).toHaveBeenCalledWith("none");
  });

  it("calls get input props with the email value", async () => {
    const { getByText } = render(
      <ThemedTextInput
        lightColor=""
        darkColor=""
        onPress={() => {}}
        style={{}}
        title=""
        titleStyle={{}}
        type="email"
        colorType="backgroundPrimary"
        testID="themed-text-input"
      />,
    );

    // Check if the getInputProps function has been called with the email value
    expect(mockGetInputProps).toHaveBeenCalledWith("email");
  });

  it("calls get input props with the password value", async () => {
    const { getByText } = render(
      <ThemedTextInput
        lightColor=""
        darkColor=""
        onPress={() => {}}
        style={{}}
        title=""
        titleStyle={{}}
        type="password"
        colorType="backgroundPrimary"
        testID="themed-text-input"
      />,
    );

    // Check if the getInputProps function has been called with the email value
    expect(mockGetInputProps).toHaveBeenCalledWith("password");
  });
});
