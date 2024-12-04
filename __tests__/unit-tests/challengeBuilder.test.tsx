import { buildChallenge, createChallenge } from "@/types/ChallengeBuilder";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

jest.mock("@/firebase/FirestoreCtrl");

describe("buildChallenge", () => {
  const mockFirestoreCtrl = new FirestoreCtrl();

  it("should return a valid DBChallenge object when challenge is found", async () => {
    const mockChallenge = {
      challenge_name: "Test Challenge",
      description: "A test description",
      uid: "user123",
      date: new Date(),
      location: { latitude: 10, longitude: 20 },
    };

    mockFirestoreCtrl.getChallenge = jest.fn().mockResolvedValue(mockChallenge);

    const result = await buildChallenge("challenge123", mockFirestoreCtrl);

    expect(result).toEqual({
      challenge_name: "Test Challenge",
      description: "A test description",
      uid: "user123",
      date: mockChallenge.date,
      location: mockChallenge.location,
    });
    expect(mockFirestoreCtrl.getChallenge).toHaveBeenCalledWith("challenge123");
  });

  it("should throw an error if no challenge is found", async () => {
    mockFirestoreCtrl.getChallenge = jest.fn().mockResolvedValue(null);
  
    try {
      await buildChallenge("invalidChallenge", mockFirestoreCtrl);
    } catch (error) {
      expect(error).toEqual("Error: no challenge found when buildChallenge");
    }
  });
});

describe("createChallenge", () => {
  const mockFirestoreCtrl = new FirestoreCtrl();

  it("should create a challenge and call newChallenge with the correct data", async () => {
    const mockUser = { uid: "user123" }; // Mock user data
  
    // Mock FirestoreCtrl methods
    mockFirestoreCtrl.getUser = jest.fn().mockResolvedValue(mockUser);
    mockFirestoreCtrl.newChallenge = jest.fn();
  
    // Mock location and challenge data
    const challengeData = {
      challenge_name: "Test Challenge",
      description: "Test Description",
      date: new Date(),
    };
  
    // Call createChallenge with mock data
    await createChallenge(
      mockFirestoreCtrl,
      challengeData.challenge_name,
      challengeData.description,
      null,
      challengeData.date
    );
  
    // Verify FirestoreCtrl methods were called correctly
    expect(mockFirestoreCtrl.getUser).toHaveBeenCalled();
    expect(mockFirestoreCtrl.newChallenge).toHaveBeenCalledWith(
        expect.objectContaining({
            challenge_name: "Test Challenge",
            description: "Test Description",
            uid: "user123",
            date: challengeData.date,
            location: null,
        }));
  });

  it("should log an error when Firestore operations fail", async () => {
    mockFirestoreCtrl.getUser = jest.fn().mockRejectedValue(new Error("Firestore error"));

    await expect(
      createChallenge(mockFirestoreCtrl, "Test", "Description", null)
    ).resolves.toBeUndefined(); // Function should handle the error internally
  });
});