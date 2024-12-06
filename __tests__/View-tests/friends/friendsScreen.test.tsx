import React from "react";
import { render } from "@testing-library/react-native";
import FriendsScreen from "@/src/views/friends/friends_screen";
import { useFriendsScreenViewModel } from "@/src/viewmodels/friends/FriendsScreenViewModel";
import { getAuth } from "firebase/auth";
import FirestoreCtrl from "@/src/models/firebase/FirestoreCtrl";

// Mock Firebase Auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

// Mock ViewModel
jest.mock("@/src/viewmodels/friends/FriendsScreenViewModel", () => ({
  useFriendsScreenViewModel: jest.fn(),
}));

// Mock FirestoreCtrl methods
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getFriends: jest.fn(),
      getFriendRequests: jest.fn(),
      isFriend: jest.fn(),
      addFriend: jest.fn(),
      acceptFriend: jest.fn(),
    };
  });
});

describe("FriendsScreen Tests - Various Scenarios", () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  const mockFirestoreCtrl = new FirestoreCtrl();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Firebase Auth
    (getAuth as jest.Mock).mockReturnValue({
      currentUser: {
        uid: "test-user-id",
      },
    });
  });

  it("renders FriendsScreen with no requests and no friends", () => {
    // Mock ViewModel for no requests and no friends
    (useFriendsScreenViewModel as jest.Mock).mockReturnValue({
      searchText: "",
      setSearchText: jest.fn(),
      friends: [],
      requests: [],
      filteredUsers: [],
      handleFriendPress: jest.fn(),
    });

    const { getByText } = render(
      <FriendsScreen
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    expect(getByText("Your friends")).toBeTruthy();
    expect(getByText("Requests")).toBeTruthy();
    expect(getByText("No friends request for now")).toBeTruthy();
  });

  it("renders FriendsScreen with one friend and no requests", () => {
    // Mock ViewModel for one friend and no requests
    (useFriendsScreenViewModel as jest.Mock).mockReturnValue({
      searchText: "",
      setSearchText: jest.fn(),
      friends: [
        { uid: "friend1", name: "Friend 1", email: "friend1@example.com" },
      ],
      requests: [],
      filteredUsers: [],
      handleFriendPress: jest.fn(),
    });

    const { getByText } = render(
      <FriendsScreen
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    expect(getByText("Your friends")).toBeTruthy();
    expect(getByText("Friend 1")).toBeTruthy();
    expect(getByText("Requests")).toBeTruthy();
    expect(getByText("No friends request for now")).toBeTruthy();
  });
});
