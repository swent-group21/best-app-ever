import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react-native";
import { Challenge } from "@/src/views/components/posts/challenge";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
} from "@/src/models/firebase/FirestoreCtrl";

// Mock du ViewModel
jest.mock("@/src/viewmodels/components/posts/ChallengeViewModel", () => ({
  useChallengeViewModel: jest.fn(),
}));


// Mock FirestoreCtrl methods
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUser: jest.fn().mockResolvedValue({
        uid: "user123",
        name: "Current User",
        email: "test@test.com",
        createdAt: new Date(),
      }),
      getLikesOf: jest.fn().mockResolvedValue(["12345", "67890"]),
      getCommentsOf: jest.fn().mockResolvedValue([
        {
          uid: "12345",
          name: "Test User",
          comment: "This is a test comment",
          created_at: new Date(),
        },
      ]),
      updateLikesOf: jest
        .fn()
        .mockResolvedValue(["challenge123", ["12345", "67890", "user123"]]),
    };
  });
});

const challengeDB: DBChallenge = {
  challenge_name: "challengeName",
  challenge_id: "challenge123",
  uid: "user123",
  image_id: "https://example.com/image.jpg",
  likes: ["12345", "67890"],
};


describe("Challenge Component", () => {

  const mockNavigation = { navigate: jest.fn() };
  const mockFirestoreCtrl = new FirestoreCtrl();
  const mockUseChallengeViewModel =
    require("@/src/viewmodels/components/posts/ChallengeViewModel").useChallengeViewModel;
  const mockDate = new Date();

  const mockSetIsOpen = jest.fn();



  const currentUser: DBUser = {
    uid: "user123",
    name: "Current User",
    email: "test@test.com",
    createdAt: mockDate,
  };

  // Reset the mocks and set the default values for the ViewModel before each test
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();

    // Mock les valeurs par défaut du ViewModel
    mockUseChallengeViewModel.mockReturnValue({
      isOpen: false,
      setIsOpen: mockSetIsOpen,
      isLiked: false,
      setIsLiked: jest.fn(),
      likes: ["12345", "67890"],
      setLikes: jest.fn(),
      user: currentUser,
      defaultUri: "@/assets/images/no-image.svg",
      challengeDate: mockDate,
    });
    });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1466424490000));
  });


  it("renders the Challenge component", async () => {
    const {getByTestId} = render(
      <Challenge
        challengeDB={challengeDB}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={mockNavigation}
        testID="challenge"
        currentUser={currentUser}
      />,
    );

    expect(getByTestId("challenge")).toBeTruthy();
  });

  it("toggles isOpen state when the challenge is pressed", async () => {
    render(
      <Challenge
        challengeDB={challengeDB}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={mockNavigation}
        testID="challenge"
        currentUser={currentUser}
      />,
    );

    const touchable = screen.getByTestId("challenge-touchable");

    // Initially, the detailed view should not be open
    expect(() => screen.getByTestId("challenge-container")).toThrow();

    // Press the touchable to open the details
    await waitFor(() => {
      fireEvent.press(touchable);
    });

    // Now the detailed view should be visible
    expect(mockSetIsOpen).toHaveBeenCalled();
  });

  it("navigates to Maximize screen when open and expand button is pressed", async () => {
    // Mock les valeurs par défaut du ViewModel
    mockUseChallengeViewModel.mockReturnValue({
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      isLiked: false,
      setIsLiked: jest.fn(),
      likes: ["12345", "67890"],
      setLikes: jest.fn(),
      user: currentUser,
      defaultUri: "@/assets/images/no-image.svg",
      challengeDate: mockDate,
    });

    render(
      <Challenge
        challengeDB={challengeDB}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={mockNavigation}
        testID="challenge"
        currentUser={currentUser}
      />,
    );

    // Open the detailed view
    await waitFor(() => {
      fireEvent.press(screen.getByTestId("challenge-touchable"));
    });

    const expandButton = screen.getByTestId("expand-button");

    // Press the expand button
    await act(() => {
      fireEvent.press(expandButton);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Maximize", {
      navigation: mockNavigation,
      firestoreCtrl: mockFirestoreCtrl,
      challenge: challengeDB,
      user: currentUser,
    });
  });

  it("toggles like state and updates likes list", async () => {
    // Mock les valeurs par défaut du ViewModel
    mockUseChallengeViewModel.mockReturnValue({
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      isLiked: false,
      setIsLiked: jest.fn(),
      likes: ["12345", "67890"],
      setLikes: jest.fn(),
      user: currentUser,
      defaultUri: "@/assets/images/no-image.svg",
      challengeDate: mockDate,
    });

    render(
      <Challenge
        challengeDB={challengeDB}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={mockNavigation}
        testID="challenge"
        currentUser={currentUser}
      />,
    );

    // Open the detailed view
    await waitFor(() => {
      fireEvent.press(screen.getByTestId("challenge-touchable"));
    });

    let likeButton = screen.getByTestId("like-button");

    // Like the challenge
    await waitFor(() => {
      fireEvent.press(likeButton);
    });

    // Ensure updateLikesOf was called with the new likes list
    expect(mockFirestoreCtrl.updateLikesOf).toHaveBeenCalledWith(
      "challenge123",
      ["12345", "67890", "user123"],
    );
  });
});
