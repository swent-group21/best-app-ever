import { CameraType, useCameraPermissions, CameraCapturedPicture } from "expo-camera";

export class CameraService {
  static async requestPermissions() {
    const [permission, requestPermission] = useCameraPermissions();
    if (!permission || !permission.granted) {
      await requestPermission();
    }
    return permission?.granted || false;
  }

  static async capturePicture(cameraRef: any, options: any): Promise<CameraCapturedPicture | null> {
    if (cameraRef.current) {
      return await cameraRef.current.takePictureAsync(options);
    }
    return null;
  }
}
