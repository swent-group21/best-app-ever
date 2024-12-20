import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { updateLikesOf } from "@/src/models/firebase/SetFirestoreCtrl";
import MemoriesScreen from "@/src/views/home/memories_screen";

const mockNavigation = {
  navigate: jest.fn(),
};

const mockRoute = {
  params: {
    user: {
      uid: "user123",
      name: "Test User",
      email: "testuser@example.com",
      image_id: "image123",
    },
  },
};

jest.mock("@/src/viewmodels/home/MemoriesScreenViewModel", () => ({
  useMemoriesViewModel: jest.fn(),
}));

jest.mock("@/src/models/firebase/SetFirestoreCtrl", () => ({
  updateLikesOf: jest.fn().mockResolvedValue({}),
}));

describe("Memories screen", () => {
  const mockMemoriesViewModel =
    require("@/src/viewmodels/home/MemoriesScreenViewModel").useMemoriesViewModel;

  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();

    // Mock les valeurs par défaut du ViewModel
    mockMemoriesViewModel.mockReturnValue({
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
      icon: "icon_id",
    });
  });

  it("renders correctly with challenges", async () => {
    const { getByTestId } = render(
      <MemoriesScreen navigation={mockNavigation} route={mockRoute} />,
    );

    await waitFor(() => {
      // Check if the top bar is rendered
      expect(getByTestId("top-bar")).toBeTruthy();

      // Check if user information is displayed
      expect(getByTestId("user-header")).toBeTruthy();
    });
  });

  it("renders 'No challenges to display' when user has no challenges", () => {
    mockMemoriesViewModel.mockReturnValue({
      userIsGuest: false,
      challenges: [],
      icon: "icon_id",
    });

    const { getByText } = render(
      <MemoriesScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(getByText("No challenges to display")).toBeTruthy();
  });
});
