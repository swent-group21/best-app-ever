import React from "react";
import { ThemedView } from "../theme/ThemedView";
import { ThemedText } from "../theme/ThemedText";
import Timer from "./timer";

import { Dimensions } from "react-native";
import { Colors } from "../../constants/Colors";
import { DBChallengeDescription } from "@/firebase/FirestoreCtrl";

const { width, height } = Dimensions.get("window");

interface ChallengeDescriptionProps {
    dBChallengeDescription: DBChallengeDescription;
    onTimerFinished: () => void;
}

export function ChallengeDescription({dBChallengeDescription, onTimerFinished}: ChallengeDescriptionProps) {

    return (
        <ThemedView style={styles.challenge}>
            <ThemedText style={{fontSize: 20, fontWeight: 'bold'}}>{dBChallengeDescription.title}</ThemedText>
            <ThemedText style={{fontSize: 15}}>{dBChallengeDescription.description}</ThemedText>
            <Timer endDate={dBChallengeDescription.endDate} onTimerFinished={onTimerFinished}/>
        </ThemedView>
    );
    }

const styles = {
    challenge: {
        width: width - 20,
        height: 0.2 * height,
        borderRadius: 15,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };