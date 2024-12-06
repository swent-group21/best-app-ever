import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import FirestoreCtrl, {
  DBChallenge,
  DBChallengeDescription,
} from "../../models/firebase/FirestoreCtrl";

/**
 * Default location centered on the city of Nice, France.
 */
const defaultLocation = {
  coords: {
    latitude: 43.6763,
    longitude: 7.0122,
  },
} as LocationObject;

/**
 * View model for the map screen.
 * @param firestoreCtrl : FirestoreCtrl object
 * @returns : permission, userLocation, and challengesWithLocation
 */
export function useMapScreenViewModel(firestoreCtrl: FirestoreCtrl) {
  const [permission, setPermission] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<LocationObject | undefined>(
    undefined,
  );
  const [challengesWithLocation, setChallengesWithLocation] = useState<
    DBChallenge[]
  >([]);
  const [titleChallenge, setTitleChallenge] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });
  const [description, setDescription] = useState<string>();

  /**
   * Requests permission to access the user's location and fetches their current location.
   */
  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status === "granted") {
          setPermission(true);
          const location = await getCurrentPositionAsync();
          setUserLocation(location);
        } else {
          setPermission(false);
          setUserLocation(defaultLocation);
        }
      } catch (error) {
        console.error("Error getting location permission or location:", error);
        setUserLocation(defaultLocation);
      }
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchCurrentChallenge = async () => {
      try {
        const currentChallengeData =
          await firestoreCtrl.getChallengeDescription();
        const formattedChallenge = {
          title: currentChallengeData.Title,
          description: currentChallengeData.Description,
          endDate: currentChallengeData.endDate, // Conversion Timestamp -> Date
        };
        setTitleChallenge(formattedChallenge);
        return formattedChallenge.title;
      } catch (error) {
        console.error("Error fetching current challenge: ", error);
      }
    };

    const fetchChallenges = async (challengeTitle: string) => {
      try {
        const challengesData =
          await firestoreCtrl.getPostsByChallengeTitle(challengeTitle);
        const filteredChallenges = challengesData.filter(
          (challenge) =>
            challenge.location !== undefined && challenge.location !== null,
        );
        setChallengesWithLocation(filteredChallenges);
      } catch (error) {
        console.error("Error fetching challenges: ", error);
      }
    };

    fetchCurrentChallenge().then((challengeTitle) => {
      console.log("Current challenge fetched : ", challengeTitle);
      fetchChallenges(challengeTitle);
    });
  }, [firestoreCtrl]);

  /**
   * Fetches challenges with valid locations from Firestore.
   */
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesData = await firestoreCtrl.getPostsByChallengeTitle(
          titleChallenge.title,
        );
        const filteredChallenges = challengesData.filter(
          (challenge) =>
            challenge.location !== undefined && challenge.location !== null,
        );
        setChallengesWithLocation(filteredChallenges);
      } catch (error) {
        console.error("Error fetching challenges: ", error);
      }
    };

    fetchChallenges();
  }, [firestoreCtrl]);

  return {
    permission,
    userLocation,
    challengesWithLocation,
  };
}
