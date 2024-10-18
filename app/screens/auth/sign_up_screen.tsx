import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  signUpWithEmail,
  logInWithGoogle,
  isValidEmail,
} from "@/types/Auth";
import firestoreCtrl from "@/firebase/FirestoreCtrl";
import { GoogleAuthProvider, signInWithCredential, auth } from "@/firebase/Firebase";
import * as Google from 'expo-auth-session/providers/google';

const { width, height } = Dimensions.get("window");

export default function SignUp() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '<YOUR_CLIENT_ID>',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      logInWithGoogle(credential, router, firestoreCtrl);
    }
  }, [response]);

  const handleSignUp = () => {
    if (name.length === 0) {
      Alert.alert("Name cannot be empty");
    } else if (surname.length === 0) {
      Alert.alert("Surname cannot be empty");
    } else if (email.length === 0) {
      Alert.alert("Email cannot be empty");
    } else if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
    } else if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters long");
    } else {
      signUpWithEmail(
        `${name} ${surname}`,
        email,
        password,
        firestoreCtrl,
        router,
        setError
      );
    }
  };

  const handleGoogleSignIn = async () => {
    promptAsync();
  };

  return (
    <View>
      <Image
        source={require("@/assets/images/auth/SignUpScreen/Ellipse 3.png")}
        style={styles.backroundimage}
        testID="ellipse"
      />

      <ScrollView>
        <View style={styles.backround}>
          <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Tell us about you!</Text>

          <View style={styles.inputColumn}>
            <Text style={styles.titleinput}>Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              onChangeText={setName}
            />

            <Text style={styles.titleinput}>Surname *</Text>
            <TextInput
              style={styles.input}
              placeholder="Surname"
              placeholderTextColor="#888"
              onChangeText={setSurname}
            />

            <Text style={styles.titleinput}>Email *</Text>
            <TextInput
              style={
                isValidEmail(email) || email.length === 0
                  ? styles.input
                  : styles.inputWrong
              }
              placeholder="example@your.domain"
              placeholderTextColor="#888"
              onChangeText={setEmail}
            />

            <Text style={styles.titleinput}>Password *</Text>
            <TextInput
              style={
                password.length >= 8 || password.length === 0
                  ? styles.input
                  : styles.inputWrong
              }
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={setPassword}
            />

            <Text style={styles.titleinput}>Confirm Password *</Text>
            <TextInput
              style={
                confirmPassword.length === 0 || password === confirmPassword
                  ? styles.input
                  : styles.inputWrong
              }
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.buttonStrive}
              testID="striveButton"
              onPress={handleSignUp}
            >
              <Text style={styles.buttonText}>Strive with us</Text>
            </TouchableOpacity>

            <Text style={styles.or}>OR</Text>

            <TouchableOpacity
              style={styles.buttonContinueWith}
              testID="GoogleSign"
              onPress={handleGoogleSignIn}
              disabled={!request}
            >
              <View style={styles.buttonIcon}>
                <Image
                  source={require("@/assets/images/auth/SignUpScreen/google.png")}
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContinueWith}
              testID="FacebookSign"
              onPress={() => {
                Alert.alert("Sign In with Facebook");
                router.navigate("/screens/home/PLACEHOLDER_home_screen");
              }}
            >
              <View style={styles.buttonIcon}>
                <Image
                  source={require("@/assets/images/auth/SignUpScreen/facebook.png")}
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Continue with Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * Styles for the components
 */
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: height * 0.06,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ccc",
    paddingLeft: 20,
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.14,
    color: "black",
    fontWeight: "bold",
    textAlign: "right",
    paddingTop: height * 0.12,
    paddingBottom: height * 0.05,
  },
  buttonStrive: {
    width: "100%",
    height: height * 0.05,
    backgroundColor: "#E6BC95",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  or: {
    position: "relative",
    textAlign: "center",
    height: height * 0.04,
    fontSize: width * 0.03,
    textAlignVertical: "center",
    color: "black",
    paddingTop: height * 0.02,
  },

  backround: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  titleinput: {
    fontSize: width * 0.04,
    color: "black",
    width: "100%",
    textAlign: "left",
    marginBottom: height * 0.01,
  },

  backroundimage: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  buttonText: {
    fontSize: width * 0.045,
    color: "black",
  },

  inputColumn: {
    width: "83%",
    height: "60%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: height * 0.001,
  },

  buttonContinueWith: {
    width: "100%",
    height: height * 0.05,
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02,
  },

  buttonIcon: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  inputWrong: {
    width: "100%",
    height: height * 0.06,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "red",
    paddingLeft: 20,
    marginBottom: height * 0.02,
  },

  goBack: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: "black",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
});
