import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/src/views/components/theme/themed_view";


// Mock du ViewModel
jest.mock("@/src/viewmodels/components/theme/ThemedViewModel", () => ({
    useThemedViewModel: jest.fn(),
}));

describe("ThemedText Component", () => {

    const mockUseThemedViewModel =
    require("@/src/viewmodels/components/theme/ThemedViewModel").useThemedViewModel;

    beforeEach(() => {
        mockUseThemedViewModel.mockReturnValue({
            backgroundColor: Colors["light"]["white"],
        });
    });

    it("renders correctly the component", () => {
        
        // Render the component with all basic values
        const { getByTestId } = render(
            <ThemedView
                lightColor=""
                darkColor=""
                colorType="white"
            />
    );

    expect(getByTestId("themed-view-id")).toBeTruthy();
    });

});