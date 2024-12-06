import { useState, useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
<<<<<<< HEAD:src/app/viewmodels/create/CreateChallengeViewModel.tsx
import { GeoPoint, Timestamp } from "firebase/firestore";
import { createChallenge } from "../../models/types/ChallengeBuilder";
import FirestoreCtrl, { DBGroup } from "../../models/firebase/FirestoreCtrl";
=======
import { createChallenge } from "@/types/ChallengeBuilder";
>>>>>>> master:app/src/viewmodels/create/CreateChallengeViewModel.tsx

/**
 * View model for the create challenge screen.
 * @param firestoreCtrl : FirestoreCtrl object
 * @param navigation : navigation object
 * @param route : route object
 * @returns : challengeName, setChallengeName, description, setDescription, location, isLocationEnabled, toggleLocation, and makeChallenge
 */
export default function CreateChallengeViewModel({
  firestoreCtrl,
  navigation,
  route,
}: {
  firestoreCtrl: FirestoreCtrl;
  navigation: any;
  route: any;
}) {
  const [challengeName, setChallengeName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  const imageId = route.params?.image_id;
  const group_id = route.params?.group_id;
  console.log("group_id in create :", group_id);

  // Toggle location switch
  const toggleLocation = () => setIsLocationEnabled((prev) => !prev);

  // Fetch the current location
  useEffect(() => {
    async function fetchLocation() {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location denied");
        setIsLocationEnabled(false);
        return;
      }
      let currentLocation = await getCurrentPositionAsync();
      setLocation(currentLocation);
    }
    fetchLocation();
  }, []);

  // Create the challenge
  const makeChallenge = async () => {
    try {
      const date = new Date();
      await createChallenge(
        firestoreCtrl,
        challengeName,
        description,
        isLocationEnabled ? location : null,
        group_id,
        date,
        imageId,
      );
      if (group_id == "" || group_id == "home") {
        navigation.navigate("Home");
      } else {
        const group: DBGroup = await firestoreCtrl.getGroup(group_id);
        console.log("group in create challenge: ", group);
        navigation.navigate("GroupScreen", { currentGroup: group });
      }
    } catch (error) {
      console.error("Unable to create challenge", error);
      return error;
    }
  };

  return {
    challengeName,
    setChallengeName,
    description,
    setDescription,
    location,
    isLocationEnabled,
    toggleLocation,
    makeChallenge,
  };
}
