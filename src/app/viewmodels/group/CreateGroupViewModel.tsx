import { useState, useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import { GeoPoint, Timestamp } from "firebase/firestore";
import { createGroup } from "../../models/types/GroupBuilder";
import FirestoreCtrl, {
  DBUser,
} from "../../../app/models/firebase/FirestoreCtrl";

export default function CreateChallengeViewModel({
  user,
  navigation,
  firestoreCtrl,
}: {
  user: DBUser;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  const [groupName, setGroupName] = useState("");
  const [challengeTitle, setChallengeTitle] = useState("");

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
  };
}
