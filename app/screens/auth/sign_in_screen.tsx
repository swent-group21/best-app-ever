import {
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useState } from "react";
import { logInWithEmail } from "@/types/Auth";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { ThemedText } from "@/components/theme/ThemedText";
import App from "@/navigation/Navigation"


// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function SignInScreen() {
  const router = App();
  const firestoreCtrl = new FirestoreCtrl();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.signInScreen}>
          {/* Background shape */}
          <ThemedView
            style={styles.ovalShapeTwo}
            colorType="backgroundSecondary"
          />

          {/* Screen content */}
          <ThemedText
            style={styles.titleText}
            colorType="textPrimary"
            type="title"
          >
            We've missed you
          </ThemedText>

          {/* Input fields */}
          <ThemedView style={styles.colContainer}>
            {/* Email input */}
            <ThemedTextInput
              style={styles.input}
              type="email"
              onChangeText={(text) => setEmail(text)}
              viewWidth={"90%"}
              title="Email"
            />

            {/* Password input */}
            <ThemedTextInput
              style={styles.input}
              type="password"
              onChangeText={(text) => setPassword(text)}
              viewWidth={"90%"}
              title="Password"
            />

            {/* Sign in button */}
            <ThemedTextButton
              style={styles.buttonSignIn}
              onPress={() => {
                logInWithEmail(email, password, firestoreCtrl, router);
              }}
              text="Sign In"
              textStyle={{ fontWeight: "600" }}
              textColorType="textOverLight"
            />

            {/* Forgot password button */}
            <ThemedTextButton
              style={{ alignItems: "center" }}
              onPress={() =>
                router.push("/screens/auth/forgot_password_screen")
              }
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

  backgroundImage: {
    width: "100%",
    height: "35%",
    position: "absolute",
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
});
