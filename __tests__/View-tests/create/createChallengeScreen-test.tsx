import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CreateChallengeScreen from "@/src/views/create/create_challenge";
import CreateChallengeViewModel from "@/src/viewmodels/create/CreateChallengeViewModel";
import { Switch } from "react-native-gesture-handler";

jest.mock("@/src/viewmodels/create/CreateChallengeViewModel");

describe("CreateChallengeScreen UI Tests", () => {
  const mockSetCaption = jest.fn();
  const mockToggleLocation = jest.fn();
  const mockMakeChallenge = jest.fn();

  beforeEach(() => {
    (CreateChallengeViewModel as jest.Mock).mockReturnValue({
      caption: "Test Caption",
      setCaption: mockSetCaption,
      postImage: "Test Image",
      isLocationEnabled: true,
      toggleLocation: mockToggleLocation,
      makeChallenge: mockMakeChallenge,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Create Challenge screen", () => {
    const { getByTestId } = render(
      <CreateChallengeScreen navigation={{}} route={{}} firestoreCtrl={{}} />,
    );

    const screenTitle = getByTestId("Create-Challenge-Text");
    expect(screenTitle).toBeTruthy();
  });

  it("renders the Caption input", () => {
    const { getByTestId } = render(
      <CreateChallengeScreen navigation={{}} route={{}} firestoreCtrl={{}} />,
    );

    const captionInput = getByTestId("Caption-Input");
    expect(captionInput).toBeTruthy();

    fireEvent.changeText(captionInput, "Updated Caption Name");
    expect(mockSetCaption).toHaveBeenCalledWith("Updated Caption Name");
  });

});
