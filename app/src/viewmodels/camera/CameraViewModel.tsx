import { useState, useRef } from "react";
import {
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
  CameraPictureOptions,
  FlashMode,
  CameraView,
} from "expo-camera";

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
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [isFlashEnabled, setIsFlashEnabled] = useState(false);

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

  // Take a picture with the camera
  const takePicture = async () => {
    if (camera.current) {
      try {
        const capturedPicture =
          await camera.current?.takePictureAsync(cameraPictureOptions);
        setPicture(capturedPicture);
        setIsCameraEnabled(false);
      } catch (error) {
        console.log(error);
      }
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

  const goBack = () => { navigation.goBack(); };

  return {
    facing,
    permission,
    requestPermission,
    camera,
    picture,
    isCameraEnabled,
    flashMode,
    isFlashEnabled,
    toggleCameraFacing,
    toggleFlashMode,
    takePicture,
    imageUrlGen,
    setIsCameraEnabled,
    goBack,
  };
}
