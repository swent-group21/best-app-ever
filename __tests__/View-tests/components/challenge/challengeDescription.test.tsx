import React from "react";
import { render } from "@testing-library/react-native";
import { ChallengeDescription } from "@/src/views/components/challenge/Challenge_Description";

// Test the ChallengeDescription component
describe("ChallengeDescription Component", () => {
  it("renders correctly the component", () => {
    const { getByTestId } = render(
      <ChallengeDescription
        dBChallengeDescription={{
          title: "Title",
          description: "Description",
          endDate: new Date(),
        }}
        onTimerFinished={() => {}}
        testID={"Description-test-id"}
      />,
    );

    // Check if the component is rendered
    expect(getByTestId("Description-test-id")).toBeTruthy();
  });

  it("renders correctly the title and descriptio ", () => {
    const { getByText } = render(
      <ChallengeDescription
        dBChallengeDescription={{
          title: "Title",
          description: "Description",
          endDate: new Date(),
        }}
        onTimerFinished={() => {}}
        testID={"Description-test-id"}
      />,
    );

    // Check if the texts are rendered
    expect(getByText("Title")).toBeTruthy();
    expect(getByText("Description")).toBeTruthy();
  });
});
