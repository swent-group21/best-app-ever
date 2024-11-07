import React from "react";
import { TopBar } from "@/components/TopBar";
import { Challenge } from "@/components/home/Challenge";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedView } from "@/components/theme/ThemedView";
import { BottomBar } from "@/components/BottomBar";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ThemedView className="h-full w-full justify-center items-center bg-black">
      <TopBar
        title="Commute by foot"
        leftIcon="people-outline"
        rightIcon="person-circle-outline"
      />

      <ThemedScrollView
        className="w-full h-full bg-transparent"
        contentContainerStyle="justify-between items-center gap-8 bg-transparent"
      >
        <Challenge title="Challenge 1"></Challenge>
        <Challenge title="Challenge 2"></Challenge>
        <Challenge title="Challenge 3"></Challenge>
      </ThemedScrollView>

      <BottomBar
        leftIcon="map-outline"
        centerIcon="camera-outline"
        rightIcon="logo-docker"
        centerAction={() => router.push("../camera")}
      />
    </ThemedView>
  );
}
