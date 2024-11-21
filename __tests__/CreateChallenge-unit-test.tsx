import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CreateChallengeScreen from "@/app/screens/create/create_challenge";
import { Colors } from "@/constants/Colors";

jest.mock("expo-location", () => ({
  useForegroundPermissions: jest.fn(() => [null, jest.fn()]),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({ coords: { latitude: 10, longitude: 20 } }),
  ),
}));

jest.mock("@/types/ChallengeBuilder", () => ({
  createChallenge: jest.fn(),
}));

describe("CreateChallengeScreen", () => {
  const navigationMock = { navigate: jest.fn() };
  const firestoreCtrlMock = {};

  it("handles text input for challenge name and description", () => {
    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={navigationMock}
        image_id="test-image"
        firestoreCtrl={firestoreCtrlMock}
      />,
    );

    // Get the input fields
    const challengeNameInput = getByTestId("Challenge-Name-Input");
    const descriptionInput = getByTestId("Description-Input");

    // Change the text in the input fields
    fireEvent.changeText(challengeNameInput, "Test Challenge Name");
    fireEvent.changeText(descriptionInput, "This is a test description");

    // Verify the text has been updated
    expect(challengeNameInput.props.value).toBe("Test Challenge Name");
    expect(descriptionInput.props.value).toBe("This is a test description");
  });

  it("toggles the location switch and requests permissions", async () => {
    const requestPermissionMock = jest.fn();

    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={navigationMock}
        image_id="test-image"
        firestoreCtrl={firestoreCtrlMock}
      />,
    );

    // Get the switch element
    const switchElement = getByTestId("switch-button");

    // Toggle the switch
    fireEvent(switchElement, "valueChange", true);

    // Verify the permission has been called
    expect(requestPermissionMock).toHaveBeenCalled();
    expect(switchElement.props.thumbColor).toBe(Colors.light.tint);
  });

  it("calls makeChallenge and navigates to Home", async () => {
    const createChallengeMock = jest.requireMock(
      "@/types/ChallengeBuilder",
    ).createChallenge;

    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={navigationMock}
        image_id="test-image"
        firestoreCtrl={firestoreCtrlMock}
      />,
    );

    // Get the input fields
    const challengeNameInput = getByTestId("Challenge-Name-Input");
    const descriptionInput = getByTestId("Description-Input");
    const createButton = getByTestId("input-arrow-forward");

    // Create the challenge
    fireEvent.changeText(challengeNameInput, "Test Challenge Name");
    fireEvent.changeText(descriptionInput, "This is a test description");
    fireEvent.press(createButton);

    // Verify the challenge has been created
    await waitFor(() => {
      expect(createChallengeMock).toHaveBeenCalledWith(
        firestoreCtrlMock,
        "Test Challenge Name",
        expect.any(Date),
        "This is a test description",
        undefined, // Since location is disabled
      );
      expect(navigationMock.navigate).toHaveBeenCalledWith("Home");
    });
  });

  it("handles error during challenge creation", async () => {
    const createChallengeMock = jest
      .requireMock("@/types/ChallengeBuilder")
      .createChallenge.mockRejectedValue(
        new Error("Challenge creation failed"),
      );

    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={navigationMock}
        image_id="test-image"
        firestoreCtrl={firestoreCtrlMock}
      />,
    );

    // Get the input fields
    const challengeNameInput = getByTestId("Challenge-Name-Input");
    const descriptionInput = getByTestId("Description-Input");
    const createButton = getByTestId("input-arrow-forward");

    // Create the challenge
    fireEvent.changeText(challengeNameInput, "Test Challenge Name");
    fireEvent.changeText(descriptionInput, "This is a test description");
    fireEvent.press(createButton);

    // Verify the challenge has been created and failed
    await waitFor(() => {
      expect(createChallengeMock).toHaveBeenCalled();
      expect(navigationMock.navigate).not.toHaveBeenCalled();
    });
  });
});
