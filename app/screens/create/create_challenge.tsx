import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Switch, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { createChallenge } from "@/types/ChallengeBuilder";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { BottomBar } from "@/components/navigation/BottomBar";
import { ThemedView } from "@/components/theme/ThemedView";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";

import { GeoPoint, Timestamp } from "firebase/firestore";
import { DBChallengeDescription } from "@/firebase/FirestoreCtrl";

const { width, height } = Dimensions.get("window");

const CreateChallengeScreen = ({ navigation, route, firestoreCtrl }: any) => {
  const [caption, setCaption] = useState("");

  //console.log("image_id: ", image_id);

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [descriptionTitle, setDescriptionTitle] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });;

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const [postImage, setPostImage] = useState<string>("");

  

  async function getImage(image_id: string) {
    try {
      const url = await firestoreCtrl.getImageUrl(image_id);
      setPostImage(url);
    } catch (error) {
      console.log("Error fetching image");
      throw error;
    }
  }
  getImage(route.params?.image_id);



  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        setIsEnabled(false);
        return;
      }

      let location = await getCurrentPositionAsync();

      setLocation(location);
    }

    getCurrentLocation();
  }, []);


  useEffect(() => {
    async function fetchDescriptionTitle() {
      try {
        const currentChallengeData =
          await firestoreCtrl.getChallengeDescription();

        const formattedChallenge = {
          title: currentChallengeData.Title,
          description: currentChallengeData.Description,
          endDate: new Date(currentChallengeData.Date.seconds * 1000), // Conversion Timestamp -> Date
        };

        setDescriptionTitle(formattedChallenge);
        console.log("Description title: ", formattedChallenge.title);
      } catch (error) {
        console.log("Error fetching description id");
        return error;
      }
    }

    fetchDescriptionTitle();
  }, []);
  

  async function makeChallenge() {
    try {
      let date: Timestamp = Timestamp.now();
      console.log("Date: ", date);

      //const postImage = await getImage(route.params?.image_id);

      await createChallenge(
        firestoreCtrl,
        caption,
        isEnabled ? location : null,
        descriptionTitle.title ?? "",
        date,
        postImage,

      );
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.log("Unable to create challenge");
      return error;
    }
  }

  return (
    <ThemedView style={styles.createChallengeScreen}>
      <ThemedText
        style={styles.title}
        colorType="textPrimary"
        type="title"
        testID="Create-Challenge-Text"
      >
        Create a New Challenge
      </ThemedText>

      <ThemedScrollView
        style={styles.containerCol}
        automaticallyAdjustKeyboardInsets={true}
        colorType="transparent"
        //contentContainerStyle={styles.contentContainer}
      >
        <ThemedView 
            style={styles.imageContainer}
            colorType="transparent"
            testID="challenge-image"
          >
            <Image
              source={
                postImage
                  ? { uri: postImage }
                  : require("@/assets/images/no-image.svg")
              }
              style={styles.image}
            />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedTextInput
            style={styles.input}
            placeholder="Caption"
            onChangeText={(text) => setCaption(text)}
            viewWidth={"90%"}
            title="Caption"
            testID="Caption-Input"
          />
        </ThemedView>

        <ThemedView style={styles.containerRow}>
          <Switch
            style={styles.switch}
            trackColor={{
              false: Colors.dark.icon,
              true: Colors.light.tabIconDefault,
            }}
            thumbColor={isEnabled ? Colors.light.tint : Colors.dark.white}
            ios_backgroundColor={Colors.light.tint}
            onValueChange={() => {
              toggleSwitch();
            }}
            value={isEnabled}
            testID="switch-button"
          />

          <ThemedText
            colorType="textPrimary"
            style={styles.switchText}
            testID="Location-validation"
          >
            Enable location ?
          </ThemedText>
        </ThemedView>

        <BottomBar
          rightIcon="arrow-forward"
          rightAction={makeChallenge}
          testID="bottom-bar"
        />
      </ThemedScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  createChallengeScreen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",

  },

  containerCol: {
    flex: 3,
    width: "90%",
    backgroundColor: "transparent",
    gap: height * 0.027,
    paddingTop: 27,

  },

  containerRow: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 25,
  },

  title: {
    flex: 0.45,
    width: "85%",
    alignSelf: "center",
    textAlign: "left",
    textAlignVertical: "bottom",
  },

  input: {
    alignSelf: "center",
    width: "100%",
    borderWidth: 2,
    borderRadius: 15,
    padding: 16,
  },

  inputContainer: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    paddingTop: 13,
  },

  switch: {
    alignSelf: "flex-start",
    width: "10%",
    borderWidth: 2,
    borderRadius: 15,
  },

  switchText: {
    width: "90%",
    paddingLeft: 15,
    alignSelf: "center",
  },

  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  imagePickerText: {
    color: "#888",
  },
  image: {
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: 15,
  },

  imageContainer: {
    height: height * 0.4,
    width: width * 0.9,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "white",
    backgroundColor : "transparent",
  },

});

export default CreateChallengeScreen;
