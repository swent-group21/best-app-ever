import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const CARD_DIMENSIONS = Math.min(width, height) * 0.12;

const initialCardNumber = "00";
const initNumber = 0;
const slice = -2;

/** 
 * The NumberCard component displays a number card.
 * @param number : the number to display
 * @param testID : testID for the component
 * @returns : a component for the number card
 */
function NumberCard({
  number = initNumber,
  testID,
}: {
  number?: number;
  testID?: string;
}) {
  function numberText() {
    if (number && Math.sign(number) >= initNumber) {
      if (number.toString().length === 1) {
        return ("0" + number).slice(slice);
      } else {
        return number;
      }
    } else {
      return initialCardNumber;
    }
  }

  const renderNumber = () => <Text style={styles.number}>{numberText()}</Text>;

  return <View style={styles.container}>{renderNumber()}</View>;
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

export default NumberCard;
