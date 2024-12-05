import { signInAsGuest } from "../../../types/Auth";
import FirestoreCtrl, { DBUser } from "../../models/firebase/FirestoreCtrl";

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
