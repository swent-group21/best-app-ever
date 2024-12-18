import { jest } from '@jest/globals';
import { GeoPoint } from "firebase/firestore";
import * as GetFirestoreCtrl from '@/src/models/firebase/GetFirestoreCtrl';
import * as TypeFirestoreCtrl from '@/src/models/firebase/TypeFirestoreCtrl';

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
} from '@/src/models/firebase/GetFirestoreCtrl';

// Mock the imported dependencies
jest.mock('@/src/models/firebase/Firebase', () => ({
  firestore: {},
  doc: jest.fn(() => ({})),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => true, data: () => ({}) })),
  getDocs: jest.fn(() => Promise.resolve({ docs: [], empty: true })),
  collection: jest.fn(() => ({})),
  query: jest.fn(() => ({})),
  where: jest.fn(() => ({})),
  limit: jest.fn(() => ({})),
  auth: {
    currentUser: { uid: 'currentUserId' },
  },
  GeoPoint: jest.fn().mockImplementation((lat, lng) => ({
    latitude: lat,
    longitude: lng,
    isEqual: (other) => lat === other.latitude && lng === other.longitude,
    toJSON: () => ({ latitude: lat, longitude: lng }),
  })),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({})),
  ref: jest.fn(() => ({})),
  getDownloadURL: jest.fn(() => Promise.resolve('https://example.com/image.jpg')),
}));

// Mock data
const mockDBUser: TypeFirestoreCtrl.DBUser = {
  uid: 'testUserId',
  name: 'Test User',
  email: 'test@example.com',
  createdAt: new Date(),
  friends: ['friendId'],
  userRequestedFriends: ['requestedFriendId'],
  friendsRequestedUser: ['friendRequestId'],
};

const mockDBChallenge: TypeFirestoreCtrl.DBChallenge = {
  challenge_id: 'challengeId',
  caption: 'Test Challenge',
  uid: 'testUserId',
  challenge_description: 'Description',
  date: new Date(),
  likes: ['userId1']
};

const mockDBComment: TypeFirestoreCtrl.DBComment = {
  comment_text: 'Test comment',
  user_name: 'Test user',
  created_at: new Date(),
  post_id: 'challengeId',
  uid: 'testUserId',
};

const mockDBGroup: TypeFirestoreCtrl.DBGroup = {
  gid: 'groupId',
  name: 'Test Group',
  challengeTitle: 'Test Challenge',
  members: ['testUserId', 'friendId'],
  updateDate: new Date(),
  location: new GeoPoint(43.6763, 7.0122),
  radius: 10,
};

const mockDBChallengeDescription: TypeFirestoreCtrl.DBChallengeDescription = {
  title: 'Test Title',
  description: 'Test Description',
  endDate: new Date(),
};

import { 
  firestore, 
  doc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  limit, 
  auth 
} from '@/src/models/firebase/Firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('GetFirestoreCtrl', () => {
  describe('getUser', () => {
    it('should retrieve a user by provided UID', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true, 
        data: () => mockDBUser,
      });

      const result = await getUser('testUserId');
      expect(result).toEqual(mockDBUser);
      expect(doc).toHaveBeenCalledWith(firestore, 'users', 'testUserId');
    });

    it('should retrieve a user using currentUser if UID not provided', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true, 
        data: () => mockDBUser,
      });
      auth.currentUser = { uid: 'currentUserId' };
      const result = await getUser();
      expect(result).toEqual(mockDBUser);
      expect(doc).toHaveBeenCalledWith(firestore, 'users', 'currentUserId');
    });

    it('should throw an error if user does not exist', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });
      await getUser('nonExistingUserId')
      expect(console.error).toHaveBeenCalledWith('User not found.');
    });

    it('should use anonymous user account if no UID and no currentUser', async () => {
      auth.currentUser = null;
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true, 
        data: () => mockDBUser,
      });
      const result = await getUser();
      expect(result).toEqual(mockDBUser);
      expect(doc).toHaveBeenCalledWith(firestore, 'users', 'rhf9LyQ4r1UGZWtepzFENAjJQfo2');
    });

    it('should handle errors when getting user', async () => {
      const error = new Error('Firestore error');
      (getDoc as jest.Mock).mockRejectedValueOnce(error);
      await expect(getUser('testUserId')).rejects.toThrow('Error getting user');
    });
  });

  describe('getImageUrl', () => {
    it('should return the download URL of an image', async () => {
      const result = await getImageUrl('imageId');
      expect(result).toBe('https://example.com/image.jpg');
      expect(ref).toHaveBeenCalledWith(getStorage(), 'images/imageId');
    });

    it('should handle errors when getting image URL', async () => {
      const error = new Error('Storage error');
      (getDownloadURL as jest.Mock).mockRejectedValueOnce(error);
      await expect(getImageUrl('imageId')).rejects.toThrow(error);
    });
  });

  describe('getChallenge', () => {
    it('should retrieve a challenge by ID', async () => {
      const mockData = { ...mockDBChallenge, date: { toDate: () => mockDBChallenge.date } };
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockData,
      });

      const result = await getChallenge('challengeId');
      expect(result).toEqual(mockDBChallenge);
    });

    it('should throw an error if challenge does not exist', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });
      await expect(getChallenge('nonExistingChallengeId')).rejects.toThrow('Challenge not found.');
    });

    it('should handle errors when getting challenge', async () => {
      const error = new Error('Firestore error');
      (getDoc as jest.Mock).mockRejectedValueOnce(error);
      await expect(getChallenge('challengeId')).rejects.toThrow(error);
      expect(console.log).toHaveBeenCalledWith('Error getting Challenge: ', error);
    });
  });

  describe('getChallengesByUserId', () => {
    it('should retrieve challenges by user ID', async () => {
      const mockData = { ...mockDBChallenge, date: { toDate: () => mockDBChallenge.date } };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { id: 'challengeId', data: () => mockData },
        ],
      });

      const result = await getChallengesByUserId('testUserId');
      expect(result).toEqual([mockDBChallenge]);
    });

    it('should handle errors when getting challenges', async () => {
      const error = new Error('Firestore error');
      (getDocs as jest.Mock).mockRejectedValueOnce(error);
      await expect(getChallengesByUserId('testUserId')).rejects.toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Error getting challenges by user ID: ', error);
    });
  });

  describe('getKChallenges', () => {
    it('should retrieve first k challenges', async () => {
      const mockData = { ...mockDBChallenge, date: { toDate: () => mockDBChallenge.date } };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { id: 'challengeId', data: () => mockData },
        ],
      });

      const result = await getKChallenges(1);
      expect(result).toEqual([mockDBChallenge]);
    });

    it('should handle errors when getting challenges', async () => {
      const error = new Error('Firestore error');
      (getDocs as jest.Mock).mockRejectedValueOnce(error);
      await expect(getKChallenges(1)).rejects.toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Error getting challenges: ', error);
    });
  });

  describe('getCommentsOf', () => {
    it('should retrieve comments of a challenge', async () => {
      const mockData = { ...mockDBComment, created_at: { toDate: () => mockDBComment.created_at } };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { id: 'commentId', data: () => mockData },
        ],
      });

      const result = await getCommentsOf('challengeId');
      expect(result).toEqual([{ ...mockDBComment, comment_id: 'commentId' }]);
    });

    it('should handle errors when getting comments', async () => {
      const error = new Error('Firestore error');
      (getDocs as jest.Mock).mockRejectedValueOnce(error);
      await expect(getCommentsOf('challengeId')).rejects.toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Error getting comments: ', error);
    });
  });

  describe('getGroupsByUserId', () => {
    it('should retrieve groups by user ID', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => ({ ...mockDBUser, groups: ['group1'] }),
      });
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { id: 'group1', data: () => mockDBGroup },
        ],
      });

      const result = await getGroupsByUserId('testUserId');
      expect(result).toEqual([{ gid: 'group1', ...mockDBGroup }]);
    });

    it('should return empty array if user has no groups', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => ({ ...mockDBUser, groups: [] }),
      });

      const result = await getGroupsByUserId('testUserId');
      expect(result).toEqual([]);
    });

    it('should handle errors when getting groups', async () => {
      const error = new Error('Firestore error');
      (getDoc as jest.Mock).mockRejectedValueOnce(error);
      await expect(getGroupsByUserId('testUserId')).rejects.toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Error getting groups by user ID: ', error);
    });
  });

  describe('getUsersInGroup', () => {
    it('should retrieve users in a group', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => mockDBGroup,
      });
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { id: 'testUserId', data: () => mockDBUser },
          { id: 'friendId', data: () => ({ ...mockDBUser, uid: 'friendId' }) },
        ],
      });

      const result = await getUsersInGroup('groupId');
      expect(result).toEqual([
        { uid: 'testUserId', ...mockDBUser },
        { uid: 'friendId', ...mockDBUser, uid: 'friendId' },
      ]);
    });

    it('should return empty array if group has no members', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => ({ ...mockDBGroup, members: [] }),
      });

      const result = await getUsersInGroup('groupId');
      expect(result).toEqual([]);
    });

    it('should handle errors when getting users in group', async () => {
      const error = new Error('Firestore error');
      (getDoc as jest.Mock).mockRejectedValueOnce(error);
      await expect(getUsersInGroup('groupId')).rejects.toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Error getting groups by user ID: ', error);
    });
  });

  describe('getAllPostsOfGroup', () => {
    it('should retrieve all posts of a group', async () => {
      const mockData = { ...mockDBChallenge, date: { toDate: () => mockDBChallenge.date } };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { id: 'challengeId', data: () => mockData },
        ],
      });

      const result = await getAllPostsOfGroup('groupId');
      expect(result).toEqual([mockDBChallenge]);
    });

    it('should handle errors when getting posts', async () => {
      const error = new Error('Firestore error');
      (getDocs as jest.Mock).mockRejectedValueOnce(error);
      await expect(getAllPostsOfGroup('groupId')).rejects.toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Error getting posts: ', error);
    });
  });

  describe('getGroup', () => {
    it('should retrieve a group by ID', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockDBGroup,
      });

      const result = await getGroup('groupId');
      expect(result).toEqual(mockDBGroup);
    });

    it('should throw an error if group does not exist', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });
      await expect(getGroup('nonExistingGroupId')).rejects.toThrow('Group not found.');
    });

    it('should handle errors when getting group', async () => {
      const error = new Error('Firestore error');
      (getDoc as jest.Mock).mockRejectedValueOnce(error);
      await expect(getGroup('groupId')).rejects.toThrow(error);
      expect(console.log).toHaveBeenCalledWith('Error getting Group: ', error);
    });
  });

  describe('getChallengeDescription', () => {
    it('should retrieve the current challenge description', async () => {
      const mockData = { ...mockDBChallengeDescription, Date: { toDate: () => mockDBChallengeDescription.endDate } };
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { id: 'descId', data: () => mockData },
        ],
      });

      const result = await getChallengeDescription();
      expect(result).toEqual(mockDBChallengeDescription);
    });

    it('should handle errors when getting challenge description', async () => {
      const error = new Error('Firestore error');
      (getDocs as jest.Mock).mockRejectedValueOnce(error);
      await expect(getChallengeDescription()).rejects.toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Error getting challenge description: ', error);
    });
  });

  describe('getAllUsers', () => {
    it('should retrieve all users', async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { data: () => mockDBUser },
        ],
      });

      const result = await getAllUsers();
      expect(result).toEqual([mockDBUser]);
    });

    it('should handle errors when getting all users', async () => {
      const error = new Error('Firestore error');
      (getDocs as jest.Mock).mockRejectedValueOnce(error);
      await expect(getAllUsers()).rejects.toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Error getting all users: ', error);
    });
  });

});
