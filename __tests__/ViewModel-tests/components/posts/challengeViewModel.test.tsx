import {
  waitFor,
  renderHook
} from "@testing-library/react-native";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
} from "@/src/models/firebase/FirestoreCtrl";
import { useChallengeViewModel } from "@/src/viewmodels/components/posts/ChallengeViewModel";


// Mock FirestoreCtrl methods
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUser: jest.fn().mockResolvedValue({
        uid: "user123",
        name: "Current User",
        email: "test@test.com",
        createdAt: new Date(),
      }),
      getLikesOf: jest.fn().mockResolvedValue(["12345", "67890"]),
      getCommentsOf: jest.fn().mockResolvedValue([
        {
          uid: "12345",
          name: "Test User",
          comment: "This is a test comment",
          created_at: new Date(),
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

const mockDate = new Date();
const currentUser: DBUser = {
  uid: "user123",
  name: "Current User",
  email: "test@test.com",
  createdAt: mockDate,
};


describe("use Challenge ViewModel", () => {

  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1466424490000));
  });

  it("should initialize correctly and fetch user, and likes", async () => {
    const { result } = renderHook(() =>
      useChallengeViewModel({
        challengeDB: mockChallenge,
        firestoreCtrl: mockFirestoreCtrl,
        currentUser: currentUser,
      }
      ),
    );

    await waitFor(() => {
      expect(result.current.user).toBeDefined();
    });

    expect(mockFirestoreCtrl.getUser).toHaveBeenCalledWith("user123");
    expect(mockFirestoreCtrl.getLikesOf).toHaveBeenCalledWith("challenge123");

    expect(result.current.user).toEqual({
      uid: "user123",
      name: "Current User",
      email: "test@test.com",
      createdAt: expect.any(Date),
    });

    expect(result.current.likes).toEqual(["12345", "67890"]);
  });

  it("should have the right image placeholder", async () => {
    const { result } = renderHook(() =>
      useChallengeViewModel({
        challengeDB: mockChallenge,
        firestoreCtrl: mockFirestoreCtrl,
        currentUser: currentUser,
      }
      ),
    );

    await waitFor(() => {
      expect(result.current.defaultUri).toBeDefined();
    });

    expect(result.current.defaultUri).toEqual("@/assets/images/no-image.svg");
  });
});