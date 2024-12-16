import { jest } from '@jest/globals';
import * as LocalStorageCtrl from '@/src/models/firebase/LocalStorageCtrl';
import * as TypeFirestoreCtrl from '@/src/models/firebase/TypeFirestoreCtrl';
import * as SetFirestoreCtrl from '@/src/models/firebase/SetFirestoreCtrl';
import * as GetFirestoreCtrl from '@/src/models/firebase/GetFirestoreCtrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NetInfo from '@react-native-community/netinfo';
import * as FileSystem from 'expo-file-system';

// Mock the imported dependencies
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(() => Promise.resolve({ isConnected: true, isInternetReachable: true })),
}));

jest.mock('expo-file-system', () => ({
  cacheDirectory: 'file://mockCacheDirectory/',
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('@/src/models/firebase/SetFirestoreCtrl', () => ({
  uploadImage: jest.fn(() => Promise.resolve()),
  newChallenge: jest.fn(() => Promise.resolve()),
  newGroup: jest.fn(() => Promise.resolve()),
  newComment: jest.fn(() => Promise.resolve()),
  updateGroup: jest.fn(() => Promise.resolve()),
}));

jest.mock('@/src/models/firebase/LocalStorageCtrl', () => {
  const originalModule = jest.requireActual('@/src/models/firebase/LocalStorageCtrl');
  return {
    ...originalModule,
    getUploadTaskScheduled: jest.fn(() => Promise.resolve(false)),
    setUploadTaskScheduled: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('@/src/models/firebase/GetFirestoreCtrl', () => ({
  getUser: jest.fn(() =>
    Promise.resolve({
      uid: 'mockUserId',
      name: 'Mock User',
      email: 'mock@example.com',
      createdAt: new Date(),
    })
  ),
}));

jest.mock('@firebase/firestore', () => ({
  GeoPoint: jest.fn().mockImplementation((lat, lng) => ({
    latitude: lat,
    longitude: lng,
  })),
}));

// Import types
import {
  DBChallenge,
  DBGroup,
  DBComment,
} from '@/src/models/firebase/TypeFirestoreCtrl';

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('LocalStorageCtrl', () => {
  describe('setUploadTaskScheduled', () => {
    it('should set uploadTaskScheduled flag', async () => {
      await LocalStorageCtrl.setUploadTaskScheduled(true);
      const result = await LocalStorageCtrl.getUploadTaskScheduled();
      expect(result).toBe(true);
    });
  });

  describe('getUploadTaskScheduled', () => {
    it('should get uploadTaskScheduled flag', async () => {
      await LocalStorageCtrl.setUploadTaskScheduled(true);
      const result = await LocalStorageCtrl.getUploadTaskScheduled();
      expect(result).toBe(true);
    });
  });

  describe('getStoredImageUploads', () => {
    it('should retrieve stored image uploads', async () => {
      const mockData = [{ id: 'image1', uri: 'file://image1.jpg' }];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

      const result = await LocalStorageCtrl.getStoredImageUploads();
      expect(result).toEqual(mockData);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@images');
    });

    it('should return empty array if no data', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await LocalStorageCtrl.getStoredImageUploads();
      expect(result).toEqual([]);
    });
  });

  describe('getStoredChallenges', () => {
    it('should retrieve stored challenges', async () => {
      const mockChallenge: DBChallenge = {
        challenge_id: 'challenge1',
        caption: 'Test Caption',
        uid: 'user1',
        challenge_description: 'Test Description',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([mockChallenge]));

      const result = await LocalStorageCtrl.getStoredChallenges();
      expect(result).toEqual([mockChallenge]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@challenges');
    });

    it('should return empty array if no data', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await LocalStorageCtrl.getStoredChallenges();
      expect(result).toEqual([]);
    });
  });

  describe('getStoredGroups', () => {
    it('should retrieve stored groups', async () => {
      const mockGroup: DBGroup = {
        gid: 'group1',
        name: 'Test Group',
        challengeTitle: 'Test Challenge',
        members: ['user1'],
        updateDate: new Date(),
        location: { latitude: 0, longitude: 0 },
        radius: 10,
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([mockGroup]));

      const result = await LocalStorageCtrl.getStoredGroups();
      expect(result).toEqual([mockGroup]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@groups');
    });

    it('should return empty array if no data', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await LocalStorageCtrl.getStoredGroups();
      expect(result).toEqual([]);
    });
  });

  describe('getStoredComments', () => {
    it('should retrieve stored comments', async () => {
      const mockComment: DBComment = {
        comment_text: 'Test Comment',
        user_name: 'Test User',
        created_at: new Date(),
        post_id: 'post1',
        uid: 'user1',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([mockComment]));

      const result = await LocalStorageCtrl.getStoredComments();
      expect(result).toEqual([mockComment]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@comment');
    });

    it('should return empty array if no data', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await LocalStorageCtrl.getStoredComments();
      expect(result).toEqual([]);
    });
  });

  describe('storeImageLocally', () => {
    it('should store image upload data in AsyncStorage', async () => {
      const id_picture = 'image1';
      const localUri = `${FileSystem.cacheDirectory}${id_picture}`;
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      await LocalStorageCtrl.storeImageLocally(id_picture);

      const expectedData = [{ id: id_picture, uri: localUri }];
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@images', JSON.stringify(expectedData));
    });

    it('should append to existing stored images', async () => {
      const id_picture = 'image2';
      const localUri = `${FileSystem.cacheDirectory}${id_picture}`;
      const existingData = [{ id: 'image1', uri: 'file://image1.jpg' }];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(existingData));

      await LocalStorageCtrl.storeImageLocally(id_picture);

      const expectedData = [...existingData, { id: id_picture, uri: localUri }];
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@images', JSON.stringify(expectedData));
    });

    it('should handle errors when storing image', async () => {
      const error = new Error('AsyncStorage error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);

      await LocalStorageCtrl.storeImageLocally('image1');
      expect(console.error).toHaveBeenCalledWith('Error storing image upload data:', error);
    });
  });

  describe('storeChallengeLocally', () => {
    it('should store challenge data in AsyncStorage', async () => {
      const mockChallenge: DBChallenge = {
        challenge_id: 'challenge1',
        caption: 'Test Caption',
        uid: 'user1',
        challenge_description: 'Test Description',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      await LocalStorageCtrl.storeChallengeLocally(mockChallenge);

      const expectedData = [mockChallenge];
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@challenges', JSON.stringify(expectedData));
    });

    it('should not store duplicate challenges', async () => {
      const mockChallenge: DBChallenge = {
        challenge_id: 'challenge1',
        caption: 'Test Caption',
        uid: 'user1',
        challenge_description: 'Test Description',
      };
      const existingData = [mockChallenge];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(existingData));

      await LocalStorageCtrl.storeChallengeLocally(mockChallenge);

      expect(console.log).toHaveBeenCalledWith('Challenge already stored.');
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });

    it('should handle errors when storing challenge', async () => {
      const error = new Error('AsyncStorage error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);

      await LocalStorageCtrl.storeChallengeLocally({ challenge_id: 'challenge1' } as DBChallenge);
      expect(console.error).toHaveBeenCalledWith('Error storing challenge locally:', error);
    });
  });

  describe('storeGroupLocally', () => {
    it('should store group data in AsyncStorage', async () => {
      const mockGroup: DBGroup = {
        gid: 'group1',
        name: 'Test Group',
        challengeTitle: 'Test Challenge',
        members: ['user1'],
        updateDate: new Date(),
        location: { latitude: 0, longitude: 0 },
        radius: 10,
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      await LocalStorageCtrl.storeGroupLocally(mockGroup);

      const expectedData = [mockGroup];
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@groups', JSON.stringify(expectedData));
    });

    it('should not store duplicate groups', async () => {
      const mockGroup: DBGroup = {
        gid: 'group1',
        name: 'Test Group',
        challengeTitle: 'Test Challenge',
        members: ['user1'],
        updateDate: new Date(),
        location: { latitude: 0, longitude: 0 },
        radius: 10,
      };
      const existingData = [mockGroup];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(existingData));

      await LocalStorageCtrl.storeGroupLocally(mockGroup);

      expect(console.log).toHaveBeenCalledWith('Group already stored');
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });

    it('should handle errors when storing group', async () => {
      const error = new Error('AsyncStorage error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);

      await LocalStorageCtrl.storeGroupLocally({ gid: 'group1' } as DBGroup);
      expect(console.error).toHaveBeenCalledWith('Error storing group locally:', error);
    });
  });

  describe('storeCommentLocally', () => {
    it('should store comment data in AsyncStorage', async () => {
      const mockComment: DBComment = {
        comment_text: 'Test Comment',
        user_name: 'Test User',
        created_at: new Date(),
        post_id: 'post1',
        uid: 'user1',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      await LocalStorageCtrl.storeCommentLocally(mockComment);

      const expectedData = [mockComment];
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@comment', JSON.stringify(expectedData));
    });

    it('should not store duplicate comments', async () => {
      const mockComment: DBComment = {
        comment_text: 'Test Comment',
        user_name: 'Test User',
        created_at: new Date(),
        post_id: 'post1',
        uid: 'user1',
      };
      const existingData = [mockComment];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(existingData));

      await LocalStorageCtrl.storeCommentLocally(mockComment);

      expect(console.log).toHaveBeenCalledWith('Comment already stored.');
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });

    it('should handle errors when storing comment', async () => {
      const error = new Error('AsyncStorage error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);

      await LocalStorageCtrl.storeCommentLocally({} as DBComment);
      expect(console.error).toHaveBeenCalledWith('Error storing comment locally:', error);
    });
  });

  describe('uploadStoredImages', () => {
    it('should upload stored images and clear them from AsyncStorage', async () => {
      const mockUploads = [{ id: 'image1', uri: 'file://image1.jpg' }];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockUploads));
      (SetFirestoreCtrl.uploadImage as jest.Mock).mockResolvedValueOnce(undefined);

      await LocalStorageCtrl.uploadStoredImages();

      expect(SetFirestoreCtrl.uploadImage).toHaveBeenCalledWith('file://image1.jpg', 'image1');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@images', JSON.stringify([]));
      expect(console.log).toHaveBeenCalledWith('Local images uploaded and cleared');
    });

    it('should handle errors when uploading images', async () => {
      const error = new Error('Upload error');
      const mockUploads = [{ id: 'image1', uri: 'file://image1.jpg' }];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockUploads));
      (SetFirestoreCtrl.uploadImage as jest.Mock).mockRejectedValueOnce(error);

      await LocalStorageCtrl.uploadStoredImages();

      expect(console.error).toHaveBeenCalledWith('Error uploading stored image:', error, mockUploads[0]);
    });

    it('should do nothing if there are no images to upload', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      await LocalStorageCtrl.uploadStoredImages();

      expect(console.log).toHaveBeenCalledWith('No stored images to upload.');
      expect(SetFirestoreCtrl.uploadImage).not.toHaveBeenCalled();
    });
  });

  describe('uploadStoredChallenges', () => {
    it('should upload stored challenges and clear them from AsyncStorage', async () => {
      const mockChallenge: DBChallenge = {
        challenge_id: 'challenge1',
        caption: 'Test Caption',
        uid: 'user1',
        challenge_description: 'Test Description',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([mockChallenge]));
      (SetFirestoreCtrl.newChallenge as jest.Mock).mockResolvedValueOnce(undefined);

      await LocalStorageCtrl.uploadStoredChallenges();

      expect(SetFirestoreCtrl.newChallenge).toHaveBeenCalledWith(mockChallenge);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@challenges', JSON.stringify([]));
      expect(console.log).toHaveBeenCalledWith('Local challenges uploaded and cleared');
    });

    it('should handle errors when uploading challenges', async () => {
      const error = new Error('Upload error');
      const mockChallenge: DBChallenge = {
        challenge_id: 'challenge1',
        caption: 'Test Caption',
        uid: 'user1',
        challenge_description: 'Test Description',
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([mockChallenge]));
      (SetFirestoreCtrl.newChallenge as jest.Mock).mockRejectedValueOnce(error);

      await LocalStorageCtrl.uploadStoredChallenges();

      expect(console.error).toHaveBeenCalledWith('Error uploading stored challenge:', error, mockChallenge);
    });

    it('should do nothing if there are no challenges to upload', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      await LocalStorageCtrl.uploadStoredChallenges();

      expect(console.log).toHaveBeenCalledWith('No stored challenges to upload.');
      expect(SetFirestoreCtrl.newChallenge).not.toHaveBeenCalled();
    });
  });

  describe('uploadStoredGroups', () => {
    it('should upload stored groups and clear them from AsyncStorage', async () => {
      const mockGroup: DBGroup = {
        gid: 'group1',
        name: 'Test Group',
        challengeTitle: 'Test Challenge',
        members: ['user1'],
        updateDate: new Date(),
        location: { latitude: 0, longitude: 0 },
        radius: 10,
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([mockGroup]));
      (SetFirestoreCtrl.newGroup as jest.Mock).mockResolvedValueOnce(undefined);

      await LocalStorageCtrl.uploadStoredGroups();

      expect(SetFirestoreCtrl.newGroup).toHaveBeenCalledWith(mockGroup);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@groups', JSON.stringify([]));
      expect(console.log).toHaveBeenCalledWith('Local groups uploaded and cleared');
    });

    it('should handle errors when uploading groups', async () => {
      const error = new Error('Upload error');
      const mockGroup: DBGroup = {
        gid: 'group1',
        name: 'Test Group',
        challengeTitle: 'Test Challenge',
        members: ['user1'],
        updateDate: new Date(),
        location: { latitude: 0, longitude: 0 },
        radius: 10,
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([mockGroup]));
      (SetFirestoreCtrl.newGroup as jest.Mock).mockRejectedValueOnce(error);

      await LocalStorageCtrl.uploadStoredGroups();

      expect(console.error).toHaveBeenCalledWith('Error uploading stored group:', error, mockGroup);
    });

    it('should do nothing if there are no groups to upload', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      await LocalStorageCtrl.uploadStoredGroups();

      expect(console.log).toHaveBeenCalledWith('No stored groups to upload.');
      expect(SetFirestoreCtrl.newGroup).not.toHaveBeenCalled();
    });
  });

  describe('scheduleUploadTask', () => {
    it('should call upload functions and log success', async () => {
      jest.spyOn(LocalStorageCtrl, 'uploadStoredImages').mockResolvedValueOnce();
      jest.spyOn(LocalStorageCtrl, 'uploadStoredChallenges').mockResolvedValueOnce();
      jest.spyOn(LocalStorageCtrl, 'uploadStoredGroups').mockResolvedValueOnce();

      await LocalStorageCtrl.scheduleUploadTask();

      expect(LocalStorageCtrl.uploadStoredImages).toHaveBeenCalled();
      expect(LocalStorageCtrl.uploadStoredChallenges).toHaveBeenCalled();
      expect(LocalStorageCtrl.uploadStoredGroups).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Background upload task finished successfully');
    });

    it('should handle errors during scheduled task', async () => {
      const error = new Error('Scheduled task error');
      jest.spyOn(LocalStorageCtrl, 'uploadStoredImages').mockRejectedValueOnce(error);
      jest.spyOn(LocalStorageCtrl, 'uploadStoredChallenges').mockResolvedValueOnce();
      jest.spyOn(LocalStorageCtrl, 'uploadStoredGroups').mockResolvedValueOnce();

      await LocalStorageCtrl.scheduleUploadTask();

      expect(console.error).toHaveBeenCalledWith('Error in background task:', error);
    });
  });

  // For backgroundTask, since it's an infinite loop, we need to be careful in testing
  // We can test that it calls scheduleUploadTask when conditions are met
  describe('backgroundTask', () => {
    it('should call scheduleUploadTask when conditions are met', async () => {
      jest.useFakeTimers();

      jest.spyOn(LocalStorageCtrl, 'scheduleUploadTask').mockResolvedValueOnce();
      (LocalStorageCtrl.getUploadTaskScheduled as jest.Mock).mockResolvedValueOnce(true);
      (NetInfo.fetch as jest.Mock).mockResolvedValueOnce({
        isConnected: true,
        isInternetReachable: true,
      });

      const backgroundPromise = LocalStorageCtrl.backgroundTask();

      // Fast-forward time
      jest.advanceTimersByTime(5000);

      // Wait for the background promise to proceed
      await Promise.resolve();

      expect(LocalStorageCtrl.scheduleUploadTask).toHaveBeenCalled();

      // Since it's an infinite loop, we need to stop it
      backgroundPromise.then(() => {}, () => {});
      jest.clearAllTimers();
      jest.useRealTimers();
    });
  });
});
