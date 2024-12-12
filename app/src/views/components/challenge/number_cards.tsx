import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useNumberCardsViewModel } from "@/src/viewmodels/components/challenge/NumberCardsViewModel";
import { ThemedText } from "@/src/views/components/theme/themed_text";
import { ThemedView } from "@/src/views/components/theme/themed_view";

const { width, height } = Dimensions.get("window");

const CARD_DIMENSIONS = Math.min(width, height) * 0.12;

const initNumber = 0;

/**
 * The NumberCard component displays a number card.
 * @param number : the number to display
 * @param testID : testID for the component
 * @returns : a component for the number card
 */
export default function NumberCard({
  number = initNumber,
  testID,
}: {
  readonly number?: number;
  readonly testID?: string;
}) {
  
  const {renderNumber} = useNumberCardsViewModel({number});

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.number}>
        {renderNumber}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333333",
    margin: CARD_DIMENSIONS * 0.08,
    borderRadius: CARD_DIMENSIONS * 0.16,
    width: CARD_DIMENSIONS,
    height: CARD_DIMENSIONS,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1f1f1f",
    shadowOffset: { width: 0, height: CARD_DIMENSIONS * 0.04 },
    shadowRadius: CARD_DIMENSIONS * 0.08,
    shadowOpacity: 1,
    elevation: 5,
  },
  number: {
    color: "#fff",
    fontSize: CARD_DIMENSIONS * 0.4,
    fontWeight: "bold",
  },
});
