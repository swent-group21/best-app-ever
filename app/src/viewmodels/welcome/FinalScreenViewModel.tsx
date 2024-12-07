import { signInAsGuest } from "@/types/Auth";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";

/**
 * ViewModel for the WelcomeFinal screen
 * @param firestoreCtrl : FirestoreCtrl object
 * @param navigation : navigation object
 * @param setUser : set user object
 * @returns : functions for the WelcomeFinal screen
 */
export default function WelcomeFinalViewModel({
  firestoreCtrl,
  navigation,
  setUser,
}: {
  firestoreCtrl: FirestoreCtrl;
  navigation: any;
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>;
}) {
  const navigateToSignIn = () => navigation.navigate("SignIn");

  const navigateToSignUp = () => navigation.navigate("SignUp");

  const continueAsGuest = async () => {
    try {
      await signInAsGuest(firestoreCtrl, navigation, setUser);
    } catch (error) {
      console.error("Error signing in as guest: ", error);
      alert("Failed to continue as guest.");
    }
  };

  return {
    navigateToSignIn,
    navigateToSignUp,
    continueAsGuest,
  };
}
