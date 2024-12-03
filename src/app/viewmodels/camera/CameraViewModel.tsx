import { useState, useRef, useCallback, useMemo } from "react";
import { CameraService } from "../../models/CameraService";
import { CameraView } from "expo-camera";
import { Gesture } from "react-native-gesture-handler";
import { Platform } from "react-native";

export function useCameraViewModel() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [isFlashEnabled, setIsFlashEnabled] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [lastZoom, setLastZoom] = useState(0);
  const [picture, setPicture] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);

  // Request permissions
  const requestPermissions = async () => {
    const granted = await CameraService.requestPermissions();
    setPermissionGranted(granted);
  };

  // Toggle camera facing
  const toggleFacing = () => setFacing((prev) => (prev === "back" ? "front" : "back"));

  // Toggle flash
  const toggleFlash = () => setIsFlashEnabled((prev) => !prev);

  // Capture picture
  const capturePicture = async () => {
    const captured = await CameraService.capturePicture(cameraRef, {
      base64: true,
    });
    if (captured?.uri) {
      setPicture(captured.uri);
    }
  };

  // Zoom gestures
  const onPinch = useCallback((event: any) => {
    const velocity = event.velocity / 20;
    let newZoom = zoom + event.scale * velocity * (Platform.OS === "ios" ? 0.01 : 0.02);
    newZoom = Math.max(0, Math.min(0.7, newZoom));
    setZoom(newZoom);
  }, [zoom]);

  const onPinchEnd = useCallback(() => setLastZoom(zoom), [zoom]);

  const pinchGesture = useMemo(() => Gesture.Pinch().onUpdate(onPinch).onEnd(onPinchEnd), [onPinch]);

  return {
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
  };
}
