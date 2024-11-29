import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import FriendsScreen from "@/app/screens/home/friends_screen";
import { ThemedView } from "@/components/theme/ThemedView";

// Mock des dépendances
jest.mock("@/components/theme/ThemedView", () => ({
  ThemedView: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@/components/theme/ThemedText", () => ({
  ThemedText: ({ children }: any) => <span>{children}</span>,
}));

jest.mock("@/components/friends/ListOfFilteredUsers", () => ({
  __esModule: true,
  default: ({ searchText }: any) => (
    <div data-testid="filtered-users">{searchText}</div>
  ),
}));

jest.mock("@/components/friends/ListOfFriends", () => ({
  __esModule: true,
  default: ({ friends }: any) => (
    <div data-testid="friends-list">
      {friends.map((friend: any) => friend.name).join(", ")}
    </div>
  ),
}));

jest.mock("@/components/friends/RequestsList", () => ({
  __esModule: true,
  default: (requests: any) => (
    <div data-testid="requests-list">
      {requests.map((request: any) => request.name).join(", ")}
    </div>
  ),
}));

const mockFirestoreCtrl = {
  getAllUsers: jest.fn(),
  getFriends: jest.fn(),
  getFriendRequests: jest.fn(),
};

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

describe("FriendsScreen", () => {
  const mockUID = "mock-uid";
  const mockAuth = {
    currentUser: { uid: mockUID },
  };
  jest.mock("firebase/auth", () => ({
    getAuth: () => mockAuth,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    mockFirestoreCtrl.getAllUsers.mockResolvedValue([]);
    mockFirestoreCtrl.getFriends.mockResolvedValue([]);
    mockFirestoreCtrl.getFriendRequests.mockResolvedValue([]);

    const { getByTestId } = render(
      <FriendsScreen
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    expect(getByTestId("filtered-users")).toBeTruthy();
    expect(getByTestId("friends-list")).toBeTruthy();
    expect(getByTestId("requests-list")).toBeTruthy();
  });

  it("displays friends when fetched", async () => {
    const friendsMock = [
      { uid: "1", name: "Friend 1" },
      { uid: "2", name: "Friend 2" },
    ];
    mockFirestoreCtrl.getFriends.mockResolvedValue(friendsMock);

    const { getByTestId } = render(
      <FriendsScreen
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    await waitFor(() => {
      const friendsList = getByTestId("friends-list");
      expect(friendsList).toBeTruthy();
      expect(friendsList.props.children).toContain("Friend 1, Friend 2");
    });
  });

  it("displays filtered users based on search text", async () => {
    const usersMock = [
      { uid: "1", name: "John Doe" },
      { uid: "2", name: "Jane Smith" },
    ];
    mockFirestoreCtrl.getAllUsers.mockResolvedValue(usersMock);

    const { getByTestId, getByPlaceholderText } = render(
      <FriendsScreen
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const searchBar = getByPlaceholderText("Search for a user...");
    fireEvent.changeText(searchBar, "John");

    await waitFor(() => {
      const filteredUsers = getByTestId("filtered-users");
      expect(filteredUsers.props.children).toContain("John");
    });
  });

  it("displays friend requests when fetched", async () => {
    const requestsMock = [{ uid: "3", name: "Request 1" }];
    mockFirestoreCtrl.getFriendRequests.mockResolvedValue(requestsMock);

    const { getByTestId } = render(
      <FriendsScreen
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    await waitFor(() => {
      const requestsList = getByTestId("requests-list");
      expect(requestsList).toBeTruthy();
      expect(requestsList.props.children).toContain("Request 1");
    });
  });

  it("navigates back when the back button is pressed", () => {
    const { getByText } = render(
      <FriendsScreen
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const backButton = getByText("arrow-back");
    fireEvent.press(backButton);

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
