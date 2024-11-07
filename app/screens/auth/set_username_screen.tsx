import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function SetUsername() {
  const [username, setUsername] = React.useState("");
  const router = useRouter();
  return (
    <View className="flex-1 bg-white items-center justify-start">
      {/* Background Ellipse Image */}
      <Image
        source={require("@/assets/images/auth/SignUpScreen/Ellipse 3.png")}
        style={styles.ellipse}
      />

      <View className="w-11/12 h-3/5 items-center justify-start space-y-3">
        {/* Title of the screen */}
        <Text className="text-5xl font-bold text-black text-right pt-12 pb-5">
          Set up your username
        </Text>

        {/* Go back button */}
        <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Username Input */}
        <TextInput
          className="w-full h-14 border border-gray-300 rounded-xl pl-5"
          placeholder="how will your friends find you ?"
          placeholderTextColor="#888"
          onChangeText={(text) => setUsername(text)}
          autoCorrect={false}
        />
      </View>

      {/* Go further button */}
      <TouchableOpacity
        style={styles.goFurther}
        onPress={() => router.push("/screens/auth/profile_picture_screen")}
      >
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>

      {/* Goat Image */}
      <Image
        source={require("@/assets/images/goat.png")}
        style={styles.backroundimage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  goBack: {
    position: "absolute",
    top: height * 0.07,
    left: width * 0.01,
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: "black",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  goFurther: {
    position: "absolute",
    top: height * 0.8,
    left: width * 0.05,
    width: width * 0.9,
    height: width * 0.1,
    backgroundColor: "black",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  ellipse: {
    position: "absolute",
    top: -100,
    left: width * 0.6,
    transform: [{ rotate: "90deg" }],
  },
  backroundimage: {
    position: "absolute",
    top: height * 0.6,
    left: width * 0.6,
  },
});
