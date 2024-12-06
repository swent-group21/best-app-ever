import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Challenge } from "@/components/home/Challenge";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
} from "@/src/models/firebase/FirestoreCtrl";

// Mock the navigation prop
const navigation = {
  navigate: jest.fn(),
};

let mockTimestamp = {
  toDate: jest.fn().mockReturnValue(new Date()),
};

let mockDate = new Date();

// Mock FirestoreCtrl methods
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUser: jest.fn().mockResolvedValue({
        uid: "user123",
        name: "Current User",
        email: "test@test.com",
        createdAt: mockTimestamp,
      }),
      getLikesOf: jest.fn().mockResolvedValue(["12345", "67890"]),
      getCommentsOf: jest.fn().mockResolvedValue([
        {
          uid: "12345",
          name: "Test User",
          comment: "This is a test comment",
          created_at: mockTimestamp,
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

const mockFirestoreCtrl = new FirestoreCtrl();

describe("Challenge Component", () => {
  const currentUser: DBUser = {
    uid: "user123",
    name: "Current User",
    email: "test@test.com",
    createdAt: mockDate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.setSystemTime(new Date(1466424490000));
  });

  it("fetches user data on mount", async () => {
    const { getByText } = render(
      <Challenge
        challengeDB={challengeDB}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={navigation}
        testID="challenge"
        currentUser={currentUser}
      />,
    );

    await waitFor(() => {
      expect(mockFirestoreCtrl.getUser).toHaveBeenCalledWith("user123");
    });
  });

  it("fetches likes data on mount and updates isLiked state", async () => {
    const { getByTestId } = render(
      <Challenge
        challengeDB={challengeDB}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={navigation}
        testID="challenge"
        currentUser={currentUser}
      />,
    );

    await waitFor(() => {
      expect(mockFirestoreCtrl.getLikesOf).toHaveBeenCalledWith("challenge123");
    });
  });

  it("toggles isOpen state when the challenge is pressed", () => {
    const { getByTestId } = render(
      <Challenge
        challengeDB={challengeDB}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={navigation}
        testID="challenge"
        currentUser={currentUser}
      />,
    );

    const touchable = getByTestId("challenge-touchable");

    // Initially, the detailed view should not be open
    expect(() => getByTestId("challenge-container")).toThrow();

    // Press the touchable to open the details
    fireEvent.press(touchable);

    // Now the detailed view should be visible
    expect(getByTestId("challenge-container")).toBeTruthy();
  });

  it("navigates to Maximize screen when expand button is pressed", () => {
    const { getByTestId } = render(
      <Challenge
        challengeDB={challengeDB}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={navigation}
        testID="challenge"
        currentUser={currentUser}
      />,
    );

    // Open the detailed view
    fireEvent.press(getByTestId("challenge-touchable"));

    const expandButton = getByTestId("expand-button");
    fireEvent.press(expandButton);

    expect(navigation.navigate).toHaveBeenCalledWith("Maximize", {
      navigation: navigation,
      firestoreCtrl: mockFirestoreCtrl,
      challenge: challengeDB,
      user: currentUser,
    });
  });

  it("toggles like state and updates likes list", async () => {
    const { getByTestId, rerender } = render(
      <Challenge
        challengeDB={challengeDB}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={navigation}
        testID="challenge"
        currentUser={currentUser}
      />,
    );

    // Open the detailed view
    fireEvent.press(getByTestId("challenge-touchable"));

    let likeButton = getByTestId("like-button");

    // Like the challenge
    fireEvent.press(likeButton);

    // Ensure updateLikesOf was called with the new likes list
    expect(mockFirestoreCtrl.updateLikesOf).toHaveBeenCalledWith(
      "challenge123",
      ["user123"],
    );
  });
});
