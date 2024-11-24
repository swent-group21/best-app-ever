import React from "react";
import { StyleSheet, Text, View } from "react-native";

function NumberCard({ number = 0 }) {
  function numberText() {
    
    if (number && Math.sign(number) >= 0) {
      if (number.toString().length === 1) {
        return ("0" + number).slice(-2);
      } else {
        return number;
      }
    } else {
      return "00";
    }
  }
  const renderNumber = () => <Text style={styles.number}>{numberText()}</Text>;

  return <View style={styles.container}>{renderNumber()}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333333",
    margin: 4,
    borderRadius: 8,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1f1f1f",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5
  },
  number: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default NumberCard;
