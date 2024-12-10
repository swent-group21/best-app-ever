import { useState, useRef, useCallback } from "react";
import {
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
  CameraPictureOptions,
  FlashMode,
  CameraView,
} from "expo-camera";
import { Platform } from "react-native";

/**
 * ViewModel for the camera screen.
 * @param firestoreCtrl : FirestoreCtrl object
 * @param navigation : navigation object
 * @returns : functions for the camera screen
 */
export default function useCameraViewModel(
  firestoreCtrl: any,
  navigation: any,
  route: any,
) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [flashMode, setFlashMode] = useState<FlashMode | string>("off");
  const [isFlashEnabled, setIsFlashEnabled] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [lastZoom, setLastZoom] = useState(0);

  const group_id = route.params?.group_id;

  const cameraPictureOptions: CameraPictureOptions = { base64: true };

  // Change the camera facing
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // Change the flash mode
  const toggleFlashMode = () => {
    setFlashMode((current) => (current === "off" ? "on" : "off"));
    setIsFlashEnabled((prev) => !prev);
  };

  // Function not used in the current implementation but can be used to zoom in/out
  const onPinch = useCallback(
    (event: any) => {
      const velocity = event.velocity / 20;
      const outFactor = lastZoom * (Platform.OS === "ios" ? 40 : 15);

      let newZoom =
        velocity > 0
          ? zoom + event.scale * velocity * (Platform.OS === "ios" ? 0.01 : 25)
          : zoom -
            event.scale *
              (outFactor || 1) *
              Math.abs(velocity) *
              (Platform.OS === "ios" ? 0.02 : 50);

      if (newZoom < 0) newZoom = 0;
      else if (newZoom > 0.7) newZoom = 0.7;

      setZoom(newZoom);
    },
    [zoom, lastZoom],
  );

  // Take a picture with the camera
  const takePicture = async () => {
    if (camera.current) {
      try {
        console.log("Current Camera Valid")
        const capturedPicture =
          await camera.current?.takePictureAsync(cameraPictureOptions);
        setPicture(capturedPicture);
        console.log("setIsCameraEnabled called", false);
        setIsCameraEnabled(false);
        console.log("isCameraEnabled", isCameraEnabled);
      } catch (error) {
        console.log("Error in takePicture: ", error);
      }
    } else {
      console.error('camera.current is null'); //debug log
    }
  };

  // Generate an image URL from the picture taken
  const imageUrlGen = async () => {
    const img_id = await firestoreCtrl.uploadImageFromUri(picture?.uri);
    navigation.navigate("CreateChallenge", {
      image_id: img_id,
      group_id: group_id,
    });
  };

  return {
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
  };
}
