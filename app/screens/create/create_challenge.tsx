import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createChallenge } from "@/types/ChallengeBuilder";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { BottomBar } from "@/components/navigation/BottomBar";

const CreateChallengeScreen = ({
  navigation,
  route,
  firestoreCtrl,
}: any) => {
  const [challenge_name, setChallengeName] = useState("");
  const [description, setDescription] = useState("");

  const image_id = route.params?.image_id;

  async function makeChallenge() {
    try {
      let date = new Date();
      await createChallenge(
        firestoreCtrl,
        challenge_name,
        date,
        description,
        image_id
      );
      navigation.navigate("Home");
    } catch (error) {
      console.log("Unable to create challenge");
      return error;
    }
  }

  return (
    <ThemedScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}
    >
      <ThemedText style={styles.title} colorType="textPrimary" type="title">
        Create a New Challenge
      </ThemedText>

      <ThemedTextInput
        style={styles.input}
        placeholder="Challenge Name"
        onChangeText={setChallengeName}
        title="Challenge Name"
      />

      <ThemedTextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={setDescription}
      />

      <BottomBar rightIcon="arrow-forward" rightAction={makeChallenge} />
    </ThemedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 12,
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
