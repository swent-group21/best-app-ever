import React from "react";
import {
  render,
  fireEvent,
  renderHook,
  act,
} from "@testing-library/react-native";
import { useRequestListViewModel } from "@/src/viewmodels/components/friends/RequestListViewModel";

// Mock FirestoreCtrl methods
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      acceptFriend: jest.fn(() => Promise.resolve()),
      rejectFriend: jest.fn(() => Promise.resolve()),
    };
  });
});

describe("RequestList ViewModel", () => {
  const mockFirestoreCtrl = {
    acceptFriend: jest.fn(),
    rejectFriend: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "info").mockImplementation(() => {});
  });

  it("handles accepting a friend", async () => {
    // Render the hook with basics values
    const { result } = renderHook(() =>
      useRequestListViewModel({
        firestoreCtrl: mockFirestoreCtrl,
        uid: "user-uid",
      }),
    );

    await act(async () => {
      await result.current.handleAccept("user1");
    });

    expect(mockFirestoreCtrl.acceptFriend).toHaveBeenCalledWith(
      "user-uid",
      "user1",
    );
  });

  it("handles accepting a friend", async () => {
    // Render the hook with basics values
    const { result } = renderHook(() =>
      useRequestListViewModel({
        firestoreCtrl: mockFirestoreCtrl,
        uid: "user-uid",
      }),
    );

    await act(async () => {
      await result.current.handleDecline("user2");
    });

    expect(mockFirestoreCtrl.rejectFriend).toHaveBeenCalledWith(
      "user-uid",
      "user2",
    );
  });
});
