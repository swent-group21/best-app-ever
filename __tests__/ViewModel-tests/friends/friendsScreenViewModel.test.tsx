import { renderHook, act, waitFor } from "@testing-library/react-native";
import { useFriendsScreenViewModel } from "@/src/viewmodels/friends/FriendsScreenViewModel";
import FirestoreCtrl from "@/src/models/firebase/FirestoreCtrl";

jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAllUsers: jest.fn(),
      getFriends: jest.fn(),
      getFriendRequests: jest.fn(),
      getFriendSuggestions: jest.fn(),
    };
  });
});



describe("useFriendsScreenViewModel", () => {
  const mockFirestoreCtrl = new FirestoreCtrl();

  const uid = "current-user-id";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and sets users correctly", async () => {
    const mockUsers = [
      { uid: "user1", name: "John Doe" },
      { uid: "user2", name: "Jane Smith" },
    ];
    (mockFirestoreCtrl.getAllUsers as jest.Mock).mockResolvedValueOnce(
      mockUsers,
    );

    const { result } = renderHook(() =>
      useFriendsScreenViewModel(mockFirestoreCtrl, uid),
    );

    await waitFor(() => result.current.users.length > 0);

    expect(mockFirestoreCtrl.getAllUsers).toHaveBeenCalled();
    expect(result.current.users).toEqual(mockUsers);
  });

  it("filters users based on searchText", async () => {
    const mockUsers = [
      { uid: "user1", name: "John Doe" },
      { uid: "user2", name: "Jane Smith" },
    ];
    (mockFirestoreCtrl.getAllUsers as jest.Mock).mockResolvedValueOnce(
      mockUsers,
    );

    const { result } = renderHook(() =>
      useFriendsScreenViewModel(mockFirestoreCtrl, uid),
    );

    await waitFor(() => result.current.users.length > 0);

    await act(() => {
      result.current.setSearchText("john");
    });

    expect(result.current.filteredUsers).toEqual([
      { uid: "user1", name: "John Doe" },
    ]);
  });

  it("excludes current user from filtered users", async () => {
    const mockUsers = [
      { uid: "user1", name: "John Doe" },
      { uid: "current-user-id", name: "Me" },
    ];
    (mockFirestoreCtrl.getAllUsers as jest.Mock).mockResolvedValueOnce(
      mockUsers,
    );

    const { result } = renderHook(() =>
      useFriendsScreenViewModel(mockFirestoreCtrl, uid),
    );

    await waitFor(() => result.current.users.length > 0);

    await act(() => {
      result.current.setSearchText("me");
    });

    expect(result.current.filteredUsers).toEqual([]);
  });

  it("fetches and sets friends correctly", async () => {
    const mockFriends = [{ uid: "friend1", name: "Alice" }];
    (mockFirestoreCtrl.getFriends as jest.Mock).mockResolvedValueOnce(
      mockFriends,
    );

    const { result } = renderHook(() =>
      useFriendsScreenViewModel(mockFirestoreCtrl, uid),
    );

    await waitFor(() => result.current.friends.length > 0);

    expect(mockFirestoreCtrl.getFriends).toHaveBeenCalledWith(uid);
    expect(result.current.friends).toEqual(mockFriends);
  });

  it("should set refreshing state correctly during onRefresh", async () => {
    const mockUid = "12345";
    const { result } = renderHook(() =>
      useFriendsScreenViewModel(mockFirestoreCtrl, mockUid),
    );
  
    act(() => {
      result.current.onRefresh();
    });
  
    expect(result.current.refreshing).toBe(true);
  
    await waitFor(() => {
      expect(result.current.refreshing).toBe(false);
    });
  });
  

  it("fetches and sets friend requests correctly", async () => {

    (mockFirestoreCtrl.getFriendRequests as jest.Mock).mockResolvedValueOnce([
      { uid: "request1", name: "Alice" },
      { uid: "request2", name: "Bob" },
    ]);
    (mockFirestoreCtrl.getFriends as jest.Mock).mockResolvedValueOnce([
      { uid: "friend1", name: "Charlie" },
      { uid: "friend2", name: "Dana" },
    ]);
    (mockFirestoreCtrl.getAllUsers as jest.Mock).mockResolvedValueOnce([
      { uid: "user1", name: "Eve" },
      { uid: "user2", name: "Frank" },
    ]);
    (mockFirestoreCtrl.getFriendSuggestions as jest.Mock).mockResolvedValueOnce([
      { uid: "suggestion1", name: "Grace" },
    ]);

    const mockUid = "12345"; 
    const { result } = renderHook(() =>
      useFriendsScreenViewModel(mockFirestoreCtrl, mockUid),
    );

    await act(async () => {
      await result.current.onRefresh();
    });

    await act(() => {
      Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.requests).toHaveLength(2);
      expect(result.current.users).toHaveLength(2);
    });


    expect(mockFirestoreCtrl.getFriendRequests).toHaveBeenCalledWith(mockUid);
    expect(mockFirestoreCtrl.getAllUsers).toHaveBeenCalled();
  });
});
