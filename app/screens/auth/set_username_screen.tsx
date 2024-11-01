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
    <View style={styles.backround}>

      {/* Image in the backround out of the scroll view for immonility */}
      <Image
        source={require("@/assets/images/auth/SignUpScreen/Ellipse 3.png")}
        style={styles.ellipse}
      />

      {/* Go back button */}
      <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.inputColumn}>
        {/* Title of the screen */}
        <Text style={styles.title}>Setup your profile</Text>

        {/* The profile picture */}
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => router.push("../camera")}
        >
          <Image
            source={require("@/assets/images/auth/SignUpScreen/Profile-PNG-File.png")}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        {/* The input field for username */}
        <TextInput
          style={styles.input}
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
        <Text style = {styles.buttonText}> Let's start </Text>
      </TouchableOpacity>

      {/* <Image
        source={require("@/assets/images/goat.png")}
        style={styles.backroundimage}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
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
  buttonText: {
    fontSize: width * 0.045,
    color: "white",
  },

  title: {
    fontSize: width * 0.15,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: height * 0.1,
    paddingBottom: height * 0.01,
    
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

  backroundimage: {
    position: "absolute",
    top: height * 0.6,
    left: width * 0.6,
  },

  ellipse: {
    position: "absolute",
    top: -100,
    left: width * 0.6,
    transform: [{ rotate: "90deg" }],
  },

  input: {
    width: "100%",
    height: height * 0.06,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ccc",
    paddingLeft: 5,
    top: height * 0.01,
  },

  inputColumn: {
    width: "90%",
    height: "80%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: height * 0.001,
    
  },

  backround: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: width * 0.5,
    height: width * 0.5,
    fontSize: 20,
    paddingLeft: width * 0.05,
    marginBottom: height * 0.1,
    paddingBottom: height * 0.02,
  },

  profilePicture: {
    width: width * 0.5,
    height: width * 0.5,
    position: "absolute",
    top: 0,
    left: width * 0.01,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

  },
});
