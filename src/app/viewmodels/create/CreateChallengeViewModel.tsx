import { useState, useEffect } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";
import { GeoPoint, Timestamp } from "firebase/firestore";
import { createChallenge } from "../../models/types/ChallengeBuilder";

export default function CreateChallengeViewModel({
  firestoreCtrl,
  navigation,
  route,
}: {
  firestoreCtrl: any;
  navigation: any;
  route: any;
}) {
  const [challengeName, setChallengeName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  const imageId = route.params?.image_id;
  const group_id = route.params?.group_id;

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
      const date = Timestamp.now();
      await createChallenge(
        firestoreCtrl,
        challengeName,
        description,
        isLocationEnabled ? location : null,
        group_id,
        date,
        imageId,
      );
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
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
