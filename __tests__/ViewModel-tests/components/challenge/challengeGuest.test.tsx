import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Challenge } from "@/src/views/components/posts/challenge";
import { updateLikesOf } from "@/src/models/firebase/SetFirestoreCtrl";

jest.mock("@/src/models/firebase/SetFirestoreCtrl");

jest.mock("@react-native-community/netinfo", () => ({
  fetch: jest.fn(() =>
    Promise.resolve({ isConnected: true, isInternetReachable: true }),
  ),
}));

describe("Challenge Component - Guest User Restrictions", () => {
  const mockNavigation = { navigate: jest.fn() };

  const mockChallengeDB = {
    challenge_id: "challenge-1",
    uid: "user-1",
    description: "Test Challenge Description",
    image_id: "https://example.com/test-image.jpg",
    likes: ["user-1"],
    date: new Date(),
    caption: "Test Challenge Caption",
    challenge_description: "Test Challenge Description",
  };

  const mockCurrentUserGuest = {
    name: "Guest",
    uid: "guest-1",
    email: "guest@gmail.com",
    createdAt: new Date(),
  };

  it("does not allow guest users to like a challenge", () => {
    const { getByTestId, queryByText } = render(
      <Challenge
        challengeDB={mockChallengeDB}
        index={0}
        navigation={mockNavigation}
        testID="challenge-test"
        currentUser={mockCurrentUserGuest}
      />,
    );

    const likeButton = getByTestId("like-button");
    fireEvent.press(likeButton);

    // Guest user cannot like, so `updateLikesOf` should not be called
    expect(updateLikesOf).not.toHaveBeenCalled();

    // Verify no UI changes related to likes
    expect(queryByText("1 Like")).toBeNull();
  });

  it("does not allow guest users to double-tap like a challenge", () => {
    const { getByTestId } = render(
      <Challenge
        challengeDB={mockChallengeDB}
        index={0}
        navigation={mockNavigation}
        testID="challenge-test"
        currentUser={mockCurrentUserGuest}
      />,
    );

    const challengeContainer = getByTestId(
      "challenge-id-Test Challenge Caption",
    );
    fireEvent.press(challengeContainer);
    fireEvent.press(challengeContainer); // Simulate double-tap

    // Guest user cannot double-tap like, so `updateLikesOf` should not be called
    expect(updateLikesOf).not.toHaveBeenCalled();
  });
});
