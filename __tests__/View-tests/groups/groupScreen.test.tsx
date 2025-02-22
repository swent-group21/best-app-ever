import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import GroupScreen from "@/src/views/groups/group_screen";
import useGroupScreenViewModel from "@/src/viewmodels/groups/GroupScreenViewModel";
import { DBChallenge, DBUser } from "@/src/models/firebase/TypeFirestoreCtrl";

const mockChallenge1: DBChallenge = {
  caption: "Challenge Test 1",
  uid: "1234",
  group_id: "1234",
  challenge_description: "Title Test",
};
const mockChallenge2: DBChallenge = {
  caption: "Challenge Test 2",
  uid: "12345678",
  group_id: "1234",
  challenge_description: "Title Test",
};
const mockGroupChallenges: DBChallenge[] = [mockChallenge1, mockChallenge2];

const mockGroup = {
  group_id: "1234_5679",
  group_name: "Group Test 1",
  group_challenge_title: "Challenge Test 1",
};
const mockOtherGroups = [mockGroup];

const mockUser: DBUser = {
  uid: "1234",
  name: "Test User",
  email: "test@gmail.com",
  createdAt: new Date(),
};

// Mock the useGroupScreenViewModel hook
jest.mock("@/src/viewmodels/groups/GroupScreenViewModel", () =>
  jest.fn(() => ({
    groupChallenges: mockGroupChallenges,
    otherGroups: mockOtherGroups,
    groupName: "Test Name",
    groupChallengeTitle: "Title Test",
    groupId: "1234",
    groupCenter: { latitude: 0, longitude: 0 },
    groupRadius: 100,
  })),
);

jest.mock("expo-font", () => ({
  useFonts: jest.fn(() => [true]),
  isLoaded: jest.fn(() => true),
}));

jest.mock("@/src/models/firebase/GetFirestoreCtrl", () => ({
  getUser: jest.fn(),
  getLikesOf: jest.fn().mockResolvedValue([]),
  getCommentsOf: jest.fn().mockResolvedValue([]),
}));

jest.mock("@/src/models/firebase/SetFirestoreCtrl", () => ({
  updatesLikesOf: jest.fn(),
}));

describe("Group Screen renders challenges", () => {
  const mockUseGroupScreenViewModel =
    require("@/src/viewmodels/groups/GroupScreenViewModel").useGroupScreenViewModel;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the group screen", async () => {
    const { getByTestId } = render(
      <GroupScreen user={mockUser} navigation={{}} route={{}} />,
    );
    await waitFor(() => {
      expect(getByTestId("group-screen")).toBeTruthy();
    });
  });

  it("renders the group name", async () => {
    const { getByTestId } = render(
      <GroupScreen user={mockUser} navigation={{}} route={{}} />,
    );
    await waitFor(() => {
      expect(getByTestId("topTitle-Test Name")).toBeTruthy();
    });
  });

  it("renders the home button", async () => {
    const { getByTestId } = render(
      <GroupScreen user={mockUser} navigation={{}} route={{}} />,
    );
    await waitFor(() => {
      expect(getByTestId("home-button")).toBeTruthy();
    });
  });

  it("renders the other groups icons", async () => {
    const { getByTestId } = render(
      <GroupScreen user={mockUser} navigation={{}} route={{}} />,
    );
    await waitFor(() => {
      expect(getByTestId("group-id-0")).toBeTruthy();
    });
  });

  it("renders the create group button", async () => {
    const { getByTestId } = render(
      <GroupScreen user={mockUser} navigation={{}} route={{}} />,
    );
    await waitFor(() => {
      expect(getByTestId("create-group-button")).toBeTruthy();
    });
  });

  it("renders the group challenge title", async () => {
    const { getByTestId } = render(
      <GroupScreen user={mockUser} navigation={{}} route={{}} />,
    );
    await waitFor(() => {
      expect(getByTestId("description-id-Test Name")).toBeTruthy();
    });
  });

  it("renders all the challenges", async () => {
    const { getByTestId } = render(
      <GroupScreen user={mockUser} navigation={{}} route={{}} />,
    );
    await waitFor(() => {
      expect(getByTestId("challenge-id-0")).toBeTruthy();
      expect(getByTestId("challenge-id-1")).toBeTruthy();
    });
  });
});
