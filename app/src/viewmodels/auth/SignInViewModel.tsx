import { useState } from "react";
import FirestoreCtrl, { DBUser } from "../../models/firebase/FirestoreCtrl";
import { logInWithEmail } from "../../../types/Auth";

export default function SignInViewModel(
  firestoreCtrl: FirestoreCtrl,
  navigation: any,
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>,
) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  
  const handleEmailChange = (text: string) => setEmail(text);

  const handlePasswordChange = (text: string) => setPassword(text);

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        setErrorMessage("Email and Password are required.");
        return;
      }

      await logInWithEmail(email, password, firestoreCtrl, navigation, setUser);
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("Failed to sign in. Please try again.");
    }
  };

  return {
    email,
    password,
    errorMessage,
    handleEmailChange,
    handlePasswordChange,
    handleSignIn,
  };
}
