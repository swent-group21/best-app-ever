import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { logInWithEmail } from "@/types/Auth";
import { useRouter } from "expo-router";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

const { width, height } = Dimensions.get("window");

export default function SignInScreen() {
  const router = useRouter();
  const firestoreCtrl = new FirestoreCtrl();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 items-center justify-start bg-white">
      {/* Background Image */}
      <Image
        source={require("@/assets/images/auth/SignInScreen/bg.png")}
        style={styles.backgroundImage}
      />

      {/* Title */}
      <Text className="text-5xl font-extrabold text-black text-right pt-12 pb-5">
        We've missed you
      </Text>

      <View className="w-10/12 h-3/5 flex-col items-center justify-center space-y-4">
        {/* Text Inputs */}
        <Text className="text-lg text-black w-full text-left">Email</Text>
        <TextInput
          className="w-full h-14 border border-gray-300 rounded-xl pl-5 mb-2"
          placeholder="example@your.domain"
          placeholderTextColor="#888"
          autoComplete="email"
          inputMode="email"
          keyboardType="email-address"
          autoCapitalize="none"
          testID="emailInput"
          onChangeText={(text) => setEmail(text)}
        />

        <Text className="text-lg text-black w-full text-left">Password</Text>
        <TextInput
          className="w-full h-14 border border-gray-300 rounded-xl pl-5 mb-2"
          placeholder="**********"
          placeholderTextColor="#888"
          secureTextEntry={true}
          autoComplete="password"
          testID="passwordInput"
          onChangeText={(text) => setPassword(text)}
        />

        {/* SignIn Button */}
        <TouchableOpacity
          className="w-full h-12 bg-[#E6BC95] rounded-xl justify-center items-center"
          onPress={() => {
            logInWithEmail(email, password, firestoreCtrl, router);
          }}
          testID="signInButton"
        >
          <Text className="text-lg text-black">Sign In</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity
          className="self-start"
          onPress={() => router.push("/screens/auth/forgot_password_screen")}
          testID="forgotPasswordButton"
        >
          <Text className="underline mb-5">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Continue with Google */}
        <TouchableOpacity
          className="w-full h-12 bg-gray-100 rounded-xl justify-center items-center mb-2"
          onPress={() => {
            alert("Sign In with Google");
            router.navigate("/screens/home/home_screen");
          }}
          testID="continueWithGoogleButton"
        >
          <View className="flex-row items-center">
            <Image
              source={require("@/assets/images/auth/SignInScreen/google.png")}
              style={styles.icon}
            />
            <Text className="text-lg text-black">Continue with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: height * 0.35,
    position: "absolute",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
