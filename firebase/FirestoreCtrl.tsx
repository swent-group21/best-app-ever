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

    // Convertir l'URI en Blob
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Créer une référence Firebase Storage unique
    const storageRef = ref(getStorage(), "images/" + Date.now()); // Utilisation de 'ref' avec le stockage

    // Uploader l'image vers Firebase Storage
    await uploadBytes(storageRef, blob);

    // Récupérer l'URL de l'image uploadée
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
}



