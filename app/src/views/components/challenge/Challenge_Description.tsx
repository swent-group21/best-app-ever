import React from "react";
import { ThemedView } from "@/src/views/components/theme/themed_view";
import { ThemedText } from "@/src/views/components/theme/themed_text";
import Timer from "@/src/views/components/challenge/timer";
import { ViewStyle, Dimensions } from "react-native";
import { DBChallengeDescription } from "@/src/models/firebase/TypeFirestoreCtrl";

const { width, height } = Dimensions.get("window");

/**
 * The ChallengeDescription component displays the current challenge description.
 * @param dBChallengeDescription : the current challenge description
 * @param onTimerFinished : function to call when the timer finishes
 * @param testID : testID for the component
 * @returns : a component for the challenge description
 */
export function ChallengeDescription({
  dBChallengeDescription,
  onTimerFinished,
  testID,
}: {
  readonly dBChallengeDescription: DBChallengeDescription;
  readonly onTimerFinished: () => void;
  readonly testID?: string;
}) {
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
