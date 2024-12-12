import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/src/views/components/theme/themed_text";


// Mock du ViewModel
jest.mock("@/src/viewmodels/components/theme/ThemedTextViewModel", () => ({
    useThemedTextViewModel: jest.fn(),
}));

describe("ThemedText Component", () => {

    const mockUseThemedTextViewModel =
    require("@/src/viewmodels/components/theme/ThemedTextViewModel").useThemedTextViewModel;

    beforeEach(() => {
        mockUseThemedTextViewModel.mockReturnValue({
            backgroundColor: Colors["light"]["white"],
        });
    });

    it("renders correctly the component", () => {
        
        // Render the component with all basic values
        const { getByTestId } = render(
            <ThemedText
                lightColor=""
                darkColor=""
                colorType="white"
            />
    );

    expect(getByTestId("themed-text-id")).toBeTruthy();
    });

});