import React from "react";
import { render, act } from "@testing-library/react-native";
import Timer from "@/components/home/timer";
import NumberCard from "@/components/home/number_cards";

jest.mock("@/components/home/number_cards", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return ({ number }: { number: number }) => <Text testID="number-card">{number}</Text>;
});

describe("Timer Component", () => {
  beforeAll(() => {
    jest.useFakeTimers(); // Mock timers to control time progression
  });

  afterAll(() => {
    jest.useRealTimers(); // Restore real timers after tests
  });

  it("renders correctly with initial time difference", () => {
    const startDate = new Date(Date.now() + 86400000).toISOString(); // 1 day in the future
    const { getAllByTestId, getByText } = render(
      <Timer startDate={startDate} onTimerFinished={jest.fn()} />
    );

    const numberCards = getAllByTestId("number-card");
    expect(numberCards).toHaveLength(4); // Ensure there are 4 NumberCard components

  });

  it("calculates initial time values correctly", () => {
    const startDate = new Date(Date.now() + 86461000).toISOString(); // 1 day + 1 hour + 1 minute + 1 second
    const { getAllByTestId } = render(
      <Timer startDate={startDate} onTimerFinished={jest.fn()} />
    );

    const numberCards = getAllByTestId("number-card");

    expect(numberCards[0].props.children).toBe(1); // Days
    expect(numberCards[1].props.children).toBe(0); // Hours
    expect(numberCards[2].props.children).toBe(1); // Minutes
    expect(numberCards[3].props.children).toBe(1); // Seconds
  });

  it("updates time values as time progresses", () => {
    const startDate = new Date(Date.now() + 10000).toISOString(); // 10 seconds in the future
    const { getAllByTestId } = render(
      <Timer startDate={startDate} onTimerFinished={jest.fn()} />
    );

    act(() => {
      jest.advanceTimersByTime(1000); // Simulate 1 second passing
    });

    const numberCardsAfter1s = getAllByTestId("number-card");
    expect(numberCardsAfter1s[3].props.children).toBe(9); // Seconds remaining

    act(() => {
      jest.advanceTimersByTime(9000); // Simulate 9 more seconds
    });

    const numberCardsAfter10s = getAllByTestId("number-card");
    expect(numberCardsAfter10s[3].props.children).toBe(0); // Seconds remaining should reach 0
  });

  it("calls onTimerFinished when the timer reaches zero", () => {
    const onTimerFinishedMock = jest.fn();
    const startDate = new Date(Date.now() + 3000).toISOString(); // 3 seconds in the future

    render(<Timer startDate={startDate} onTimerFinished={onTimerFinishedMock} />);

    act(() => {
      jest.advanceTimersByTime(3001); // Simulate 3 seconds passing
    });

    expect(onTimerFinishedMock).toHaveBeenCalledTimes(1); // Ensure the callback is called once
  });

  it("clears the interval when unmounted", () => {
    const startDate = new Date(Date.now() + 10000).toISOString(); // 10 seconds in the future
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = render(
      <Timer startDate={startDate} onTimerFinished={jest.fn()} />
    );

    unmount(); // Unmount the component
    expect(clearIntervalSpy).toHaveBeenCalled(); // Ensure interval is cleared
  });
});
