import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { useRouter } from "expo-router";

// Get screen width and height
const { width, height } = Dimensions.get("window");

export default function MaximizeScreen() {
  const router = useRouter();

  const userName = "Sandraa"; // derived from the name of the user
  const userLocation = "Plage de Vidy"; // derived from the location of the user
  const userTime = "18:26"; // derived from the time the user posted the challenge

  return (
    <ThemedView style={styles.bigContainer}>
      <TopBar
        title="Commute by foot"
        leftIcon="arrow-back-outline"
        leftAction={router.back}
      />

      <ThemedView style={styles.container} colorType="transparent">
        <Image
          source={require("@/assets/images/challenge2.png")}
          style={styles.image}
        />
      </ThemedView>

      <ThemedView
        style={[styles.user, { justifyContent: "space-evenly" }]}
        colorType="transparent"
      >
        <ThemedView style={styles.user} colorType="transparent">
          <ThemedIconButton
            name="person-circle-outline"
            onPress={() => {
              /* user button */
            }}
            size={45}
            colorType="white"
          />
          <ThemedView style={styles.userInfo} colorType="transparent">
            <ThemedText colorType="white" type="smallSemiBold">
              {userName}
            </ThemedText>
            <ThemedText colorType="white" type="small">
              {"in " + userLocation + " at " + userTime}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedIconButton
          name="location-outline"
          onPress={() => {
            /* location button */
          }}
          size={25}
          colorType="white"
        />
      </ThemedView>

      <ThemedView style={styles.bigContainer}>
        <ThemedIconButton
          name="heart-outline"
          onPress={() => {
            /* */
          }}
          size={60}
          colorType="white"
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    height: "70%",
    width: "95%",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "white",
  },

  user: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.01,
    padding: width * 0.01,
  },

  userInfo: {
    flexDirection: "column",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
