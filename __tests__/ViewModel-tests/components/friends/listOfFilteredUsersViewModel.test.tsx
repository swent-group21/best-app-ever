import React from "react";
import { render, fireEvent, waitFor, renderHook, act } from "@testing-library/react-native";
import { useListOfFilteredUsersViewModel } from "@/src/viewmodels/components/friends/ListOfFilteredUsersViewModel";
import FirestoreCtrl from "@/src/models/firebase/FirestoreCtrl";


// Mock FirestoreCtrl methods
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      isFriend: jest.fn((uid, friendId) => Promise.resolve(friendId === "1")), // John is a friend
      isRequested: jest.fn(() => Promise.resolve(false)),
      addFriend: jest.fn(() => Promise.resolve()),
      removeFriendRequest: jest.fn(() => Promise.resolve()),
    };
  });
});

const mockFilteredUsers = [
  { uid: "1", name: "John Doe", image_id: "https://example.com/avatar1.png" },
  { uid: "2", name: "Jane Smith", image_id: null },
];

// Mock du ViewModel
describe("ListOfFilteredUsers ViewModel", () => {
  
  const mockFirestoreCtrl = new FirestoreCtrl();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "info").mockImplementation(() => {});
  });


  it("gets the correct statuses from filtered users", async () => {
    // Render the hook with basics values
    const { result } = renderHook(() =>
      useListOfFilteredUsersViewModel({
        filteredUsers: mockFilteredUsers,
        firestoreCtrl: mockFirestoreCtrl,
        uid: "user-uid",
      }
      ),
    );

    await waitFor(() => {
      expect(result.current.userStatuses).toBeDefined();
    });

    expect(mockFirestoreCtrl.isFriend).toHaveBeenCalledWith("user-uid", "1");
    expect(mockFirestoreCtrl.isRequested).toHaveBeenCalledWith("user-uid", "2");

    // Wait for the promise to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.userStatuses).toEqual({
      "1": { isFriend: true, isRequested: false },
      "2": { isFriend: false, isRequested: false },
    });
  });

  it("handles adding a friend", async () => {
    // Render the hook with basics values
    const { result } = renderHook(() =>
      useListOfFilteredUsersViewModel({
        filteredUsers: mockFilteredUsers,
        firestoreCtrl: mockFirestoreCtrl,
        uid: "user-uid",
      }
      ),
    );

    await act(async () => {
      await result.current.handleAdd("2");
    });

    expect(mockFirestoreCtrl.addFriend).toHaveBeenCalledWith("user-uid", "2");
  });

  it("handles removing a friend", async () => {
    // Render the hook with basics values
    const { result } = renderHook(() =>
      useListOfFilteredUsersViewModel({
        filteredUsers: mockFilteredUsers,
        firestoreCtrl: mockFirestoreCtrl,
        uid: "user-uid",
      }
      ),
    );

    await act(async () => {
      await result.current.handleRemove("1");
    });

    expect(mockFirestoreCtrl.removeFriendRequest).toHaveBeenCalledWith("user-uid", "1");
  });
});
