import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { DBGroup, DBComment, DBChallenge, DBUser } from "@/src/models/firebase/TypeFirestoreCtrl";
import { newChallenge, newGroup, uploadImage } from "@/src/models/firebase/SetFirestoreCtrl";

// Unique keys for AsyncStorage
const USER_STORAGE_KEY = "@user";
const CHALLENGE_STORAGE_KEY = "@challenges";
const GROUP_STORAGE_KEY = "@groups";
const IMAGE_STORAGE_KEY = "@images";
const COMMENT_STORAGE_KEY = "@comment";

// Flag to prevent multiple simultaneous uploads
let uploadTaskScheduled: boolean = false;

/**
 * Getter for the uploadTaskScheduled
 */
export async function setUploadTaskScheduled(setTo: boolean) {
  uploadTaskScheduled = setTo;
}

/**
 * Setter for the uploadTaskScheduler
 */
export async function getUploadTaskScheduled() {
  return uploadTaskScheduled;
}

// Variable to hold the network state listener unsubscribe function
let networkListenerUnsubscribe: (() => void) | null = null;

/**
 * Starts listening for network connectivity changes.
 */
export function startNetworkListener() {
  if (networkListenerUnsubscribe) {
    // Listener already set up
    return;
  }

  networkListenerUnsubscribe = NetInfo.addEventListener(async (state) => {
    console.log("Network state change:", state);

    if (state.isConnected && state.isInternetReachable) {
      console.log("Network is connected and internet is reachable.");

      if (uploadTaskScheduled) {
        const hasTasks = await checkIfThereAreStoredTasks();
        if (hasTasks) {
          uploadStoredTasks();
        }
      }
    }
  });
}

/**
 * Stops listening for network connectivity changes.
 */
export function stopNetworkListener() {
  if (networkListenerUnsubscribe) {
    networkListenerUnsubscribe();
    networkListenerUnsubscribe = null;
  }
}

/**
 * Checks if there are any tasks stored locally that need to be uploaded.
 */
async function checkIfThereAreStoredTasks(): Promise<boolean> {
  const storedImages = await getStoredImageUploads();
  const storedChallenges = await getStoredChallenges();
  const storedGroups = await getStoredGroups();
  // Add checks for other stored tasks if needed.
  return (
    (storedImages && storedImages.length > 0) ||
    (storedChallenges && storedChallenges.length > 0) ||
    (storedGroups && storedGroups.length > 0)
  );
}

/**
 * Uploads all stored tasks (images, challenges, groups).
 */
async function uploadStoredTasks() {
  if (uploadTaskScheduled) {
    console.log("Upload already in progress.");
    return;
  }
  uploadTaskScheduled = true;

  try {
    console.log("Starting to upload stored tasks...");
    await uploadStoredImages();
    await uploadStoredChallenges();
    await uploadStoredGroups();
    console.log("All stored tasks uploaded.");
  } catch (error) {
    console.error("Error uploading stored tasks:", error);
  } finally {
    uploadTaskScheduled = false;
  }
}

export async function getStoredImageUploads(): Promise<any[]> {
  const storedData = await AsyncStorage.getItem(IMAGE_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
}

export async function getStoredChallenges(): Promise<DBChallenge[]> {
  const storedData = await AsyncStorage.getItem(CHALLENGE_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
}

export async function getStoredGroups(): Promise<DBGroup[]> {
  const storedData = await AsyncStorage.getItem(GROUP_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
}

export async function getStoredComments(): Promise<DBComment[]> {
  const storedData = await AsyncStorage.getItem(COMMENT_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
}

export async function getStoredImageById(img_id): Promise<any> {
  const storedImages = await getStoredImageUploads();
  console.log("Searching locally for: ", img_id);
  console.log("Stored Images: ", storedImages);
  let img_uri = "";
  storedImages.forEach((img) => {
    if (img.id == img_id) {
      img_uri = img_id;
    }
  });
  return img_uri;
}

export async function getStoredUser(): Promise<DBUser | null> {
  try {
    const userString = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return userString !== null ? (JSON.parse(userString) as DBUser) : null;
  } catch (e) {
    console.error("Failed to fetch user from storage", e);
    return null;
  }
}

/**
 * Removes the user from AsyncStorage.
 */
export async function removeUserLocally(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    console.log("Removed User")
  } catch (e) {
    console.error("Failed to remove user from storage", e);
  }
}

/**
 * Stores user in AsyncStorage.
 */
export async function storeUserLocally(user: DBUser): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save user role to storage", e);
  }
}

/**
 * Stores image upload data in AsyncStorage.
 * @param id_picture The id of the image to upload.
 */
export async function storeImageLocally(id_picture: string): Promise<void> {
  const localUri = `${FileSystem.cacheDirectory}${id_picture}`;
  try {
    const uploadData = { id: id_picture, uri: localUri };
    const storedUploads = (await getStoredImageUploads()) || [];
    storedUploads.push(uploadData);
    await AsyncStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(storedUploads));
    console.log("Image upload data stored locally:", uploadData);
  } catch (error) {
    console.error("Error storing image upload data:", error);
  }
}

/**
 * Stores Challenge into the local cache.
 */
export async function storeChallengeLocally(
  challengeData: DBChallenge,
): Promise<void> {
  const storedChallenges = await getStoredChallenges();

  const alreadyStored = storedChallenges.some((sChallenge) => {
    return sChallenge.challenge_id === challengeData.challenge_id;
  });

  if (alreadyStored) {
    console.log("Challenge already stored.");
    return;
  }

  storedChallenges.push(challengeData);
  await AsyncStorage.setItem(
    CHALLENGE_STORAGE_KEY,
    JSON.stringify(storedChallenges),
  );
}

/**
 * Stores Group into the local cache.
 */
export async function storeGroupLocally(groupData: DBGroup): Promise<void> {
  const storedGroups: DBGroup[] = await getStoredGroups();

  const alreadyStored = storedGroups.some((sGroup) => sGroup.gid === groupData.gid);

  if (alreadyStored) {
    console.log("Group already stored");
    return;
  }

  storedGroups.push(groupData);
  await AsyncStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(storedGroups));
}

/**
 * Stores Comment into the local cache.
 */
export async function storeCommentLocally(
  commentData: DBComment,
): Promise<void> {
  const storedComments = await getStoredComments();

  const alreadyStored = storedComments.some(
    (sComment) => sComment.created_at === commentData.created_at,
  );

  if (alreadyStored) {
    console.log("Comment already stored.");
    return;
  }

  storedComments.push(commentData);
  await AsyncStorage.setItem(
    COMMENT_STORAGE_KEY,
    JSON.stringify(storedComments),
  );
}

/**
 * Uploads all stored images.
 */
export async function uploadStoredImages(): Promise<void> {
  const storedUploads = await getStoredImageUploads();

  if (storedUploads && storedUploads.length > 0) {
    const failedUploads = [];
    const successfulUploads = [];

    for (const upload of storedUploads) {
      try {
        await uploadImage(undefined, upload.id);
        successfulUploads.push(upload.id);
      } catch (error) {
        console.error("Error uploading stored image:", error, upload);
        failedUploads.push(upload);
      }
    }

    if (successfulUploads.length > 0) {
      // Remove the successfully uploaded images from AsyncStorage
      const remainingUploads = storedUploads.filter(
        (item) => !successfulUploads.includes(item.id),
      );
      await AsyncStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(remainingUploads));
    }

    if (failedUploads.length === 0) {
      console.log("Local images uploaded and cleared");
    } else {
      console.log("Some images failed to upload. Will retry later.");
    }
  } else {
    console.log("No stored images to upload.");
  }
}

/**
 * Uploads all stored Challenges.
 */
export async function uploadStoredChallenges(): Promise<void> {
  const storedChallenges: DBChallenge[] = await getStoredChallenges();
  if (storedChallenges && storedChallenges.length > 0) {
    const failedChallenges = [];
    const successfulChallenges = [];

    for (const challenge of storedChallenges) {
      try {
        await newChallenge(challenge);
        console.log("Stored challenge uploaded:", challenge.challenge_id);
        successfulChallenges.push(challenge.challenge_id);
      } catch (error) {
        console.error("Error uploading stored challenge:", error, challenge);
        failedChallenges.push(challenge);
      }
    }

    if (successfulChallenges.length > 0) {
      // Remove the successfully uploaded challenges from AsyncStorage
      const remainingChallenges = storedChallenges.filter(
        (item) => !successfulChallenges.includes(item.challenge_id),
      );
      await AsyncStorage.setItem(
        CHALLENGE_STORAGE_KEY,
        JSON.stringify(remainingChallenges),
      );
    }

    if (failedChallenges.length === 0) {
      console.log("Local challenges uploaded and cleared");
    } else {
      console.log("Some challenges failed to upload. Will retry later.");
    }
  } else {
    console.log("No stored challenges to upload.");
  }
}

/**
 * Uploads all stored Groups.
 */
export async function uploadStoredGroups(): Promise<void> {
  const storedGroups = await getStoredGroups();
  if (storedGroups && storedGroups.length > 0) {
    const failedGroups = [];
    const successfulGroups = [];

    for (const group of storedGroups) {
      try {
        await newGroup(group);
        console.log("Stored group uploaded:", group.gid);
        successfulGroups.push(group.gid);
      } catch (error) {
        console.error("Error uploading stored group:", error, group);
        failedGroups.push(group);
      }
    }

    if (successfulGroups.length > 0) {
      // Remove the successfully uploaded groups from AsyncStorage
      const remainingGroups = storedGroups.filter(
        (item) => !successfulGroups.includes(item.gid),
      );
      await AsyncStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(remainingGroups));
    }

    if (failedGroups.length === 0) {
      console.log("Local groups uploaded and cleared");
    } else {
      console.log("Some groups failed to upload. Will retry later.");
    }
  } else {
    console.log("No stored groups to upload.");
  }
}
