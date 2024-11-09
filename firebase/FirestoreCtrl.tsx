import {
  firestore,
  doc,
  getDoc,
  setDoc,
  storage,
  auth
} from "./Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";


export type DBUser = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
};

export type DBChallenge = {
  challenge_name: string;
  description?: string;
  uid: string;
  image_id: string;
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
      await setDoc(doc(firestore, "users", userId), userData);
    } catch (error) {
      console.error("Error writing user document: ", error);
    }
  }

  /**
   * Retrieves a user document from Firestore by UID.
   * @param userId The UID of the user to retrieve.
   * @returns A promise that resolves to the user data or null if not found.
   */
  async getUser(userId: string): Promise<DBUser | null> {
    try {
      const userRef = doc(firestore, "users", userId);
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
  async uploadImageFromUri(imageUri:string) {
    try {
      if (!imageUri) {
        throw new Error("No image URI provided.");
      }

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const id_picture = (Math.random()+1).toString(36).substring(2);
      const storageRef = ref(getStorage(), "images/" + id_picture); 

      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);
      return id_picture;

    } catch (error) {
      console.error("Error uploading image: ", error);
      console.log("Error uploading image: ", error);
      throw error;
    }
  }

  /**
   * Create a challenge using the challenge_id and DBChallenge
   */
  async createChallenge(challengeId: string, challengeData: DBChallenge): Promise<void> {
    try {
      await setDoc(doc(firestore, "challenges", challengeId), challengeData);
    } catch (error) {
      console.error("Error writting challenge document: ", error);
    }
  }

  /**
   * Create a challenge using the challenge_id and DBChallenge
   */
  async getChallenge(challengeId: string): Promise<DBChallenge | null> {
    try {
      const challengeRef = doc(firestore, "challenges", challengeId);
      const docSnap = await getDoc(challengeRef);
      if (docSnap.exists()) {
        return docSnap.data() as DBChallenge;
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      throw error;
    }
  }

  async getName(id : string) {
    const user = await this.getUser(id);
    return user?.name;
  }

}





