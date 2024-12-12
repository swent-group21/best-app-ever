import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { ThemedIconButton } from "@/src/views/components/theme/themed_icon_button";
import { ThemedScrollView } from "@/src/views/components/theme/themed_scroll_view";


// Mock du ViewModel
jest.mock("@/src/viewmodels/components/theme/ThemedScrollViewModel", () => ({
    useThemedScrollViewModel: jest.fn(),
}));

describe("ThemedScrollView Component", () => {

    const mockUseThemedScrollViewModel =
    require("@/src/viewmodels/components/theme/ThemedScrollViewModel").useThemedScrollViewModel;

    beforeEach(() => {
        mockUseThemedScrollViewModel.mockReturnValue({
            backgroundColor: Colors["light"]["white"],
        });
    });

    it("renders correctly the component", () => {
        
        // Render the component with all basic values
        const { getByTestId } = render(
            <ThemedScrollView
                lightColor=""
                darkColor=""
                colorType="white"
            />
    );

    expect(getByTestId("scroll-view-id")).toBeTruthy();
    });

});