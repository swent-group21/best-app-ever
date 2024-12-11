import { useEffect, useState } from "react";
import { createGroup } from "@/types/GroupBuilder";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { GeoPoint } from "firebase/firestore";

export default function CreateGroupViewModel({
  user,
  navigation,
  firestoreCtrl,
}: {
  user: DBUser;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  type PermissionStatus = "REFUSED" | "AUTHORIZED" | "WAITING";
  const MIN_RADIUS = 2000;
  const MAX_RADIUS = 50000;
  const [groupName, setGroupName] = useState("");
  const [challengeTitle, setChallengeTitle] = useState("");
  const [radius, setRadius] = useState(MIN_RADIUS);
  const [location, setLocation] = useState<GeoPoint | null>(null);
  const [permission, setPermission] = useState<PermissionStatus>("WAITING");

  // Fetch the user's location
  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await getCurrentPositionAsync();
          const geoPoint = new GeoPoint(
            location.coords.latitude,
            location.coords.longitude,
          );
          setLocation(geoPoint);
          setPermission("AUTHORIZED");
        } else {
          setPermission("REFUSED");
        }
      } catch (error) {
        console.error("Error getting location permission or location:", error);
      }
    }

    getCurrentLocation();
  }, []);

  // Create the challenge
  const makeGroup = async () => {
    try {
      const creationDate = new Date();
      const members = [user.uid];

      await createGroup(
        firestoreCtrl,
        groupName,
        challengeTitle,
        members,
        creationDate,
      );

      navigation.navigate("Home");
    } catch (error) {
      console.error("Unable to create challenge", error);
      return error;
    }
  };

  return {
    groupName,
    setGroupName,
    challengeTitle,
    setChallengeTitle,
    makeGroup,
    setRadius,
    radius,
    MIN_RADIUS,
    MAX_RADIUS,
    permission,
  };
}
