import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import  useCameraViewModel  from "@/src/viewmodels/camera/CameraViewModel";

const { width, height } = Dimensions.get("window");

export default function Camera({ navigation, firestoreCtrl}: any) {
  const {
    facing,
    permission,
    requestPermission,
    camera,
    picture,
    isCameraEnabled,
    flashMode,
    isFlashEnabled,
    zoom,
    toggleCameraFacing,
    toggleFlashMode,
    takePicture,
    imageUrlGen,
    setIsCameraEnabled,
  } = useCameraViewModel(firestoreCtrl, navigation);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraEnabled ? (
            <CameraView
              style={styles.camera}
              facing={facing}
              enableTorch={isFlashEnabled}
              ref={camera}
              zoom={zoom}
              testID="camera-view"
            >
              <View style={styles.buttonPlaceHolder}>
                <TouchableOpacity
                  style={styles.changeOrientationAndFlash}
                  onPress={toggleCameraFacing}
                  testID="Switch-Button"
                >
                  <Ionicons name="camera-reverse" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.takePicture} onPress={takePicture}>
                  <Ionicons name="radio-button-off-sharp" size={100} color="white" testID="Camera-Button" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.changeOrientationAndFlash}
                  onPress={toggleFlashMode}
                >
                  <Ionicons
                    name={isFlashEnabled ? "flash-off" : "flash"}
                    size={24}
                    color="white"
                    testID="Flash-Button"
                  />
                </TouchableOpacity>
              </View>
            </CameraView>
      ) : (
        <View>
          <ImageBackground source={{ uri: picture?.uri }} style={styles.pictureBackround} />
          <TouchableOpacity style={styles.goBack} onPress={() => setIsCameraEnabled(true)}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.send} onPress={imageUrlGen}>
            <Ionicons name="send" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  picture: {
    width: width,
    height: height,
    position: "absolute",
    bottom: 0,
    left: 0,
  },

  pictureBackround: {
    width: width,
    height: height,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  goBack: {
    position: "absolute",
    top: height * 0.0,
    left: width * 0.0,
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: "transparent",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  send: {
    position: "absolute",
    bottom: height * 0.0,
    right: width * 0.0,
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: "transparent",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  takePicture: {
    backgroundColor: "transparent",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  changeOrientationAndFlash: {
    backgroundColor: "transparent",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonPlaceHolder: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width,
    height: height * 0.3,
    bottom: 0,
    position: "absolute",
    flex: 1,
  },
});