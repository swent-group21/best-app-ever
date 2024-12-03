import { useState, useRef, useCallback, useMemo } from "react";
import { CameraType, useCameraPermissions, CameraCapturedPicture, CameraPictureOptions } from "expo-camera";
import { FlashMode } from "expo-camera/build/Camera.types";
import Gesture from "react-native-gesture-handler";
import { Platform } from "react-native";
import { Camera } from "react-native-maps";
import { CameraView } from "expo-camera";

export function useCameraViewModel(firestoreCtrl: any, navigation: any) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [flashMode, setFlashMode] = useState<FlashMode | string>("off");
  const [isFlashEnabled, setIsFlashEnabled] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [lastZoom, setLastZoom] = useState(0);

  const cameraPictureOptions: CameraPictureOptions = { base64: true };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlashMode = () => {
    setFlashMode((current) => (current === "off" ? "on" : "off"));
    setIsFlashEnabled((prev) => !prev);
  };

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


  const takePicture = async () => {
    if (camera.current) {
      try {
        const capturedPicture = await camera.current?.takePictureAsync(cameraPictureOptions);
        setPicture(capturedPicture);
        setIsCameraEnabled(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const imageUrlGen = async () => {
    const img_id = await firestoreCtrl.uploadImageFromUri(picture?.uri);
    navigation.navigate("CreateChallenge", { image_id: img_id });
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
