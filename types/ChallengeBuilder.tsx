import FirestoreCtrl, { DBChallenge } from "@/firebase/FirestoreCtrl";
import { useState, useEffect } from 'react';
import { ImageSourcePropType } from 'react-native';

export const buildChallenge = async (
  challengeId: string,
  firestoreCtrl: FirestoreCtrl
): Promise<DBChallenge | null> => {
  try {
    // Fetch the challenge data from Firestore
    const challenge = await firestoreCtrl.getChallenge(challengeId);

    if (!challenge) return null;

    // Fetch additional required data like user's name
    const userName = await firestoreCtrl.getName(challenge.uid);
    const imageUrl = await firestoreCtrl.uploadImageFromUri(challenge.image_id); // Assuming image_id is the URL

    // Format the date and time
    const dateTime = new Date(challenge.date).toLocaleString();

    const challengeData: DBChallenge = {
      challenge_name: challenge.challenge_name,
      description: challenge.description,
      image_id: challenge.image_id,
      uid: challenge.uid,
      date: challenge.date,
    };

    return challengeData;
  } catch (error) {
    console.error("Error building challenge: ", error);
    return null;
  }
};

// A function to be used in a hook to fetch challenge data
export const useFetchChallenge = (challengeId: string, firestoreCtrl: FirestoreCtrl) => {
  const [challengeData, setDBChallenge] = useState<DBChallenge | null>(null);

  useEffect(() => {
    const fetchDBChallenge = async () => {
      const data = await buildChallenge(challengeId, firestoreCtrl);
      setDBChallenge(data);
    };

    if (challengeId) {
      fetchDBChallenge();
    }
  }, [challengeId, firestoreCtrl]);

  return challengeData;
};


export const createChallenge = async (
  challengeData: DBChallenge,
  firestoreCtrl: FirestoreCtrl
): Promise<string | null> => {
  try {
    // Upload image and get image ID
    let image_id = '';
    if ('uri' in challengeData.image_id && challengeData.image.uri) {
      image_id = await firestoreCtrl.uploadImageFromUri(challengeData.image.uri);
    }

    // Prepare the challenge data for Firestore
    const uid = firestoreCtrl.getUser().uid; // Ensure this method exists
    const challenge: DBChallenge = {
      challenge_name: challengeData.challengeName,
      description: challengeData.description || '',
      uid: uid,
      date: new Date(challengeData.dateTime).toISOString(),
      location: challengeData.location || '',
      image_id: image_id,
      // Add other fields as needed
    };

    // Save the challenge to Firestore
    const challengeId = await firestoreCtrl.createChallenge(challenge);
    return challengeId;
  } catch (error) {
    console.error("Error creating challenge: ", error);
    return null;
  }
};
