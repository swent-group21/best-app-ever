import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Switch } from "react-native";
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

const { width, height } = Dimensions.get("window");

const CreateChallengeScreen = ({ navigation, route, firestoreCtrl }: any) => {
  const [challenge_name, setChallengeName] = useState("");
  const [description, setDescription] = useState("");

  const image_id = route.params?.image_id;

  const [location, setLocation] = useState<LocationObject | null>(null);

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        //console.log("Permission to access location was denied");
        setIsEnabled(false);
        return;
      }

      let location = await getCurrentPositionAsync();

      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  async function makeChallenge() {
    try {
      let date: Date = new Date();

      await createChallenge(
        firestoreCtrl,
        challenge_name,
        description,
        isEnabled ? location : null,
        date,
        image_id,
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
      >
        <ThemedTextInput
          style={styles.input}
          placeholder="Challenge Name"
          onChangeText={(text) => setChallengeName(text)}
          viewWidth={"90%"}
          title="Challenge Name"
          testID="Challenge-Name-Input"
        />

        <ThemedTextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          viewWidth={"90%"}
          title="Description"
          testID="Description-Input"
        />

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
  },

  containerRow: {
    width: "90%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    padding: 15,
  },

  title: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
    textAlign: "left",
    textAlignVertical: "center",
  },
  input: {
    alignSelf: "center",
    width: "100%",
    borderWidth: 2,
    borderRadius: 15,
    padding: 16,
  },

  switch: {
    alignSelf: "flex-start",
    width: "15%",
    borderWidth: 2,
    borderRadius: 15,
  },

  switchText: {
    width: "90%",
    padding: 15,
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
    width: "100%",
    height: "100%",
  },
});

export default CreateChallengeScreen;
