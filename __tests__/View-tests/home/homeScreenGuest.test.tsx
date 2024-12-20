import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import HomeScreen from "@/src/views/home/home_screen";

// Mock du ViewModel
jest.mock("@/src/viewmodels/home/HomeScreenViewModel", () => ({
  useHomeScreenViewModel: jest.fn(),
}));

jest.mock("@/src/models/firebase/GetFirestoreCtrl", () => {
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
        challenge_id: "1",
      },
      {
        uid: "2",
        challenge_name: "Challenge 2",
        description: "Description 2",
        challenge_id: "2",
      },
    ]),
    getGroupsByUserId: jest
      .fn()
      .mockResolvedValue([{ id: "1", name: "Group 1" }]),
  }));
});

jest.mock("@/src/models/firebase/GetFirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => ({
    updateLikesOf: jest.fn(),
  }));
});

const mockNavigation = { navigate: jest.fn() };
const mockUseHomeScreenViewModel =
  require("@/src/viewmodels/home/HomeScreenViewModel").useHomeScreenViewModel;

describe("HomeScreen - Guest User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseHomeScreenViewModel.mockReturnValue({
      userIsGuest: true,
      challenges: [
        {
          uid: "user1",
          caption: "Challenge Description 1",
          challenge_id: "1",
        },
        {
          uid: "user1",
          caption: "Challenge Description 2",
          challenge_id: "2",
        },
      ],
      groups: [],
      titleChallenge: {
        title: "Current Challenge",
        description: "Current Challenge Description",
        endDate: new Date(2024, 1, 1),
      },
    });
  });

  it("renders the guest footer after all challenges", async () => {
    const { getByText, queryByTestId } = render(
      <HomeScreen
        user={{ name: "Guest", uid: "", email: "", createdAt: new Date() }}
        navigation={mockNavigation}
      />,
    );

    await waitFor(() => {
      // Vérifie que 10 challenges sont affichés
      expect(queryByTestId("challenge-id-Challenge Description 1")).toBeTruthy;
      expect(queryByTestId("challenge-id-Challenge Description 10")).toBeTruthy;

      // Vérifie la présence du bouton "Create an Account"
      expect(getByText("Sign Up")).toBeTruthy();
    });

    // Simule un clic sur le bouton
    fireEvent.press(getByText("Sign Up"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("SignUp");
  });
});
