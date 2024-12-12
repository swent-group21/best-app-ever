import React from "react";
import { render } from "@testing-library/react-native";
import { ChallengeDescription } from "@/src/views/components/challenge/Challenge_Description";


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
    />
  );

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
    />
  );

  expect(getByText("Title")).toBeTruthy();
  expect(getByText("Description")).toBeTruthy();
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
    />
  );

  expect(getByText("Title")).toBeTruthy();
  expect(getByText("Description")).toBeTruthy();
  });
});