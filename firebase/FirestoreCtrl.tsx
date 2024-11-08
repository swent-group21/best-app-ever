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

    const storageRef = ref(getStorage(), "images/" + (Math.random()+1).toString(36).substring(2)); 

    await uploadBytes(storageRef, blob);

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading image: ", error);
    console.log("Error uploading image: ", error);
    throw error;
  }
}

async getName(id : string) {
  const user = await this.getUser(id);
  return user?.name;
}

async getImageFromFirebase(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching image: ", error);
    throw error;
  }
}

}





