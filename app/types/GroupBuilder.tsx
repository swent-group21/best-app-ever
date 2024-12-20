import { getUser } from "@/src/models/firebase/GetFirestoreCtrl";
import {
  addGroupToUser,
  newGroup,
} from "@/src/models/firebase/SetFirestoreCtrl";
import { DBGroup, DBUser } from "@/src/models/firebase/TypeFirestoreCtrl";
import { GeoPoint } from "firebase/firestore";

/**
 * Used to create a Group and store it in Firestore DB
 * @param name : the name of the group
 * @param challengeTitle : the title of the challenge
 * @param members : the members of the group
 * @param updateDate : the update date of the group
 */
export const createGroup = async (
  name: string,
  challengeTitle: string,
  members: string[],
  updateDate: Date,
  location: GeoPoint,
  radius: number,
): Promise<void> => {
  try {
    // Prepare the challenge data for Firestore
    const user: DBUser = await getUser();
    console.log("createGroup uid", user.uid);

    const groupData: DBGroup = {
      name: name,
      challengeTitle: challengeTitle,
      members: members,
      updateDate: updateDate,
      location: location,
      radius: radius,
    };

    // Save the group to Firestore
    await newGroup(groupData);
    await addGroupToUser(user.uid, groupData.name);
  } catch (error) {
    console.error("Error creating group: ", error);
  }
};
