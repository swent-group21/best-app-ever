import React from "react";
import { render } from "@testing-library/react-native";
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

const mockOtherGroups = [
  {
    group_id: "1234_5679",
    group_name: "Group Test 1",
    group_challenge_title: "Challenge Test 1",
  },
  {
    group_id: "1234567890",
    group_name: "Group Test 2",
    group_challenge_title: "Challenge Test 2",
  },
];

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

  it("renders the group screen", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={{}}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );
    expect(getByTestId("group-screen")).toBeTruthy();
  });

  it("renders the group name", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={{}}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );
    expect(getByTestId("topTitle-Group Testing Name")).toBeTruthy();
  });

  it("renders the home button", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={{}}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );
    expect(getByTestId("home-button")).toBeTruthy();
  });

  it("renders the other groups icons", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={{}}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );
    expect(getByTestId("group-id-0")).toBeTruthy();
    expect(getByTestId("group-id-1")).toBeTruthy();
  });

  it("renders the create group button", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={{}}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );
    expect(getByTestId("create-group-button")).toBeTruthy();
  });

  it("renders the group challenge title", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={{}}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );
    expect(getByTestId("description-id")).toBeTruthy();
  });

  it("renders all the challenges", () => {
    const { getByTestId } = render(
      <GroupScreen
        user={{}}
        navigation={{}}
        route={{}}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );
    expect(getByTestId("challenge-id-0")).toBeTruthy();
    expect(getByTestId("challenge-id-1")).toBeTruthy();
  });
});

describe("Group Screen renders challenges", () => {
  const groupChallenges: DBChallenge[] = [];

  beforeEach(() => {
    // Mock the return value of useGroupScreenViewModel
    (useGroupScreenViewModel as jest.Mock).mockReturnValue({
      groupChallenges: [],
      otherGroups: mockOtherGroups,
      groupName: "Group Testing Name",
      groupChallengeTitle: "Group Testing Challenge Title",
      groupId: "1234",
    });
  });

  it("renders correct message when no challenge to display", () => {
    const { getByTestId } = render(
      <GroupScreen user={{}} navigation={{}} route={{}} firestoreCtrl={{}} />,
    );
    expect(getByTestId("no-challenge-id")).toBeTruthy();
  });
});
