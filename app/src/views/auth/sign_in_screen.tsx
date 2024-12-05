import React from "react";
import {
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { ThemedText } from "@/components/theme/ThemedText";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";
import SignInViewModel from "@/src/viewmodels/auth/SignInViewModel";

// Dimensions de l'écran
const { width, height } = Dimensions.get("window");

export default function SignInScreen({
  navigation,
  firestoreCtrl,
  setUser,
}: {
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>;
}) {
  const {
    email,
    password,
    errorMessage,
    handleEmailChange,
    handlePasswordChange,
    handleSignIn,
  } = SignInViewModel(firestoreCtrl, navigation, setUser);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.signInScreen}>
          {/* Forme de fond */}
          <ThemedView
            style={styles.ovalShapeTwo}
            colorType="backgroundSecondary"
          />

          {/* Contenu principal */}
          <ThemedText
            style={styles.titleText}
            colorType="textPrimary"
            type="title"
          >
            We've missed you
          </ThemedText>

          <ThemedView style={styles.colContainer}>
            {/* Champ Email */}
            <ThemedTextInput
              style={styles.input}
              type="email"
              testID="email-input"
              onChangeText={handleEmailChange}
              value={email}
              viewWidth={"90%"}
              title="Email"
            />

            {/* Champ Mot de passe */}
            <ThemedTextInput
              style={styles.input}
              type="password"
              testID="password-input"
              onChangeText={handlePasswordChange}
              value={password}
              viewWidth={"90%"}
              title="Password"
            />

            {/* Message d'erreur */}
            {errorMessage && (
              <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
            )}

            {/* Bouton Connexion */}
            <ThemedTextButton
              style={styles.buttonSignIn}
              onPress={handleSignIn}
              text="Sign In"
              testID="sign-in-button"
              textStyle={{ fontWeight: "600" }}
              textColorType="textOverLight"
            />

            {/* Mot de passe oublié */}
            <ThemedTextButton
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("ForgotPassword")}
              text="Forgot Password?"
              colorType="transparent"
              textColorType="textPrimary"
            />
          </ThemedView>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  signInScreen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  ovalShapeTwo: {
    position: "absolute",
    top: "-40%",
    left: "30%",
    width: "130%",
    height: "70%",
    borderRadius: width * 0.7,
  },

  colContainer: {
    flex: 2,
    width: "90%",
    backgroundColor: "transparent",
    alignItems: "center",
    gap: height * 0.027,
  },

  titleText: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
    textAlign: "right",
    textAlignVertical: "center",
  },

  input: {
    alignSelf: "center",
    width: "100%",
    borderWidth: 2,
    borderRadius: 15,
    padding: 8,
  },

  buttonSignIn: {
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    borderRadius: 15,
    padding: 8,
  },

  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
});
