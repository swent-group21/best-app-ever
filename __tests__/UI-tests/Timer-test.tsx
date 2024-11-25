import React from "react";
import { render, act } from "@testing-library/react-native";
import Timer from "@/components/home/timer";

jest.useFakeTimers(); // Use Jest's fake timers

describe("Timer Component - Individual Time Units", () => {
  it("displays the correct minutes when less than an hour is left", () => {
    const endDate = new Date(Date.now() + 1000 * 60 * 45); // 45 minutes from now
    const { getByText } = render(
      <Timer endDate={endDate} onTimerFinished={jest.fn()} />,
    );

    // Assert that the minutes are correctly calculated and displayed
    expect(getByText("45")).toBeTruthy(); // Minutes
  });

  it("updates seconds correctly over time", () => {
    const endDate = new Date(Date.now() + 1000 * 5); // 5 seconds from now
    const { getByText } = render(
      <Timer endDate={endDate} onTimerFinished={jest.fn()} />,
    );

    // Check initial state
    expect(getByText("05")).toBeTruthy(); // Seconds

    // Advance by 1 second
    act(() => {
      jest.advanceTimersByTime(1000); // Fast-forward 1 second
    });
    expect(getByText("04")).toBeTruthy(); // Seconds decrease
  });

  it("displays the correct hours when more than an hour is left", () => {
    const endDate = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2 hours from now
    const { getByText } = render(
      <Timer endDate={endDate} onTimerFinished={jest.fn()} />,
    );

    // Assert that the hours are correctly calculated and displayed
    expect(getByText("02")).toBeTruthy(); // Hours
  });

  it("displays the correct days when more than a day is left", () => {
    const endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days from now
    const { getByText } = render(
      <Timer endDate={endDate} onTimerFinished={jest.fn()} />,
    );

    // Assert that the days are correctly calculated and displayed
    expect(getByText("03")).toBeTruthy(); // Days
  });

  it("calls onTimerFinished when the timer reaches zero", () => {
    const onTimerFinished = jest.fn();
    const endDate = new Date(Date.now() + 1000 * 3); // 3 seconds from now
    render(<Timer endDate={endDate} onTimerFinished={onTimerFinished} />);

    // Fast-forward to after the timer ends
    act(() => {
      jest.advanceTimersByTime(4000); // 4 seconds to exceed the timer
    });

    expect(onTimerFinished).toHaveBeenCalledTimes(1);
  });
});
