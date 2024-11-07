import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function ForgotPasswordScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-start items-center bg-white">
      {/* Background Image */}
      <Image
        source={require("@/assets/images/auth/ForgotPasswordScreen/bg.png")}
        style={styles.backgroundImage}
      />

      {/* Title */}
      <Text className="text-5xl font-bold text-black pt-24 text-justify">
        Forgot your Password ?
      </Text>

      {/* Column Container */}
      <View className="w-5/6 h-2/5 flex flex-col justify-center items-center space-y-2.5">
        {/* Input */}
        <Text className="w-full text-lg text-black text-left mb-2">Email</Text>
        <TextInput
          className="w-full h-12 border border-gray-300 rounded-xl px-5 mb-5"
          placeholder="example@your.domain"
          placeholderTextColor="#888"
          autoComplete="email"
          inputMode="email"
          keyboardType="email-address"
          autoCapitalize="none"
          testID="emailInput"
        />

        {/* Row Container */}
        <View className="w-3/4 flex-row justify-between items-center">
          {/* Back to SignIn */}
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => router.back()}
            testID="cancelButton"
          >
            <Text>Cancel</Text>
          </TouchableOpacity>

          {/* Reset Password */}
          <TouchableOpacity
            style={styles.buttonSendEmail}
            onPress={() => alert("Send Email")}
            testID="resetPasswordButton"
          >
            <Text className="text-white">Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: width * 0.9,
    height: height * 0.39,
    position: "absolute",
    bottom: -30,
    right: 0,
  },
  buttonSendEmail: {
    width: "60%",
    height: height * 0.05,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCancel: {
    width: "35%",
    height: height * 0.05,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
