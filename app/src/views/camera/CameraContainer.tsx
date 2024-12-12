import {
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { CameraView } from "expo-camera";
import useCameraViewModel from "@/src/viewmodels/camera/CameraViewModel";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { ThemedView } from "@/components/theme/ThemedView";
import { TopBar } from "@/components/navigation/TopBar";

const { width, height } = Dimensions.get("window");

/**
 * Camera screen
 * @param navigation : navigation object
 * @param firestoreCtrl : FirestoreCtrl object
 * @returns : a screen for the camera
 */
export default function Camera({ navigation, firestoreCtrl, route }: any) {
  const {
    facing,
    permission,
    requestPermission,
    camera,
    picture,
    isCameraEnabled,
    isFlashEnabled,
    toggleCameraFacing,
    toggleFlashMode,
    takePicture,
    imageUrlGen,
    setIsCameraEnabled,
    goBack,
  } = useCameraViewModel(firestoreCtrl, navigation, route);

  if (!permission) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.message}>
          Errors occurred while requesting permission
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </ThemedView>
    );
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </ThemedView>
    );
  }

  return (
    
    <ThemedView style={styles.container} colorType="backgroundPrimary">
      <TopBar
        title="Camera"
        leftIcon="chevron-down"
        leftAction={goBack}
      />
      {isCameraEnabled ? (
        <ThemedView style={styles.cameraContainer} colorType="transparent">
          
          <CameraView
            style={styles.camera}
            facing={facing}
            enableTorch={isFlashEnabled}
            ref={camera}
            testID="camera-view"
          />

          <ThemedView style={styles.buttonPlaceHolder} colorType="transparent">
            <ThemedIconButton
              style={styles.changeOrientationAndFlash}
              onPress={toggleFlashMode}
              name={isFlashEnabled ? "flash" : "flash-off"}
              size={24}
              color="white"
              testID="Flash-Button"
            />

            <ThemedIconButton
              style={styles.takePicture}
              onPress={takePicture}
              name="radio-button-off-sharp"
              size={100}
              color="white"
              testID="Camera-Button"
            />

            <ThemedIconButton
              onPress={toggleCameraFacing}
              testID="Switch-Button"
              style={styles.changeOrientationAndFlash}
              name="camera-reverse"
              size={24}
              color="white"
            />
          </ThemedView>
        </ThemedView>
      ) : (
        <ThemedView style={styles.cameraContainer} colorType="transparent">
          <Image source={{ uri: picture?.uri }} style={styles.camera} />
          <ThemedView style={styles.buttonPlaceHolder} colorType="transparent">
            <ThemedIconButton
              style={styles.changeOrientationAndFlash}
              onPress={() => setIsCameraEnabled(true)}
              name={"reload"}
              size={30}
              color="white"
              testID="Reload-Button"
            />

            <ThemedIconButton
              onPress={() => {}}
              name=""
              size={100}
              color="transparent"
            />

            <ThemedIconButton
              onPress={imageUrlGen}
              testID="Send-Button"
              style={styles.changeOrientationAndFlash}
              name="send"
              size={30}
              color="white"
            />
          </ThemedView>
        </ThemedView>
      )}
    </ThemedView>
    
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
    flex: 3,
    alignSelf: "center",
    alignItems: "center",
    maxHeight: height * 0.65,
    width: width,
    borderRadius: 30,
    marginTop: 10,
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

  cameraContainer: {
    flex: 1,
    alignItems: "center",
  },
  buttonPlaceHolder: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width,
    marginTop: 30,
    marginBottom: 60,
  },
});
