
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { DBUser, DBGroup, DBComment, DBChallenge } from "@/src/models/firebase/TypeFirestoreCtrl";
import { uploadImage } from "./SetFirestoreCtrl";


// Unique keys for AsyncStorage
const CHALLENGE_STORAGE_KEY = "@challenges";
const GROUP_STORAGE_KEY = "@groups";
const IMAGE_STORAGE_KEY = "@images";
const COMMENT_STORAGE_KEY = "@comment";

export let uploadTaskScheduled = false;

/*
* Background checker
*/
export async function backgroundTask() {
  while (true) {
    try {
      const networkState = await NetInfo.fetch();
      if (
        networkState.isConnected &&
        networkState.isInternetReachable &&
        uploadTaskScheduled
      ) {
        console.log("Starting scheduled upload task...");
        await this.scheduleUploadTask();
        uploadTaskScheduled = false; // Reset the flag after task completion
        console.log(
          "Scheduled upload task completed. uploadTaskScheduled set to false.",
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Check every 5 seconds
    } catch (error) {
      console.error("Error in background task:", error);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait even on error to avoid busy loop
    }
  }
};

/*
 * Function to start the uploading task
 */
export async function scheduleUploadTask() {
  try {
    await this.uploadStoredImages();
    await this.uploadStoredChallenges();
    await this.uploadStoredGroups();

    console.log("Background upload task finished successfully");
  } catch (error) {
    console.error("Error in background task:", error);
  }
};

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


/**
 * Stores image upload data in AsyncStorage.
 * @param id_picture The id of the image to upload.
 * @returns The download URL of the image.
 */
export async function storeImageLocally(id_picture: string): Promise<void> {
  const localUri = `${FileSystem.cacheDirectory}${id_picture}`;
  try {
    const uploadData = { id: id_picture, uri: localUri };
    const storedUploads = (await this.getStoredImageUploads()) || [];
    storedUploads.push(uploadData);
    AsyncStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(storedUploads));
    console.log("Image upload data stored locally:", uploadData);
  } catch (error) {
    console.error("Error storing image upload data:", error);
  }
}


/**
 *
 * Store Challenge into the local cache
 *
 */
export async function storeChallengeLocally(challengeData: DBChallenge): Promise<void> {
  const storedChallenges = await this.getStoredChallenges();
  storedChallenges.forEach((sChallenge) => {
    if (sChallenge.challenge_id == challengeData.challenge_id) {
      console.log("Challenge already stored.");
      return;
    }
  });
                                                                           
  storedChallenges.push(challengeData);
  await AsyncStorage.setItem(
    CHALLENGE_STORAGE_KEY,
    JSON.stringify(storedChallenges),
  );
}

/**
 *
 * Store Group into the local cache
 *
 */
export async function storeGroupLocally(groupData: DBGroup): Promise<void> {
  const storedGroups: DBGroup[] = await this.getStoredGroups();
  storedGroups.forEach((sGroup) => {
    if (sGroup.gid == groupData.gid) {
      console.log("Group already stored");
      return;
    }
  });
                                                                           
  storedGroups.push(groupData);
  await AsyncStorage.setItem(
    GROUP_STORAGE_KEY,
    JSON.stringify(storedGroups),
  );
}

/**
 *
 * Store Comment into the local cache
 *
 */
export async function storeCommentLocally(commentData: DBComment): Promise<void> {
  const storedComments = await this.getStoredComments();
  storedComments.forEach((sComment) => {
    if (sComment.created_at == commentData.created_at) {
      console.log("Comment already stored.");
      return;
    }
  });
                                                                      
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
  const storedUploads = await this.getStoredImageUploads();

  if (storedUploads && storedUploads.length > 0) {
    for (const upload of storedUploads) {
      try {
        //Attempt to upload to firestore
        await uploadImage(upload.uri, upload.id);

        // Remove the successfully uploaded image from AsyncStorage
        const updatedUploads = storedUploads.filter(
          (item) => item.id !== upload.id,
        );

        AsyncStorage.setItem(
          IMAGE_STORAGE_KEY,
          JSON.stringify(updatedUploads),
        );
      } catch (error) {
        console.error("Error uploading stored image:", error, upload);
        //If fails to upload because of any reason stop the loop and wait for the next background trigger
        return;
      }
    }
    console.log("Local images uploaded and cleared");
  } else {
    console.log("No stored images to upload.");
  }
}

/**
 * Uploads all stored Challenges.
 */
export async function uploadStoredChallenges(): Promise<void> {
  const storedChallenges: DBChallenge[] = await this.getStoredChallenges();
  if (storedChallenges && storedChallenges.length > 0) {
    for (const challenge of storedChallenges) {
      try {
        //Attempt to upload to firestore
        await this.newChallenge(challenge);
        console.log("Stored challenge uploaded:", challenge.challenge_id);
        // Remove the successfully uploaded challenge from AsyncStorage
        const updatedChallenges = storedChallenges.filter(
          (item) => item.challenge_id !== challenge.challenge_id,
        );
        AsyncStorage.setItem(
          CHALLENGE_STORAGE_KEY,
          JSON.stringify(updatedChallenges),
        );
      } catch (error) {
        console.error("Error uploading stored challenge:", error, challenge);
        //If fails to upload because of any reason stop the loop and wait for the next background trigger
        return;
      }
    }
    console.log("Local challenges uploaded and cleared");
  } else {
    console.log("No stored challenges to upload.");
  }
}

/**
 * Uploads all stored Groups.
 */
export async function uploadStoredGroups(): Promise<void> {
  const storedGroups = await this.getStoredGroups();
  if (storedGroups && storedGroups.length > 0) {
    for (const group of storedGroups) {
      try {
        //Attempt to upload to firestore
        await this.newGroup(group);
        console.log("Stored group uploaded:", group.gid);
        // Remove the successfully uploaded group from AsyncStorage
        const updatedGroups = storedGroups.filter(
          (item) => item.gid !== group.gid,
        );
        AsyncStorage.setItem(
          GROUP_STORAGE_KEY,
          JSON.stringify(updatedGroups),
        );
      } catch (error) {
        console.error("Error uploading stored group:", error, group);
        //If fails to upload because of any reason stop the loop and wait for the next background trigger
        return;
      }
    }
    console.log("Local groups uploaded and cleared");
  } else {
    console.log("No stored groups to upload.");
  }
}

