import FirestoreCtrl, { DBChallenge, DBUser } from "@/firebase/FirestoreCtrl";

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
  date: Date,
  description: string,
  image_id?: string,
  location?: Location,
  comment_id?: string,
): Promise<void> => {
  try {
    // Prepare the challenge data for Firestore
    const user: DBUser = await firestoreCtrl.getUser();
    console.log("createChallenge uid", user.uid);
    console.log("image builder", image_id);

    const newChallenge: DBChallenge = {
      challenge_name: challenge_name,
      description: description || "",
      uid: user.uid,
      date: date,
      // Add other fields as needed
    };

    if (image_id) {
      const image_url = await firestoreCtrl.getImageUrl(image_id);
      newChallenge.image_id = image_url;
    }

    console.log("newChallenge: ", newChallenge)
    // Save the challenge to Firestore
    await firestoreCtrl.newChallenge(newChallenge);
  } catch (error) {
    console.error("Error creating challenge: ", error);
  }
};
