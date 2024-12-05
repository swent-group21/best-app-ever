import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../../../src/app/views/home/home_screen";
import FirestoreCtrl from "../../../src/app/models/firebase/FirestoreCtrl";

// Mock du ViewModel
jest.mock("../../../src/app/viewmodels/home/HomeScreenViewModel", () => ({
  useHomeScreenViewModel: jest.fn(),
}));

jest.mock("../../../src/app/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => ({
    getChallengeDescription: jest.fn().mockResolvedValue({
      Title: "Mock Challenge",
      Description: "Mock Description",
      endDate: new Date(2024, 1, 1),
    }),
    getKChallenges: jest.fn().mockResolvedValue([
      { uid: "1", challenge_name: "Challenge 1", description: "Description 1" },
    ]),
    getGroupsByUserId: jest.fn().mockResolvedValue([
      { id: "1", name: "Group 1" },
    ]),
    getLikesOf: jest.fn().mockResolvedValue([]),

  }));
});


describe("HomeScreen UI Tests", () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockFirestoreCtrl = new FirestoreCtrl();
  const mockUseHomeScreenViewModel = require("../../../src/app/viewmodels/home/HomeScreenViewModel")
    .useHomeScreenViewModel;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock les valeurs par défaut du ViewModel
    mockUseHomeScreenViewModel.mockReturnValue({
      userIsGuest: false,
      challenges: [
        { uid: "1", challenge_name: "Challenge 1", description: "Description 1", challenge_id: "1" },
        { uid: "2", challenge_name: "Challenge 2", description: "Description 2", challenge_id: "2" },
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

  it("renders the HomeScreen with challenges and groups", () => {
    const { getByText, getByTestId } = render(
      <HomeScreen
        user={{ name: "Test User", uid: "12345", email: "test@epfl.ch", createdAt: new Date(), image_id: null }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

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


  it("renders 'No challenge to display' when no challenges are available", () => {
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
        user={{ name: "Test User", uid: "12345", email: "test@epfl.ch", createdAt: new Date() }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    // Vérifie que le texte pour "aucun défi" est affiché
    expect(getByText("No challenge to display")).toBeTruthy();
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
      <HomeScreen user={{ name: "Guest", uid: "", email: "", createdAt: new Date() }} navigation={mockNavigation} firestoreCtrl={mockFirestoreCtrl} />
    );

    // Vérifie que les défis et groupes ne sont pas affichés
    expect(getByText("No challenge to display")).toBeTruthy();
  });
});
