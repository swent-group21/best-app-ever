import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import GroupScreen from "../../../src/app/views/group/GroupScreen";
import useGroupScreenViewModel from "../../../src/app/viewmodels/group/GroupScreenViewModel";
import { DBChallenge } from "../../../src/app/models/firebase/FirestoreCtrl";
import { View } from "react-native";

// Mock de useGroupScreenViewModel
jest.mock("../../../src/app/viewmodels/group/GroupScreenViewModel");
jest.mock("expo-font", () => ({
  useFonts: jest.fn(() => [true]),
  isLoaded: jest.fn(() => true),
}));

const mockFirestoreCtrl = {
  getUser: jest.fn(),
  getLikesOf: jest.fn(() => Promise.resolve([])),
  updateLikesOf: jest.fn(),
};
const mockNavigation = {
  navigate: jest.fn(),
};

const mockGroup = {
  group_id: "1234_5679",
  group_name: "Group Test 1",
  group_challenge_title: "Challenge Test 1",
};
const mockOtherGroups = [mockGroup];

describe("Group Screen renders challenges", () => {
  const mockChallenge1: DBChallenge = {
    challenge_name: "Challenge Test 1",
    description: "Description Test 1",
    uid: "1234",
    group_id: "1234",
  };
  const mockChallenge2: DBChallenge = {
    challenge_name: "Challenge Test 2",
    description: "Description Test 2",
    uid: "12345678",
    group_id: "1234",
  };

  const mockGroupChallenges: DBChallenge[] = [mockChallenge1, mockChallenge2];

  beforeEach(() => {
    // Mock the return value of useGroupScreenViewModel
    (useGroupScreenViewModel as jest.Mock).mockReturnValue({
      groupChallenges: mockGroupChallenges,
      otherGroups: mockOtherGroups,
      groupName: "Group Testing Name",
      groupChallengeTitle: "Group Testing Challenge Title",
      groupId: "1234",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to home when clicking the home button", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={mockNavigation}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    fireEvent.press(getByTestId("home-pressable-button"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
    expect(getByTestId("home-button")).toBeTruthy();
  });

  it("navigates to group when clicking to specific button", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={mockNavigation}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    fireEvent.press(getByTestId("group-pressable-button"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("GroupScreen", {
      currentGroup: mockGroup,
    });
  });

  it("navigate to CreateGroup screen when button + clicked", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={mockNavigation}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    fireEvent.press(getByTestId("create-group-pressable-button"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("CreateGroup");
  });

  it("navigates to Camera with group informations when clicked", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={mockNavigation}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    fireEvent.press(getByTestId("bottom-center-icon-camera-outline"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Camera", {
      group_id: "1234",
    });
  });
});
