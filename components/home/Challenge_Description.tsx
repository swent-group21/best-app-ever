import React from "react";
import { ThemedView } from "../theme/ThemedView";
import { ThemedText } from "../theme/ThemedText";
import Timer from "./timer";

import { Dimensions } from "react-native";
import { Colors } from "../../constants/Colors";

const { width, height } = Dimensions.get("window");


export function ChallengeDescription({firestoreCtrl, navigation, title, description, startDate, onTimerFinished} : any) {
    
    return (
        <ThemedView style={styles.challenge}>
            <ThemedText style={{fontSize: 20, fontWeight: 'bold'}}>{title}</ThemedText>
            <ThemedText style={{fontSize: 15}}>{description}</ThemedText>
            <Timer startDate={startDate} onTimerFinished={onTimerFinished}/>
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