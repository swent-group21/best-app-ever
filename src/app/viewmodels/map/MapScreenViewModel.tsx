import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import FirestoreCtrl, {
  DBChallenge,
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

export function useMapScreenViewModel(firestoreCtrl: FirestoreCtrl) {
  const [permission, setPermission] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<LocationObject | undefined>(
    undefined,
  );
  const [challengesWithLocation, setChallengesWithLocation] = useState<
    DBChallenge[]
  >([]);

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

  /**
   * Fetches challenges with valid locations from Firestore.
   */
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesData = await firestoreCtrl.getKChallenges(100);
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
