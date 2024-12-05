import React from "react";
import { ThemedView } from "../theme/ThemedView";
import { ThemedText } from "../theme/ThemedText";
import Timer from "./timer";
import { View, ViewStyle } from "react-native";

import { Dimensions } from "react-native";
import { Colors } from "../../constants/Colors";
import { DBChallengeDescription } from "../../src/models/firebase/FirestoreCtrl";

const { width, height } = Dimensions.get("window");

// Define the ChallengeDescriptionProps type
interface ChallengeDescriptionProps {
  dBChallengeDescription: DBChallengeDescription;
  onTimerFinished: () => void;
  testID?: string;
}

/**
 * The ChallengeDescription component displays the current challenge description.
 */
export function ChallengeDescription({
  dBChallengeDescription,
  onTimerFinished,
  testID,
}: ChallengeDescriptionProps) {
  return (
    <ThemedView style={styles.challenge} testID={testID}>
      <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
        {dBChallengeDescription.title}
      </ThemedText>
      <ThemedText style={{ fontSize: 15 }}>
        {dBChallengeDescription.description}
      </ThemedText>
      <Timer
        endDate={dBChallengeDescription.endDate}
        onTimerFinished={onTimerFinished}
      />
    </ThemedView>
  );
}

const styles = {
  challenge: {
    width: width - 20,
    height: 0.2 * height,
    borderRadius: 15,
    backgroundColor: "transparent",
    justifyContent: "center" as ViewStyle["justifyContent"],
    alignItems: "center" as ViewStyle["alignItems"],
  },
};
