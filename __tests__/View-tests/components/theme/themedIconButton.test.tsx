import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { ThemedIconButton } from "@/src/views/components/theme/themed_icon_button";


// Mock du ViewModel
jest.mock("@/src/viewmodels/components/theme/ThemedIconButtonViewModel", () => ({
    useThemedIconButtonViewModel: jest.fn(),
}));

describe("ThemedIconButton Component", () => {

    const mockUseThemedIconButtonViewModel =
    require("@/src/viewmodels/components/theme/ThemedIconButtonViewModel").useThemedIconButtonViewModel;

    beforeEach(() => {
        mockUseThemedIconButtonViewModel.mockReturnValue({
            color: Colors["light"]["backgroundPrimary"],
        });
    });

    it("renders correctly the component", () => {
        
        // Render the component with all basic values
        const { getByTestId } = render(
            <ThemedIconButton
                lightColor=""
                darkColor=""
                onPress={() => {}}
                iconType = "ionicon"
                size={20}
                paddingLeft={10}
                colorType="backgroundPrimary"
                testID="themed-icon-button"
                name="icon-name"
            />
    );

    expect(getByTestId("themed-icon-button")).toBeTruthy();
    });


    it("calls the right onPress method", async () => {
        const mockOnPress = jest.fn();
        
        const { getByTestId } = render(
            <ThemedIconButton
                lightColor=""
                darkColor=""
                onPress={mockOnPress}
                iconType = "ionicon"
                size={20}
                paddingLeft={10}
                colorType="backgroundPrimary"
                testID="themed-icon-button"
                name="icon-name"
            />
    );

    // Press the icons
    await waitFor(() => {
        fireEvent.press(getByTestId("themed-icon-button"));
    });

    // Check if the onPress method has been called
    expect(mockOnPress).toHaveBeenCalled();
    });
});