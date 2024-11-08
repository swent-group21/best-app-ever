import {
  Image,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import {
  logInWithEmail
} from "@/types/Auth";
import { useRouter } from "expo-router";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { ThemedText } from "@/components/theme/ThemedText";

export default function SignInScreen() {
  const router = useRouter();
  const firestoreCtrl = new FirestoreCtrl();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const uri = "@/assets/images/auth/SignInScreen/";
  return (
    <ThemedView style={styles.signInScreen}>
      <Image source={require(`${uri}bg.png`)} style={[styles.backgroundImage]} />

      <ThemedText style={styles.titleText}>We've missed you</ThemedText>

      <ThemedView style={styles.colContainer}>
        <ThemedTextInput style={styles.input}
          type="email"
          onChangeText={(text) => setEmail(text)}
          viewWidth={"100%"}
          title="Email"
        />

        <ThemedTextInput style={styles.input}
          type="password"
          onChangeText={(text) => setPassword(text)}
          viewWidth={"100%"}
          title="Password"
        />

        <ThemedTextButton style={styles.buttonSignIn}
          onPress={() => { logInWithEmail(email, password, firestoreCtrl, router) }}
          text="Sign In"
        />

        <ThemedTextButton 
          onPress={() => router.push("/screens/auth/forgot_password_screen")}
          text="Forgot Password?"
        />

        <ThemedTextButton style={styles.buttonContinueWith}
          onPress={() => { alert("Sign In with Google"); router.navigate("/screens/home/home_screen"); }}
          text="Continue with Google"
          textStyle={{ color: "#000" }}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  signInScreen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  colContainer: {
    flex: 2,
    width: "90%",
    backgroundColor: "transparent",
    gap: 20,
  },

  backgroundImage: {
    width: "100%",
    height: "35%",
    position: "absolute",
  },

  titleText: {
    flex: 1,
    fontSize: 51,
    fontWeight: "800",
    textAlign: "right",
    textAlignVertical: "center",
  },
  
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ccc",
    padding: 8,
  },

  buttonSignIn: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#E6BC95",
    alignItems: "center",
    padding: 8,
  },

  buttonContinueWith: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    marginTop: 35,
    padding: 8,
  },
});
