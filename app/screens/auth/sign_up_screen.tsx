import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { isValidEmail, signUpWithEmail } from "@/types/Auth";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const { width, height } = Dimensions.get("window");

export default function SignUp() {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const router = useRouter();
  const firestoreCtrl = new FirestoreCtrl();

  return (
    <View className="flex-1">
      <Image
        source={require("@/assets/images/auth/SignUpScreen/Ellipse 3.png")}
        style={styles.backgroundImage}
        testID="ellipse"
      />

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View className="flex-1 w-full items-center justify-start bg-transparent">
          <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Text className="text-5xl font-bold text-right text-black mt-12 mb-6">
            Tell us about you!
          </Text>

          <View className="w-5/6 flex-col items-center space-y-3">
            <Text className="w-full text-lg text-left mb-1">Name *</Text>
            <TextInput
              className="w-full h-12 border border-gray-300 rounded-xl px-5 mb-2"
              placeholder="Name"
              placeholderTextColor="#888"
              onChangeText={(text) => setName(text)}
              autoComplete="name"
            />

            <Text className="w-full text-lg text-left mb-1">Surname *</Text>
            <TextInput
              className="w-full h-12 border border-gray-300 rounded-xl px-5 mb-2"
              placeholder="Surname"
              placeholderTextColor="#888"
              onChangeText={(text) => setSurname(text)}
              autoComplete="family-name"
            />

            <Text className="w-full text-lg text-left mb-1">Email *</Text>
            <TextInput
              className={`w-full h-12 border rounded-xl px-5 mb-2 ${
                isValidEmail(email) || email.length == 0
                  ? "border-gray-300"
                  : "border-red-500"
              }`}
              placeholder="example@your.domain"
              placeholderTextColor="#888"
              autoComplete="email"
              inputMode="email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              maxLength={50}
            />

            <Text className="w-full text-lg text-left mb-1">Password *</Text>
            <TextInput
              className={`w-full h-12 border rounded-xl px-5 mb-2 ${
                password.length >= 8 || password.length == 0
                  ? "border-gray-300"
                  : "border-red-500"
              }`}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <Text className="w-full text-lg text-left mb-1">
              Confirm Password *
            </Text>
            <TextInput
              className={`w-full h-12 border rounded-xl px-5 mb-2 ${
                confirmPassword.length == 0 || password == confirmPassword
                  ? "border-gray-300"
                  : "border-red-500"
              }`}
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
            />

            <TouchableOpacity
              className="w-full h-12 bg-[#E6BC95] rounded-xl justify-center items-center mb-4"
              testID="striveButton"
              onPress={() =>
                signUpWithEmail(
                  `${name} ${surname}`,
                  email,
                  password,
                  firestoreCtrl,
                  router,
                )
              }
            >
              <Text className="text-base font-semibold">Strive with us</Text>
            </TouchableOpacity>

            <Text className="text-center text-sm my-2">OR</Text>

            <TouchableOpacity
              className="w-full h-12 bg-[#F5F5F5] rounded-xl justify-center items-center mb-4"
              testID="GoogleSign"
              onPress={() => {
                Alert.alert("Sign In with Google");
                router.navigate("../home/home_screen");
              }}
            >
              <View className="flex-row items-center">
                <Image
                  source={require("@/assets/images/auth/SignUpScreen/google.png")}
                  style={styles.icon}
                />
                <Text className="text-base font-semibold">
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
