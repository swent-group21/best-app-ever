import React from "react";
import { Text, Dimensions, Image } from "react-native";
import { TopBar } from "@/components/TopBar";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function MaximizeScreen() {
  const router = useRouter();

  const userName = "Sandraa";
  const userLocation = "Plage de Vidy";
  const userTime = "18:26";

  return (
    <ThemedView className="flex-1 justify-center items-center bg-black">
      <TopBar
        title="Commute by foot"
        leftIcon="arrow-back-outline"
        leftAction={router.back}
      />

      <ThemedView className="h-[70%] w-[95%] bg-transparent rounded-xl border-2 border-white">
        <Image
          source={require("@/assets/images/challenge2.png")}
          className="w-full h-full rounded-xl"
        />
      </ThemedView>

      <ThemedView className="flex-row items-center gap-1 p-1 bg-transparent w-[90%] justify-between">
        <ThemedView className="flex-row items-center gap-1">
          <ThemedIconButton
            iconName="person-circle-outline"
            onPress={() => {}}
            size={45}
            color="white"
          />
          <ThemedView className="flex-col bg-transparent">
            <ThemedText
              lightColor="white"
              darkColor="white"
              type="smallSemiBold"
            >
              {userName}
            </ThemedText>
            <ThemedText lightColor="white" darkColor="white" type="small">
              {"in " + userLocation + " at " + userTime}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedIconButton
          iconName="location-outline"
          onPress={() => {}}
          size={25}
          color="white"
        />
      </ThemedView>

      <ThemedView className="flex-1 justify-center items-center bg-black">
        <ThemedIconButton
          iconName="heart-outline"
          onPress={() => {}}
          size={60}
          color="white"
        />
      </ThemedView>
    </ThemedView>
  );
}
