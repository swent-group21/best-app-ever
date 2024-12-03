import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { ThemedText } from "@/src/components/theme/ThemedText";
import { ThemedView } from "@/src/components/theme/ThemedView";
import { ThemedIconButton } from "@/src/components/theme/ThemedIconButton";
import { ThemedTextButton } from "@/src/components/theme/ThemedTextButton";
import FirestoreCtrl, { DBUser } from "@/src/firebase/FirestoreCtrl";

const { width, height } = Dimensions.get("window");

export function Group({
  groupDB,
  index,
  firestoreCtrl,
  navigation,
  testID,
}: any) {
  // Display loading state or handle absence of challenge data
  if (!groupDB) {
    return <ThemedText>Loading Group...</ThemedText>;
  } else {
    return (
      <ThemedView style={styles.container} testID={testID}>
        <ThemedTextButton
          style={styles.heading}
          onPress={() => {}}
          text={groupDB.name}
          textStyle={styles.titleText}
          textColorType="textOverLight"
        ></ThemedTextButton>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    //flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    borderRadius: 15,
    padding: 8,
    //gap: 6,
    color: "transparent",
    fontSize: 5,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.dark.backgroundPrimary,
    width: width * 0.23,
    height: width * 0.2,
    borderRadius: 20,
    margin: 10,
    alignItems: "center",
  },

  titleText: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    textAlign: "right",
    textAlignVertical: "bottom",
    fontSize: 20,
    fontWeight: "bold",
  },
});
