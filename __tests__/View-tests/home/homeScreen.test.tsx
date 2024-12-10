import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import HomeScreen from "@/src/views/home/home_screen";
import FirestoreCtrl from "@/src/models/firebase/FirestoreCtrl";

// Mock du ViewModel
jest.mock("@/src/viewmodels/home/HomeScreenViewModel", () => ({
  useHomeScreenViewModel: jest.fn(),
}));

jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => ({
    getChallengeDescription: jest.fn().mockResolvedValue({
      Title: "Mock Challenge",
      Description: "Mock Description",
      endDate: new Date(2024, 1, 1),
    }),
    getKChallenges: jest.fn().mockResolvedValue([
      {
        uid: "1",
        challenge_name: "Challenge 1",
        description: "Description 1",
      },
    ]),
    getGroupsByUserId: jest
      .fn()
      .mockResolvedValue([{ id: "1", name: "Group 1" }]),
    getLikesOf: jest.fn().mockResolvedValue([]),
    getUser: jest.fn().mockResolvedValue({
      uid: "12345",
      email: "test@example.com",
      name: "Test User",
      createdAt: new Date(),
    }),
  }));
});

describe("HomeScreen UI Tests", () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockFirestoreCtrl = new FirestoreCtrl();
  const mockUseHomeScreenViewModel =
    require("@/src/viewmodels/home/HomeScreenViewModel").useHomeScreenViewModel;

  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();

    // Mock les valeurs par défaut du ViewModel
    mockUseHomeScreenViewModel.mockReturnValue({
      userIsGuest: false,
      challenges: [
        {
          uid: "1",
          challenge_name: "Challenge 1",
          description: "Description 1",
          challenge_id: "1",
        },
        {
          uid: "2",
          challenge_name: "Challenge 2",
          description: "Description 2",
          challenge_id: "2",
        },
      ],
      groups: [
        { id: "1", name: "Group 1" },
        { id: "2", name: "Group 2" },
      ],
      titleChallenge: {
        title: "Current Challenge",
        description: "Current Challenge Description",
        endDate: new Date(2024, 1, 1),
      },
    });
  });

  it("renders the HomeScreen with challenges and groups", async () => {
    const { getByText, getByTestId } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@epfl.ch",
          createdAt: new Date(),
          image_id: null,
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    await waitFor(() => {
      // Vérifie le titre de la barre supérieure
      expect(getByText("Strive")).toBeTruthy();

      // Vérifie si les groupes s'affichent
      expect(getByText("Group 1")).toBeTruthy();
      expect(getByText("Group 2")).toBeTruthy();

      // Vérifie si les défis s'affichent
      expect(getByTestId("challenge-id-0")).toBeTruthy();
      expect(getByTestId("challenge-id-1")).toBeTruthy();

      // Vérifie le défi actuel
      expect(getByText("Current Challenge")).toBeTruthy();
      expect(getByText("Current Challenge Description")).toBeTruthy();
    });
  });

  it("renders 'No challenges to display' when no challenges are available", () => {
    // Mock les valeurs retournées pour simuler l'absence de défis
    mockUseHomeScreenViewModel.mockReturnValue({
      userIsGuest: false,
      challenges: [],
      groups: [],
      titleChallenge: {
        title: "Current Challenge",
        description: "Current Challenge Description",
        endDate: new Date(2024, 1, 1),
      },
    });

    const { getByText } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@epfl.ch",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    expect(getByText("No challenges to display")).toBeTruthy();
  });

  it("renders correctly for a guest user", () => {
    // Mock les valeurs pour un utilisateur invité
    mockUseHomeScreenViewModel.mockReturnValue({
      userIsGuest: true,
      challenges: [],
      groups: [],
      titleChallenge: {
        title: "Current Challenge",
        description: "Current Challenge Description",
        endDate: new Date(2024, 1, 1),
      },
    });

    const { getByText } = render(
      <HomeScreen
        user={{ name: "Guest", uid: "", email: "", createdAt: new Date() }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    expect(getByText("No challenges to display")).toBeTruthy();
  });

  it("opens the filter menu when the filter button is pressed", () => {
    const { getByTestId, getByText } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const filterButton = getByTestId("filter-icon");
    fireEvent.press(filterButton);

    expect(getByText("Filter by Friends")).toBeTruthy();
    expect(getByText("See All Posts")).toBeTruthy();
  });

  it("applies the correct filter when an option is selected", () => {
    const { getByTestId, getByText } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const filterButton = getByTestId("filter-icon");
    fireEvent.press(filterButton);

    const filterByFriendsOption = getByText("Filter by Friends");
    fireEvent.press(filterByFriendsOption);

    expect(getByText("No challenges to display")).toBeTruthy();
  });

  it("closes the filter menu after selection", () => {
    const { getByTestId, getByText, queryByText } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const filterButton = getByTestId("filter-icon");
    fireEvent.press(filterButton);

    const filterByFriendsOption = getByText("Filter by Friends");
    fireEvent.press(filterByFriendsOption);

    expect(queryByText("Filter by Friends")).toBeNull();
    expect(queryByText("See All Challenges")).toBeNull();
  });

  it("the feed only shows friend's posts", async () => {
    mockUseHomeScreenViewModel.mockReturnValue({
      userIsGuest: false,
      challenges: [
        {
          uid: "friend-1",
          challenge_name: "Challenge 1",
          description: "Description from Friend 1",
          challenge_id: "1",
        },
        {
          uid: "user-1",
          challenge_name: "General Challenge",
          description: "Description 1",
          challenge_id: "2",
        },
      ],
      groups: [],
      titleChallenge: "go get hot wine!!",
    });

    const mockUser = {
      name: "Test User",
      uid: "12345",
      email: "test@example.com",
      createdAt: new Date(),
      friends: ["friend-1"],
    };

    const { getByTestId, queryAllByTestId } = render(
      <HomeScreen
        user={mockUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const filterButton = getByTestId("filter-icon");
    fireEvent.press(filterButton);

    const filterByFriendsOption = getByTestId("filter-by-friends-option");
    fireEvent.press(filterByFriendsOption);

    const challenges = queryAllByTestId(/challenge-id-/);

    challenges.forEach((challenge) => {
      const challengeUid = challenge.props.challengeDB.uid;
      expect(mockUser.friends).toContain(challengeUid);
    });
  });

  it("sets filter to all challenges and closes the menu", async () => {
    const { getByTestId } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const filterButton = getByTestId("filter-icon");
    fireEvent.press(filterButton);

    const allChallengesOption = getByTestId("see-all-challenges-option");
    fireEvent.press(allChallengesOption);

    expect(getByTestId("filter-icon")).toBeTruthy();
  });

  it("resets filter to all challenges and closes the filter menu", async () => {
    const { getByTestId, queryByTestId } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const filterButton = getByTestId("filter-icon");
    fireEvent.press(filterButton);

    expect(getByTestId("filter-modal")).toBeTruthy();

    const allPostsOption = getByTestId("see-all-challenges-option");
    fireEvent.press(allPostsOption);

    expect(queryByTestId("filter-modal")).toBeNull();

    expect(getByTestId("filter-icon")).toBeTruthy();
  });

  it("displays no challenges when filterByFriends is true and challengesFromFriends is undefined", () => {
    mockUseHomeScreenViewModel.mockReturnValue({
      userIsGuest: false,
      challenges: [{ uid: "user-1", challenge_name: "General Challenge" }],
      challengesFromFriends: undefined, // Simule des défis d'amis manquants
      groups: [],
      titleChallenge: "go get hot wine!!",
    });

    const { getByText, getByTestId } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    // Activer le filtre "Filter by Friends"
    fireEvent.press(getByTestId("filter-icon"));
    fireEvent.press(getByTestId("filter-by-friends-option"));

    // Vérifie qu'aucun défi n'est affiché
    expect(getByText("No challenges to display")).toBeTruthy();
  });

  it("displays no challenges when filterByFriends is false and challenges is undefined", () => {
    mockUseHomeScreenViewModel.mockReturnValue({
      userIsGuest: false,
      challenges: undefined, // Simule l'absence de défis généraux
      challengesFromFriends: [
        { uid: "friend-1", challenge_name: "Friend Challenge" },
      ],
      groups: [],
      titleChallenge: "go get hot wine!!",
    });

    const { getByText, getByTestId } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    // Désactiver le filtre "Filter by Friends" (par défaut)
    fireEvent.press(getByTestId("filter-icon"));
    fireEvent.press(getByTestId("see-all-challenges-option"));

    // Vérifie qu'aucun défi n'est affiché
    expect(getByText("No challenges to display")).toBeTruthy();
  });
  it("closes the filter menu when onRequestClose is triggered", () => {
    const { getByTestId, queryByTestId } = render(
      <HomeScreen
        user={{
          name: "Test User",
          uid: "12345",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={{ navigate: jest.fn() }}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    // Ouvre le modal
    const filterButton = getByTestId("filter-icon");
    fireEvent.press(filterButton);

    // Vérifie que le modal est visible
    expect(getByTestId("filter-modal")).toBeTruthy();

    // Simule la fermeture du modal via `onRequestClose`
    fireEvent(getByTestId("filter-modal"), "onRequestClose");

    // Vérifie que le modal est fermé
    expect(queryByTestId("filter-modal")).toBeNull();
  });
});
