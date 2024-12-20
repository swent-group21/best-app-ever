import { renderHook, act, waitFor } from "@testing-library/react-native";
import { useJoinGroupViewModel } from "@/src/viewmodels/groups/JoinGroupViewModel";
import { DBGroup } from "@/src/models/firebase/TypeFirestoreCtrl";
import { getAllGroups } from "@/src/models/firebase/GetFirestoreCtrl";

// Mock groups
const mockGroup1: DBGroup = {
  gid: "1",
  name: "Group1",
  challengeTitle: "Challenge Group1",
  members: ["user1", "user2"],
  updateDate: new Date(),
  location: null,
  radius: 0,
};
const mockGroup2: DBGroup = {
  gid: "2",
  name: "Team2",
  challengeTitle: "Challenge Team2",
  members: [],
  updateDate: new Date(),
  location: null,
  radius: 0,
};

// Mock FirestoreCtrl and its methods
jest.mock("@/src/models/firebase/GetFirestoreCtrl", () => ({
  getAllGroups: jest.fn(() => [mockGroup1, mockGroup2]),
  getGroupSuggestions: jest.fn(() => [mockGroup2]),
}));

describe("useJoinGroupViewModel", () => {
  const uid = "tester-uid";

  // Before each test, mock the console info and clear all mocks
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("modifies the searchText according to searched value", async () => {
    const { result } = renderHook(() => useJoinGroupViewModel(uid));

    await act(() => {
      result.current.setSearchText("Team");
    });

    await waitFor(async () => {
      expect(result.current.searchText).toEqual("Team");
    });
  });

  it("gets all the groups and filter them by name with the searchText", async () => {
    const { result } = renderHook(() => useJoinGroupViewModel(uid));

    // base case with empty searchText
    await waitFor(() => {
      expect(result.current.filteredGroups).toEqual([]);
    });

    await act(() => {
      result.current.setSearchText("Group");
    });

    // Check if the filteredGroups have been filtered from allGroups
    expect(result.current.filteredGroups).toEqual([mockGroup1]);
  });

  it("gets the right suggestions", async () => {
    const { result } = renderHook(() => useJoinGroupViewModel(uid));

    await waitFor(() => {
      expect(result.current.suggestions).toBeDefined();
    });

    // Wait for the promise to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.suggestions).toEqual([mockGroup2]);
    expect(result.current.searchText).toEqual("");
  });

  it("gets all the groups and filter them by challenge with the searchText", async () => {
    const { result } = renderHook(() => useJoinGroupViewModel(uid));

    await waitFor(() => {
      expect(result.current.filteredGroups).toEqual([]);
    });

    await act(() => {
      result.current.setSearchText("Challenge T");
    });

    // Check if the filteredGroups have been filtered from allGroups
    expect(result.current.filteredGroups).toEqual([mockGroup2]);
  });

  it("does not display any group if getAllGroups returns an empty array", async () => {
    (getAllGroups as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useJoinGroupViewModel(uid));

    await act(() => {
      result.current.setSearchText("Challenge T");
    });

    // Check if the filteredGroups are still empty
    await waitFor(() => {
      expect(result.current.filteredGroups).toEqual([]);
    });
  });

  it("does not display any group if searchText does not match any group", async () => {
    const { result } = renderHook(() => useJoinGroupViewModel(uid));

    await act(() => {
      result.current.setSearchText("I want to search for this group");
    });

    // Check if the filteredGroups are still empty
    await waitFor(() => {
      expect(result.current.filteredGroups).toEqual([]);
    });
  });
});
