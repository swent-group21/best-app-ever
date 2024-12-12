import React from "react";
import { render } from "@testing-library/react-native";
import NumberCard from "@/src/views/components/challenge/number_cards";

// Mock du ViewModel
jest.mock("@/src/viewmodels/components/challenge/NumberCardsViewModel", () => ({
  useNumberCardsViewModel: jest.fn(),
}));


describe("NumberCard Component", () => {
  const mockUseNumberCardsViewModel =
    require("@/src/viewmodels/components/challenge/NumberCardsViewModel").useNumberCardsViewModel;


  it("renders correctly with default number", () => {
    mockUseNumberCardsViewModel.mockReturnValue({
      renderNumber: "00",
    });
    
    const { getByText } = render(
    <NumberCard 
      number={0} 
      testID={""} 
    />
  );
    const numberElement = getByText("00"); // Default value
    expect(numberElement).toBeTruthy();
  });

  it("renders correctly with a single-digit number", () => {
    mockUseNumberCardsViewModel.mockReturnValue({
      renderNumber: "12",
    });
    const { getByText } = render(<NumberCard number={5} />);
    const numberElement = getByText("12"); // Single-digit numbers should be zero-padded
    expect(numberElement).toBeTruthy();
  });
});