import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCameraViewModel } from "../../viewmodels/camera/CameraViewModel";
import { CameraView } from "expo-camera";
import { GestureDetector } from "react-native-gesture-handler";

export default function CameraScreen({ navigation }: any) {
  const {
    permissionGranted,
    facing,
    isFlashEnabled,
    zoom,
    picture,
    cameraRef,
    requestPermissions,
    toggleFacing,
    toggleFlash,
    capturePicture,
    pinchGesture,
  } = useCameraViewModel();

  useEffect(() => {
    requestPermissions();
  }, []);

  if (!permissionGranted) {
    return (
      <View style={styles.container}>
        <Ionicons name="camera-off" size={50} color="gray" />
        <TouchableOpacity onPress={requestPermissions}>
          <Ionicons name="reload" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    );
  }

  if (picture) {
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: picture }} style={styles.imageBackground} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CreateChallenge", { image_id: picture });
          }}
          style={styles.send}
        >
          <Ionicons name="send" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <GestureDetector gesture={pinchGesture}>
      <CameraView style={styles.camera} facing={facing} enableTorch={isFlashEnabled} zoom={zoom} ref={cameraRef}>
        <View style={styles.controls}>
          <TouchableOpacity onPress={toggleFacing}>
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={capturePicture}>
            <Ionicons name="radio-button-on" size={70} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFlash}>
            <Ionicons name={isFlashEnabled ? "flash-off" : "flash"} size={30} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: { flex: 1 },
  controls: { flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: 50, width: "100%" },
  imageBackground: { width: "100%", height: "100%" },
  goBack: { position: "absolute", top: 50, left: 20 },
  send: { position: "absolute", bottom: 50, right: 20 },
});
