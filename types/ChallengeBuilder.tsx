import FirestoreCtrl, { DBChallenge } from "@/firebase/FirestoreCtrl";
import { useState, useEffect } from 'react';
import { ImageSourcePropType } from 'react-native';

// Define a type for the challenge data needed by the component
type ChallengeData = {
  challengeName: string;
  description?: string;
  image: ImageSourcePropType;
  userName: string;
  location?: string;
  dateTime: string;
};

export const buildChallenge = async (
  challengeId: string,
  firestoreCtrl: FirestoreCtrl
): Promise<ChallengeData | null> => {
  try {
    // Fetch the challenge data from Firestore
    const challenge = await firestoreCtrl.getChallenge(challengeId);

    if (!challenge) return null;

    // Fetch additional required data like user's name
    const userName = await firestoreCtrl.getName(challenge.uid);
    const imageUrl = await firestoreCtrl.uploadImageFromUri(challenge.image_id); // Assuming image_id is the URL

    // Format the date and time
    const dateTime = new Date(challenge.date).toLocaleString();

    const challengeData: ChallengeData = {
      challengeName: challenge.challenge_name,
      description: challenge.description,
      image: { uri: imageUrl },
      userName: userName || 'Unknown User',
      dateTime,
    };

    return challengeData;
  } catch (error) {
    console.error("Error building challenge: ", error);
    return null;
  }
};

// A function to be used in a hook to fetch challenge data
export const useFetchChallenge = (challengeId: string, firestoreCtrl: FirestoreCtrl) => {
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);

  useEffect(() => {
    const fetchChallengeData = async () => {
      const data = await buildChallenge(challengeId, firestoreCtrl);
      setChallengeData(data);
    };

    if (challengeId) {
      fetchChallengeData();
    }
  }, [challengeId, firestoreCtrl]);

  return challengeData;
};
