// GetFirestoreCtrl.test.ts
import { jest } from "@jest/globals";
import { GeoPoint } from "firebase/firestore";
import * as GetFirestoreCtrl from "@/src/models/firebase/GetFirestoreCtrl";
import * as TypeFirestoreCtrl from "@/src/models/firebase/TypeFirestoreCtrl";

// Import functions to test
import {
  getUser,
  getImageUrl,
  getName,
  getProfilePicture,
  getChallenge,
  getChallengesByUserId,
  getKChallenges,
  getCommentsOf,
  getGroupsByUserId,
  getUsersInGroup,
  getAllPostsOfGroup,
  getGroup,
  getLikesOf,
  getChallengeDescription,
  getAllUsers,
  getFriends,
  getRequestedFriends,
  getFriendRequests,
  getPostsByChallengeTitle,
  isFriend,
  isRequested,
  getFriendSuggestions,
} from "@/src/models/firebase/GetFirestoreCtrl";

// Mock the imported dependencies
jest.mock("@/src/models/firebase/Firebase", () => ({
  firestore: {},
  doc: jest.fn(() => ({})),
  getDoc: jest.fn(() =>
    Promise.resolve({ exists: () => true, data: () => ({}) }),
  ),
  getDocs: jest.fn(() => Promise.resolve({ docs: [], empty: true })),
  collection: jest.fn(() => ({})),
  query: jest.fn(() => ({})),
  where: jest.fn(() => ({})),
  limit: jest.fn(() => ({})),
  auth: {
    currentUser: { uid: "currentUserId" },
  },
  GeoPoint: jest.fn().mockImplementation((lat, lng) => ({
    latitude: lat,
    longitude: lng,
    isEqual: (other) => lat === other.latitude && lng === other.longitude,
    toJSON: () => ({ latitude: lat, longitude: lng }),
  })),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(() => ({})),
  ref: jest.fn(() => ({})),
  getDownloadURL: jest.fn(() =>
    Promise.resolve("https://example.com/image.jpg"),
  ),
}));

// Now, import the mocked functions
import {
  firestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  auth,
} from "@/src/models/firebase/Firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Mock data
const mockDBUser: TypeFirestoreCtrl.DBUser = {
  uid: "testUserId",
  name: "Test User",
  email: "test@example.com",
  createdAt: new Date(),
  friends: ["friendId"],
  userRequestedFriends: ["requestedFriendId"],
  friendsRequestedUser: ["friendRequestId"],
};

const mockFriendUser: TypeFirestoreCtrl.DBUser = {
  uid: "friendId",
  name: "Friend User",
  email: "friend@example.com",
  createdAt: new Date(),
  friends: ["testUserId"],
};

const mockDBChallenge: TypeFirestoreCtrl.DBChallenge = {
  challenge_id: "challengeId",
  caption: "Test Challenge",
  uid: "testUserId",
  challenge_description: "Description",
  date: new Date(),
  likes: ["userId1"],
};

const mockDBComment: TypeFirestoreCtrl.DBComment = {
  comment_text: "Test comment",
  user_name: "Test user",
  created_at: new Date(),
  post_id: "challengeId",
  uid: "testUserId",
};

const mockDBGroup: TypeFirestoreCtrl.DBGroup = {
  gid: "groupId",
  name: "Test Group",
  challengeTitle: "Test Challenge",
  members: ["testUserId", "friendId"],
  updateDate: new Date(),
  location: new GeoPoint(43.6763, 7.0122),
  radius: 10,
};

const mockDBChallengeDescription: TypeFirestoreCtrl.DBChallengeDescription = {
  title: "Test Title",
  description: "Test Description",
  endDate: new Date(),
};

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("GetFirestoreCtrl", () => {
  describe("getUser", () => {
    it("should retrieve a user by provided UID", async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockDBUser,
      });

      const result = await getUser("testUserId");
      expect(result).toEqual(mockDBUser);
      expect(doc).toHaveBeenCalledWith(firestore, "users", "testUserId");
    });

    it("should retrieve currentUser if UID not provided", async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockDBUser,
      });

      const result = await getUser();
      expect(result).toEqual(mockDBUser);
      expect(doc).toHaveBeenCalledWith(firestore, "users", "currentUserId");
    });

    it("should use anonymous user if no UID and no currentUser", async () => {
      auth.currentUser = null;
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockDBUser,
      });

      const result = await getUser();
      expect(result).toEqual(mockDBUser);
      expect(doc).toHaveBeenCalledWith(
        firestore,
        "users",
        "rhf9LyQ4r1UGZWtepzFENAjJQfo2",
      );
    });

    it("should throw an error if user does not exist", async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });

      await expect(getUser("nonExistingUserId")).rejects.toThrow(
        "User not found.",
      );
    });

    it("should handle errors when getting user", async () => {
      const error = new Error("Error getting user");
      (getDoc as jest.Mock).mockRejectedValueOnce(error);

      await expect(getUser("testUserId")).rejects.toThrow("Error getting user");
    });
  });

  describe("getImageUrl", () => {
    it("should return the download URL of an image", async () => {
      const result = await getImageUrl("imageId");
      expect(result).toBe("https://example.com/image.jpg");
      expect(ref).toHaveBeenCalledWith(getStorage(), "images/imageId");
      expect(getDownloadURL).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should handle errors when getting image URL", async () => {
      const error = new Error("Failed to get download URL");
      (getDownloadURL as jest.Mock).mockRejectedValueOnce(error);

      await expect(getImageUrl("imageId")).rejects.toThrow(error);
    });
  });

  describe("getName", () => {
    it("should return the name of the user", async () => {
      jest.spyOn(GetFirestoreCtrl, "getUser").mockResolvedValueOnce(mockDBUser);

      const result = await getName("testUserId");
      expect(result).toBe("Test User");
    });

    it("should handle errors when getting user name", async () => {
      const error = new Error("Error getting user");
      jest.spyOn(GetFirestoreCtrl, "getUser").mockRejectedValueOnce(error);

      await expect(getName("testUserId")).rejects.toThrow(error);
    });
  });

  describe("getProfilePicture", () => {
    it("should return the profile picture ID of the user", async () => {
      const mockUser = { ...mockDBUser, image_id: "image123" };
      jest.spyOn(GetFirestoreCtrl, "getUser").mockResolvedValueOnce(mockUser);

      const result = await getProfilePicture("testUserId");
      expect(result).toBe("image123");
    });

    it("should handle errors when getting profile picture", async () => {
      const error = new Error("Error getting user");
      jest.spyOn(GetFirestoreCtrl, "getUser").mockRejectedValueOnce(error);

      await expect(getProfilePicture("testUserId")).rejects.toThrow(error);
    });
  });

  describe("getChallenge", () => {
    it("should retrieve a challenge by ID", async () => {
      const mockData = {
        ...mockDBChallenge,
        date: { toDate: () => mockDBChallenge.date },
      };
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockData,
      });

      const result = await getChallenge("challengeId");
      expect(result).toEqual(mockDBChallenge);
      expect(getDoc).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should throw an error if challenge does not exist", async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
      });

      await expect(getChallenge("nonExistingChallengeId")).rejects.toThrow(
        "Challenge not found.",
      );
    });

    it("should handle errors when getting challenge", async () => {
      const error = new Error("Error getting challenge");
      (getDoc as jest.Mock).mockRejectedValueOnce(error);

      await expect(getChallenge("challengeId")).rejects.toThrow(error);
    });
  });

  describe("getChallengesByUserId", () => {
    it("should retrieve challenges by user ID", async () => {
      const mockData = {
        ...mockDBChallenge,
        date: { toDate: () => mockDBChallenge.date },
      };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [{ id: "challengeId", data: () => mockData }],
      });

      const result = await getChallengesByUserId("testUserId");
      expect(result).toEqual([mockDBChallenge]);
      expect(query).toHaveBeenCalledWith(
        expect.any(Object),
        where("uid", "==", "testUserId"),
      );
    });

    it("should handle errors when retrieving challenges", async () => {
      const error = new Error("Error getting challenges");
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      await expect(getChallengesByUserId("testUserId")).rejects.toThrow(error);
    });
  });

  describe("getKChallenges", () => {
    it("should retrieve first k challenges", async () => {
      const mockData = {
        ...mockDBChallenge,
        date: { toDate: () => mockDBChallenge.date },
      };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [{ id: "challengeId", data: () => mockData }],
      });

      const result = await getKChallenges(5);
      expect(result).toEqual([mockDBChallenge]);
      expect(query).toHaveBeenCalledWith(expect.any(Object), limit(5));
    });

    it("should handle errors when retrieving challenges", async () => {
      const error = new Error("Error getting challenges");
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      await expect(getKChallenges(5)).rejects.toThrow(error);
    });
  });

  describe("getCommentsOf", () => {
    it("should retrieve comments of a challenge", async () => {
      const mockData = {
        ...mockDBComment,
        created_at: { toDate: () => mockDBComment.created_at },
      };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [{ id: "commentId", data: () => mockData }],
      });

      const result = await getCommentsOf("challengeId");
      expect(result).toEqual([{ ...mockDBComment, comment_id: "commentId" }]);
      expect(query).toHaveBeenCalledWith(
        expect.any(Object),
        where("post_id", "==", "challengeId"),
      );
    });

    it("should handle errors when retrieving comments", async () => {
      const error = new Error("Error getting comments");
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      await expect(getCommentsOf("challengeId")).rejects.toThrow(error);
    });
  });

  describe("getGroupsByUserId", () => {
    it("should retrieve groups for a user", async () => {
      const mockUserData = {
        ...mockDBUser,
        groups: ["group1", "group2"],
      };
      (getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => mockUserData,
      });
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { id: "group1", data: () => mockDBGroup },
          { id: "group2", data: () => mockDBGroup },
        ],
      });

      const result = await getGroupsByUserId("testUserId");
      expect(result).toEqual([
        { gid: "group1", ...mockDBGroup },
        { gid: "group2", ...mockDBGroup },
      ]);
    });

    it("should return empty array if user has no groups", async () => {
      const mockUserData = {
        ...mockDBUser,
        groups: [],
      };
      (getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => mockUserData,
      });

      const result = await getGroupsByUserId("testUserId");
      expect(result).toEqual([]);
    });

    it("should handle errors when retrieving groups", async () => {
      const error = new Error("Error getting groups");
      (getDoc as jest.Mock).mockRejectedValueOnce(error);

      await expect(getGroupsByUserId("testUserId")).rejects.toThrow(error);
    });
  });

  describe("getUsersInGroup", () => {
    it("should retrieve users in a group", async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => mockDBGroup,
      });
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { id: "testUserId", data: () => mockDBUser },
          { id: "friendId", data: () => ({ ...mockDBUser, uid: "friendId" }) },
        ],
      });

      const result = await getUsersInGroup("groupId");
      expect(result).toEqual([
        { uid: "testUserId", ...mockDBUser },
        { uid: "friendId", ...mockDBUser, uid: "friendId" },
      ]);
    });

    it("should return empty array if group has no members", async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => ({ ...mockDBGroup, members: [] }),
      });

      const result = await getUsersInGroup("groupId");
      expect(result).toEqual([]);
    });

    it("should handle errors when retrieving users in group", async () => {
      const error = new Error("Error getting users in group");
      (getDoc as jest.Mock).mockRejectedValueOnce(error);

      await expect(getUsersInGroup("groupId")).rejects.toThrow(error);
    });
  });

  describe("getAllPostsOfGroup", () => {
    it("should retrieve all posts of a group", async () => {
      const mockData = {
        ...mockDBChallenge,
        date: { toDate: () => mockDBChallenge.date },
      };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [{ id: "challengeId", data: () => mockData }],
      });

      const result = await getAllPostsOfGroup("groupId");
      expect(result).toEqual([mockDBChallenge]);
    });

    it("should handle errors when retrieving posts", async () => {
      const error = new Error("Error getting posts");
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      await expect(getAllPostsOfGroup("groupId")).rejects.toThrow(error);
    });
  });

  describe("getGroup", () => {
    it("should retrieve a group by ID", async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockDBGroup,
      });

      const result = await getGroup("groupId");
      expect(result).toEqual(mockDBGroup);
    });

    it("should throw an error if group does not exist", async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
      });

      await expect(getGroup("nonExistingGroupId")).rejects.toThrow(
        "Group not found.",
      );
    });

    it("should handle errors when getting group", async () => {
      const error = new Error("Error getting group");
      (getDoc as jest.Mock).mockRejectedValueOnce(error);

      await expect(getGroup("groupId")).rejects.toThrow(error);
    });
  });

  describe("getLikesOf", () => {
    it("should retrieve likes of a challenge", async () => {
      jest
        .spyOn(GetFirestoreCtrl, "getChallenge")
        .mockResolvedValueOnce(mockDBChallenge);

      const result = await getLikesOf("challengeId");
      expect(result).toEqual(["userId1"]);
    });

    it("should handle errors when retrieving likes", async () => {
      const error = new Error("Error getting challenge");
      jest.spyOn(GetFirestoreCtrl, "getChallenge").mockRejectedValueOnce(error);

      await expect(getLikesOf("challengeId")).rejects.toThrow(error);
    });
  });

  describe("getChallengeDescription", () => {
    it("should retrieve the current challenge description", async () => {
      const mockData = {
        Title: mockDBChallengeDescription.title,
        Description: mockDBChallengeDescription.description,
        Date: { toDate: () => mockDBChallengeDescription.endDate },
      };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [{ data: () => mockData }],
      });

      const result = await getChallengeDescription();
      expect(result).toEqual(mockDBChallengeDescription);
    });

    it("should handle errors when retrieving challenge description", async () => {
      const error = new Error("Error getting challenge description");
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      await expect(getChallengeDescription()).rejects.toThrow(error);
    });
  });

  describe("getAllUsers", () => {
    it("should retrieve all users", async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [{ data: () => mockDBUser }],
      });

      const result = await getAllUsers();
      expect(result).toEqual([mockDBUser]);
    });

    it("should handle errors when retrieving all users", async () => {
      const error = new Error("Error getting all users");
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      await expect(getAllUsers()).rejects.toThrow(error);
    });
  });

  // Continue rewriting tests for remaining functions (getFriends, getRequestedFriends, etc.)

  // Example for getFriends
  describe("getFriends", () => {
    it("should retrieve friends of a user", async () => {
      jest.spyOn(GetFirestoreCtrl, "getUser").mockResolvedValueOnce(mockDBUser);
      jest
        .spyOn(GetFirestoreCtrl, "getUser")
        .mockResolvedValueOnce(mockFriendUser); // For the friend

      const result = await getFriends("testUserId");
      expect(result).toEqual([mockFriendUser]);
    });

    it("should handle errors when retrieving friends", async () => {
      const error = new Error("Error getting user");
      jest.spyOn(GetFirestoreCtrl, "getUser").mockRejectedValueOnce(error);

      await expect(getFriends("testUserId")).rejects.toThrow(error);
    });
  });

  // Similarly, you can rewrite tests for getRequestedFriends, getFriendRequests, getPostsByChallengeTitle, isFriend, isRequested, getFriendSuggestions, etc.

  // Example for isFriend
  describe("isFriend", () => {
    it("should return true if users are friends", async () => {
      jest.spyOn(GetFirestoreCtrl, "getUser").mockResolvedValueOnce(mockDBUser);

      const result = await isFriend("testUserId", "friendId");
      expect(result).toBe(true);
    });

    it("should return false if users are not friends", async () => {
      jest.spyOn(GetFirestoreCtrl, "getUser").mockResolvedValueOnce({
        ...mockDBUser,
        friends: [],
      });

      const result = await isFriend("testUserId", "friendId");
      expect(result).toBe(false);
    });

    it("should handle errors when checking friendship", async () => {
      const error = new Error("Error getting user");
      jest.spyOn(GetFirestoreCtrl, "getUser").mockRejectedValueOnce(error);

      await expect(isFriend("testUserId", "friendId")).rejects.toThrow(error);
    });
  });

  // Continue with the remaining functions...
});
