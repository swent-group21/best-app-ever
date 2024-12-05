import FirestoreCtrl, {
  DBChallenge,
  DBUser,
} from "@/src/models/firebase/FirestoreCtrl";
import { GeoPoint, Timestamp } from "firebase/firestore";
import { LocationObject } from "expo-location";

/**
 * Used to create a Challenge and store it in Firestore DB
 * @param firestoreCtrl : FirestoreCtrl object
 * @param challenge_name : the name of the challenge
 * @param description : the description of the challenge
 * @param location : the location of the challenge
 * @param date : the date of the challenge
 * @param image_id : the image id of the challenge
 * @param likes : the likes of the challenge
 */
export const createChallenge = async (
  firestoreCtrl: FirestoreCtrl,
  caption: string,
  location: LocationObject | null,
  challenge_description: string,
  date?: Timestamp,
  image_id?: string,
  likes?: string[],
): Promise<void> => {
  try {
    // Prepare the challenge data for Firestore
    const user: DBUser = await firestoreCtrl.getUser();
    console.log("createChallenge uid", user.uid);

    if (location == null) {
      console.log("location undefined");
    }

    // Convert the location object to a Firestore GeoPoint
    let locationFirebase =
      location === null
        ? null
        : new GeoPoint(location.coords.latitude, location.coords.longitude);

    const newChallenge: DBChallenge = {
      caption: caption || "",
      uid: user.uid,
      image_id: image_id,
      likes: likes || [],
      location: locationFirebase,
      challenge_description: challenge_description,
      date: date,
    };

    if (date) {
      newChallenge.date = date;
    }

    // Save the challenge to Firestore
    await firestoreCtrl.newChallenge(newChallenge);
  } catch (error) {
    console.error("Error creating challenge: ", error);
  }
};
