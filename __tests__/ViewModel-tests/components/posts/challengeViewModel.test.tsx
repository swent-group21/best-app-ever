import { waitFor, renderHook, act } from "@testing-library/react-native";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
} from "@/src/models/firebase/FirestoreCtrl";
import { useChallengeViewModel } from "@/src/viewmodels/components/posts/ChallengeViewModel";

const mockDate = new Date();

// Mock FirestoreCtrl methods
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUser: jest.fn().mockResolvedValue({
        uid: "user123",
        name: "Current User",
        email: "test@test.com",
        createdAt: mockDate,
      }),
      getLikesOf: jest.fn().mockResolvedValue(["12345", "67890"]),
      getCommentsOf: jest.fn().mockResolvedValue([
        {
          uid: "12345",
          name: "Test User",
          comment: "This is a test comment",
          created_at: mockDate,
        },
      ]),
      updateLikesOf: jest
        .fn()
        .mockResolvedValue(["challenge123", ["12345", "67890", "user123"]]),
    };
  });
});
const mockFirestoreCtrl = new FirestoreCtrl();

const mockChallenge: DBChallenge = {
  challenge_name: "challengeName",
  challenge_id: "challenge123",
  uid: "user123",
  image_id: "https://example.com/image.jpg",
  likes: ["12345", "67890"],
};

const currentUser: DBUser = {
  uid: "user123",
  name: "Current User",
  email: "test@test.com",
  createdAt: mockDate,
};

// Test for the use Challenge ViewModel
describe("use Challenge ViewModel", () => {
  // Before each test, mock the console info and clear all mocks
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  // Before all tests, set the system time to a specific date
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1466424490000));
  });

  it("should initialize correctly and fetch user, and likes", async () => {
    // Render the hook with basics values
    const { result } = renderHook(() =>
      useChallengeViewModel({
        challengeDB: mockChallenge,
        firestoreCtrl: mockFirestoreCtrl,
        currentUser: currentUser,
      }),
    );

    await waitFor(() => {
      expect(result.current.user).toBeDefined();
    });

    expect(mockFirestoreCtrl.getUser).toHaveBeenCalledWith("user123");
    expect(mockFirestoreCtrl.getLikesOf).toHaveBeenCalledWith("challenge123");
    expect(mockFirestoreCtrl.getCommentsOf).toHaveBeenCalledWith(
      "challenge123",
    );

    expect(result.current.user).toEqual({
      uid: "user123",
      name: "Current User",
      email: "test@test.com",
      createdAt: expect.any(Date),
    });

    expect(result.current.comments).toEqual([
      {
        uid: "12345",
        name: "Test User",
        comment: "This is a test comment",
        created_at: mockDate,
      },
    ]);
  });

  it("should have the right image placeholder", async () => {
    // Render the hook to check default uri
    const { result } = renderHook(() =>
      useChallengeViewModel({
        challengeDB: mockChallenge,
        firestoreCtrl: mockFirestoreCtrl,
        currentUser: currentUser,
      }),
    );

    await waitFor(() => {
      expect(result.current.placeholderImage).toBeDefined();
    });

    expect(result.current.placeholderImage).toEqual(
      "https://via.placeholder.com/300",
    );
  });

  it("handles like actions", async () => {
    const mockHandleLikePress = jest.fn();

    // Render the hook with basics values
    const { result } = renderHook(() =>
      useChallengeViewModel({
        challengeDB: mockChallenge,
        firestoreCtrl: mockFirestoreCtrl,
        currentUser: currentUser,
      }),
    );

    // Spy on handleLikePress
    const handleLikePressSpy = jest.spyOn(result.current, "handleLikePress");

    await act(async () => {
      await result.current.handleDoubleTap();
      await result.current.handleDoubleTap(); // to call handleLikePress
    });

    expect(mockFirestoreCtrl.updateLikesOf).toHaveBeenCalledWith(
      "challenge123",
      ["12345", "67890", "user123"],
    );
  });
});
