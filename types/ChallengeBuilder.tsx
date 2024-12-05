import FirestoreCtrl, { DBChallenge, DBUser } from "@/firebase/FirestoreCtrl";
import { GeoPoint } from "firebase/firestore";
import { LocationObject } from "expo-location";

/**
 * Used to build an already created Challenge from Firestore DB
 */
export const buildChallenge = async (
  challengeId: string,
  firestoreCtrl: FirestoreCtrl,
): Promise<DBChallenge> => {
  try {
    // Fetch the challenge data from Firestore
    const challenge = await firestoreCtrl.getChallenge(challengeId);

    if (!challenge) {
      throw "Error: no challenge found when buildChallenge";
    }
    // Fetch additional required data like user's name
    await firestoreCtrl.getName(challenge.uid);
    //const imageUrl = await firestoreCtrl.uploadImageFromUri(challenge.image_id); // Assuming image_id is the URL

    const challengeData: DBChallenge = {
      challenge_name: challenge.challenge_name,
      description: challenge.description,
      uid: challenge.uid,
      date: challenge.date,
      location: challenge.location,
    };

    return challengeData;
  } catch (error) {
    throw error;
  }
};

/**
 * Used to create a Challenge and store it in Firestore DB
 */
export const createChallenge = async (
  firestoreCtrl: FirestoreCtrl,
  challenge_name: string,
  description: string,
  location: LocationObject | null,
  date?: Date,
  image_id?: string,
  likes?: string[],
): Promise<void> => {
  try {
    // Prepare the challenge data for Firestore
    const user: DBUser = await firestoreCtrl.getUser();
    //console.log("createChallenge uid", user.uid);

    // Convert the location object to a Firestore GeoPoint
    let locationFirebase =
      location === null
        ? null
        : new GeoPoint(location.coords.latitude, location.coords.longitude);

    const newChallenge: DBChallenge = {
      challenge_name: challenge_name,
      description: description || "",
      uid: user.uid,
      image_id: image_id,
      likes: likes || [],
      location: locationFirebase,
    };

    if (image_id) {
      const image_url = await firestoreCtrl.getImageUrl(image_id);
      newChallenge.image_id = image_url;
    }

    if (date) {
      newChallenge.date = date;
    }

    // Save the challenge to Firestore
    await firestoreCtrl.newChallenge(newChallenge);
  } catch (error) {
    console.error("Error creating challenge: ", error);
  }
};
