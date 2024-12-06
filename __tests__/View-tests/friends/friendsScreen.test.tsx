import React from "react";
import { render } from "@testing-library/react-native";
import FriendsScreen from "@/src/views/friends/friends_screen";
import { useFriendsScreenViewModel } from "@/src/viewmodels/friends/FriendsScreenViewModel";
import { getAuth } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

jest.mock("@/src/viewmodels/friends/FriendsScreenViewModel", () => ({
  useFriendsScreenViewModel: jest.fn(),
}));

describe("FriendsScreen Tests - Various Scenarios", () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  const mockFirestoreCtrl = {
    getAllUsers: jest.fn(),
    getFriends: jest.fn(),
    getFriendRequests: jest.fn(),
    isFriend: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the Firebase `getAuth` method
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
      <FriendsScreen navigation={mockNavigation} firestoreCtrl={mockFirestoreCtrl} />
    );

    expect(getByText("Your friends")).toBeTruthy();

    // Verify "No requests" message
    expect(getByText("Requests")).toBeTruthy();
    expect(getByText("No friends request for now")).toBeTruthy();
  });

  it("renders FriendsScreen with one friend and no requests", () => {
    // Mock ViewModel for one friend and no requests
    (useFriendsScreenViewModel as jest.Mock).mockReturnValue({
      searchText: "",
      setSearchText: jest.fn(),
      friends: [{ uid: "friend1", name: "Friend 1", email: "friend1@example.com" }],
      requests: [],
      filteredUsers: [],
      handleFriendPress: jest.fn(),
    });

    const { getByText } = render(
      <FriendsScreen navigation={mockNavigation} firestoreCtrl={mockFirestoreCtrl} />
    );

    // Verify one friend is displayed
    expect(getByText("Your friends")).toBeTruthy();
    expect(getByText("Friend 1")).toBeTruthy();

    // Verify "No requests" message
    expect(getByText("Requests")).toBeTruthy();
    expect(getByText("No friends request for now")).toBeTruthy();
  });

  it("renders FriendsScreen with one request and no friends", () => {
    // Mock ViewModel for one request and no friends
    (useFriendsScreenViewModel as jest.Mock).mockReturnValue({
      searchText: "",
      setSearchText: jest.fn(),
      friends: [],
      requests: [{ uid: "request1", name: "Request 1", email: "request1@example.com" }],
      filteredUsers: [],
      handleFriendPress: jest.fn(),
    });

    const { getByText, getByTestId } = render(
      <FriendsScreen navigation={mockNavigation} firestoreCtrl={mockFirestoreCtrl} />
    );

    expect(getByText("Your friends")).toBeTruthy();

    // Verify request list is displayed
    expect(getByText("Requests")).toBeTruthy();
    expect(getByTestId("friend-request-list")).toBeTruthy();
  });

});
