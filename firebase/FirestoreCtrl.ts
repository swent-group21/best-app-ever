import {
  firestore,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  auth,
  collection,
  query,
  where,
} from "./Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export type DBUser = {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  image_id?: string;
  createdAt: Date;
};

export type DBChallenge = {
  challenge_id?: string; // Add this line
  challenge_name: string;
  description?: string;
  uid: string;
  image_id?: string;
  comment_id?: string;
  date: Date;
  location?: Location;
};

export type DBComment = {
  comment_id: string;
  prev_id: string;
  next_id?: string;
  comment_text: string;
  uid: string;
};

export default class FirestoreCtrl {
  /**
   * Creates or updates a user document in Firestore.
   * @param userId The UID of the user.
   * @param userData The user data to store or update.
   */
  async createUser(userId: string, userData: DBUser): Promise<void> {
    try {
      userData.uid = userId;
      await setDoc(doc(firestore, "users", userId), userData);
    } catch (error) {
      console.error("Error writing user document: ", error);
    }
  }

  /**
   * Retrieves a user document from Firestore by UID.
   * If no userId is provided, it checks for `auth.currentUser`.
   * If there's no `auth.currentUser`, it uses the anonymous user account with a specific ID.
   * @param userId The UID of the user to retrieve.
   * @returns A promise that resolves to the user data or null if not found.
   */
  async getUser(userId?: string): Promise<DBUser> {
    try {
      let uid: string;
      if (userId != null) {
        uid = userId;
      } else {
        const currUser = auth.currentUser;
        if (currUser != null) {
          uid = currUser.uid;
        } else {
          // Use the anonymous user account ID
          uid = "rhf9LyQ4r1UGZWtepzFENAjJQfo2";
        }
      }
      const userRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data() as DBUser;
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload an image to Firestore storage.
   */
  async uploadImageFromUri(imageUri: string) {
    try {
      if (!imageUri) {
        throw new Error("No image URI provided.");
      }

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const id_picture = (Math.random() + 1).toString(36).substring(2);
      const storageRef = ref(getStorage(), "images/" + id_picture);
      console.log("StorageRef:", storageRef);

      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);
      console.log("DownloadUrl", downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image: ", error);
      console.log("Error uploading image: ", error);
      throw error;
    }
  }

  /**
   * Get the name of a user by their UID.
   */
  async getName(id: string) {
    try {
      const user = await this.getUser(id);
      return user?.name;
    } catch (error) {
      console.error("Error getting name: ", error);
      throw error;
    }
  }

  /**
   * Set the name of a user by their UID.
   */
  async setName(id: string, name: string) {
    try {
      const user = await this.getUser(id);
      user.name = name;
      await this.createUser(id, user);
    } catch (error) {
      console.error("Error setting name: ", error);
      throw error;
    }
  }

  /**
   * Get the profile picture of a user by their UID.
   */
  async getProfilePicture(id: string) {
    try {
      const user = await this.getUser(id);
      return user?.image_id;
    } catch (error) {
      console.error("Error getting profile picture: ", error);
      throw error;
    }
  }

  /**
   * Set the profile picture of a user by their UID.
   */
  async setProfilePicture(id: string, imageUri: string) {
    try {
      const user = await this.getUser(id);
      user.image_id = await this.uploadImageFromUri(imageUri);
      await this.createUser(id, user);
    } catch (error) {
      console.error("Error setting profile picture: ", error);
      throw error;
    }
  }

  /**
   * Create a challenge using the challenge_id and DBChallenge
   */
  async newChallenge(challengeData: DBChallenge): Promise<void> {
    try {
      const docRef = await addDoc(
        collection(firestore, "challenges"),
        challengeData,
      );
      console.log("Challenge id: ", docRef.id);
    } catch (error) {
      console.error("Error writting challenge document: ", error);
      throw error;
    }
  }

  /**
   * Create a challenge using the challenge_id and DBChallenge
   */
  async getChallenge(challengeId: string): Promise<DBChallenge> {
    try {
      const challengeRef = doc(firestore, "challenges", challengeId);
      const docSnap = await getDoc(challengeRef);
      if (docSnap.exists()) {
        return docSnap.data() as DBChallenge;
      } else {
        throw new Error("Challenge not found.");
      }
    } catch (error) {
      console.log("Error getting Challenge: ", error);
      throw error;
    }
  }

  /**
   * Retrieves all challenges created by a specific user.
   * @param uid The UID of the user whose challenges are to be fetched.
   * @returns A promise that resolves to an array of challenges.
   */
  async getChallengesByUserId(uid: string): Promise<DBChallenge[]> {
    try {
      const challengesRef = collection(firestore, "challenges");
      const q = query(challengesRef, where("uid", "==", uid));

      const querySnapshot = await getDocs(q);
      const challenges = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("Challenge data retrieved:", data);
        return {
          ...data,
          challenge_id: doc.id,
        } as DBChallenge;
      });
      return challenges;
    } catch (error) {
      console.error("Error getting challenges by user ID: ", error);
      throw error;
    }
  }
}
