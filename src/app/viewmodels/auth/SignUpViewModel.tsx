import { useState } from "react";
import { isValidEmail, signUpWithEmail } from "../../models/types/Auth";
import FirestoreCtrl from "../../models/firebase/FirestoreCtrl";
import { Alert } from "react-native";

export default function useSignUpViewModel(
  navigation: any,
  setUser: any,
  firestoreCtrl: any,
) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isEmailValid = isValidEmail(email) || email.length === 0;
  const isPasswordValid = password.length >= 8 || password.length === 0;
  const isConfirmPasswordValid =
    confirmPassword.length === 0 || password === confirmPassword;

  const handleSignUp = async () => {
    if (
      !name ||
      !surname ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      Alert.alert("Please fill all fields correctly.");
      return;
    }

    try {
      await signUpWithEmail(
        `${name} ${surname}`,
        email,
        password,
        firestoreCtrl,
        navigation,
        setUser,
      );
    } catch (error) {
      console.error("Error during sign-up: ", error);
      alert("Failed to sign up. Please try again.");
    }
  };

  return {
    name,
    surname,
    email,
    password,
    confirmPassword,
    setName,
    setSurname,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignUp,
    isEmailValid,
    isPasswordValid,
    isConfirmPasswordValid,
  };
}
