import {
  firestore,
  doc,
  getDoc,
  setDoc,
} from "./Firebase";


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
   * Add other create and get for challenges user info etc
   */

  


}


