import React from "react";
import { render } from "@testing-library/react-native";
import NumberCard from "@/src/components/home/number_cards";

describe("NumberCard Component", () => {
  it("renders correctly with default number", () => {
    const { getByText } = render(<NumberCard />);
    const numberElement = getByText("00"); // Default value
    expect(numberElement).toBeTruthy();
  });

  it("renders correctly with a single-digit number", () => {
    const { getByText } = render(<NumberCard number={5} />);
    const numberElement = getByText("05"); // Single-digit numbers should be zero-padded
    expect(numberElement).toBeTruthy();
  });

  it("renders correctly with a two-digit number", () => {
    const { getByText } = render(<NumberCard number={12} />);
    const numberElement = getByText("12"); // No padding needed for two-digit numbers
    expect(numberElement).toBeTruthy();
  });

  it("renders correctly with a negative number", () => {
    const { getByText } = render(<NumberCard number={-5} />);
    const numberElement = getByText("00"); // Negative numbers should display "00"
    expect(numberElement).toBeTruthy();
  });

  it("renders correctly with zero", () => {
    const { getByText } = render(<NumberCard number={0} />);
    const numberElement = getByText("00"); // Zero should display as "00"
    expect(numberElement).toBeTruthy();
  });

  it("renders correctly with large numbers", () => {
    const { getByText } = render(<NumberCard number={12345} />);
    const numberElement = getByText("12345"); // Large numbers should display as-is
    expect(numberElement).toBeTruthy();
  });
});
