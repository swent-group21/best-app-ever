import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { ThemedTextButton } from "@/src/views/components/theme/themed_text_button";


// Mock du ViewModel
jest.mock("@/src/viewmodels/components/theme/ThemedTextButtonViewModel", () => ({
    useThemedTextButtonViewModel: jest.fn(),
}));

describe("ThemedTextButton Component", () => {

    const mockUseThemedTextButtonViewModel =
    require("@/src/viewmodels/components/theme/ThemedTextButtonViewModel").useThemedTextButtonViewModel;

    beforeEach(() => {
        mockUseThemedTextButtonViewModel.mockReturnValue({
            color: Colors["light"]["backgroundPrimary"],
        });
    });

    it("renders correctly the component", () => {
        
        // Render the component with all basic values
        const { getByTestId } = render(
            <ThemedTextButton
                lightColor=""
                darkColor=""
                onPress={() => {}}
                style={{}}
                textStyle={{}}
                textType="title"
                colorType="backgroundPrimary"
                testID="themed-text-button"
                text="text-test"
            />
    );

    expect(getByTestId("themed-text-button")).toBeTruthy();
    });


    it("renders the right text", async () => {
        
        const { getByText } = render(
            <ThemedTextButton
                lightColor=""
                darkColor=""
                onPress={() => {}}
                style={{}}
                textStyle={{}}
                textType="title"
                colorType="backgroundPrimary"
                testID="themed-icon-button"
                text="text-test"
            />
    );

    // Check if the text is rendered
    expect(getByText("text-test")).toBeTruthy();
    });
});