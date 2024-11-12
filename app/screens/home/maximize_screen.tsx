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

      <ThemedView style={styles.container}>
        <Image
          source={require("@/assets/images/challenge2.png")}
          style={styles.image}
        />
      </ThemedView>

      <ThemedView style={[styles.user, { justifyContent: "space-evenly" }]}>
        <ThemedView style={styles.user}>
          <ThemedIconButton
            name="person-circle-outline"
            onPress={() => {
              /* user button */
            }}
            size={45}
            colorType="white"
          />
          <ThemedView style={styles.userInfo}>
            <ThemedText
              colorType="white"
              type="smallSemiBold"
            >
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
  topbar: {
    backgroundColor: "transparent",
    paddingBottom: 10,
  },
  bigContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    height: "70%",
    width: width - 20,
    backgroundColor: "transparent",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 2,
  },
  contentContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    backgroundColor: "transparent",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    padding: 5,
    backgroundColor: "transparent",
    width: width - 40,
  },
  userInfo: {
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
