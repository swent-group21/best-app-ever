import { useState, useEffect } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";
import { GeoPoint, Timestamp } from "firebase/firestore";
import { createGroup } from "../../models/types/GroupBuilder";

export default function CreateChallengeViewModel({
  firestoreCtrl,
  navigation,
  route,
}: {
  firestoreCtrl: any;
  navigation: any;
  route: any;
}) {
  const [groupName, setGroupName] = useState("");
  const [challengeTitle, setChallengeTitle] = useState("");

  const user = route.params.user;

  // Create the challenge
  const makeGroup = async () => {
    try {
      const creationDate = Timestamp.now();
      const members = [user.uid];

      await createGroup(
        firestoreCtrl,
        groupName,
        challengeTitle,
        members,
        creationDate,
      );

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
  };
}
