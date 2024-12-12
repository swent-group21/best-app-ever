import { useEffect, useState } from "react";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
} from "@/src/models/firebase/FirestoreCtrl";

/**
 * The Challenge viewmodel helps display a challenge.
 * @param challengeDB : the challenge object
 * @param firestoreCtrl : FirestoreCtrl object
 * @param currentUser : the current user object
 * @returns : a viewmodel component for the challenge
 */
export function useChallengeViewModel({
  challengeDB,
  firestoreCtrl,
  currentUser,
}: {
  readonly challengeDB: DBChallenge;
  readonly firestoreCtrl: FirestoreCtrl;
  readonly currentUser: DBUser;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<string[]>([]);
  const [user, setUser] = useState<DBUser>();

  const defaultUri = "@/assets/images/no-image.svg";

  // @ts-ignore - date is a Timestamp object
  let challengeDate: Date = challengeDB.date ? challengeDB.date : new Date();

  // Fetch user data
  useEffect(() => {
    if (challengeDB.uid) {
      const fetchUser = async () => {
        try {
          const userData = await firestoreCtrl.getUser(challengeDB.uid);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching challenges: ", error);
        }
      };
      fetchUser();
    }
  }, [user]);

  // Fetch likes data
  useEffect(() => {
    firestoreCtrl
      .getLikesOf(challengeDB.challenge_id ?? "")
      .then((likes: string[]) => {
        setIsLiked(likes.includes(currentUser.uid));
        setLikes(likes);
      });
  });

  return {
    isOpen,
    setIsOpen,
    isLiked,
    setIsLiked,
    likes, 
    setLikes,
    user,
    defaultUri,
    challengeDate,
  }
}