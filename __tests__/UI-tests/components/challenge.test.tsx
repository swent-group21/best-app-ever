import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Challenge } from "@/components/home/Challenge";
import { DBUser } from "@/firebase/FirestoreCtrl";

// Mock the firestore controller
const mockFirestoreCtrl = {
  getUser: jest.fn(),
};

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
};

describe("Challenge Component", () => {
  const challengeDBMock = {
    uid: "123",
    image_id: "https://example.com/image.jpg",
    date: "2023-10-10",
  };

  const userMock: DBUser = {
    uid: "123",
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date(8.64e15),
    // ...other user properties
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFirestoreCtrl.getUser.mockResolvedValue(userMock);
  });

  it("renders challenge image", () => {
    const { getByTestId } = render(
      <Challenge
        challengeDB={challengeDBMock}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={mockNavigation}
      />,
    );

    const image = getByTestId("challenge-image");
    expect(image.props.source.uri).toBe(challengeDBMock.image_id);
  });

  it("toggles open state when pressed", () => {
    const { getByTestId, queryByTestId } = render(
      <Challenge
        challengeDB={challengeDBMock}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={mockNavigation}
      />,
    );

    const touchable = getByTestId("challenge-touchable");

    // Initially, the container should not be rendered
    expect(queryByTestId("challenge-container")).toBeNull();

    // Press to open
    fireEvent.press(touchable);

    // The container should now be rendered
    expect(queryByTestId("challenge-container")).toBeTruthy();

    // Press again to close
    fireEvent.press(touchable);

    // The container should not be rendered
    expect(queryByTestId("challenge-container")).toBeNull();
  });

  it("fetches and displays user info when open", async () => {
    const { getByTestId, getByText } = render(
      <Challenge
        challengeDB={challengeDBMock}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={mockNavigation}
      />,
    );

    const touchable = getByTestId("challenge-touchable");

    // Open the challenge
    fireEvent.press(touchable);

    // Wait for user info to be fetched and displayed
    await waitFor(() => {
      expect(mockFirestoreCtrl.getUser).toHaveBeenCalledWith(
        challengeDBMock.uid,
      );
      expect(getByText(userMock.name)).toBeTruthy();
      expect(getByText("at " + challengeDBMock.date)).toBeTruthy();
    });
  });

  it("navigates to MaximizeScreen when expand icon is pressed", () => {
    const { getByTestId } = render(
      <Challenge
        challengeDB={challengeDBMock}
        index={0}
        firestoreCtrl={mockFirestoreCtrl}
        navigation={mockNavigation}
      />,
    );

    const touchable = getByTestId("challenge-touchable");

    // Open the challenge
    fireEvent.press(touchable);

    const expandButton = getByTestId("expand-button");

    // Press expand button
    fireEvent.press(expandButton);

    // Check navigation
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Maximize", {
      challenge: {
        date: "2023-10-10",
        image_id: "https://example.com/image.jpg",
        uid: "123",
      },
      user: undefined,
    });
  });
});
