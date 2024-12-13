import { useState, useRef, useEffect } from "react";
import {
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
  CameraPictureOptions,
  CameraView,
} from "expo-camera";
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { createChallenge } from "@/types/ChallengeBuilder";
import {
  DBGroup,
  DBChallengeDescription,
} from "@/src/models/firebase/FirestoreCtrl";

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
  // Camera state
  const camera = useRef<CameraView>(null);
  const cameraPictureOptions: CameraPictureOptions = { base64: true };
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [picture, setPicture] = useState<CameraCapturedPicture>();

  const [facing, setFacing] = useState<CameraType>("back");

  const [isFlashEnabled, setIsFlashEnabled] = useState(false);

  // Location state
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  // Challenge state
  const [caption, setCaption] = useState("");

  const [descriptionTitle, setDescriptionTitle] =
    useState<DBChallengeDescription>({
      title: "Challenge Title",
      description: "Challenge Description",
      endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
    });

  const group_id = route.params?.group_id;

  // Go back to the previous screen
  const goBack = () => {
    navigation.navigate("Home");
  };

  // Change the camera state
  const toggleCameraState = () => {
    setIsCameraEnabled((prev) => !prev);
  };

  // Change the camera facing
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // Change the flash mode
  const toggleFlashMode = () => {
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

  // Toggle location switch
  const toggleLocation = () => setIsLocationEnabled((prev) => !prev);

  // Fetch the current location
  useEffect(() => {
    async function fetchLocation() {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setIsLocationEnabled(false);
        return;
      }
      let currentLocation = await getCurrentPositionAsync();
      setLocation(currentLocation);
    }
    fetchLocation();
  }, []);

  // Fetch the description title
  useEffect(() => {
    async function fetchDescriptionTitle() {
      try {
        const currentChallengeData =
          await firestoreCtrl.getChallengeDescription();

        setDescriptionTitle(currentChallengeData);
      } catch (error) {
        console.error("Error fetching description id");
        return error;
      }
    }

    fetchDescriptionTitle();
  }, []);

  // Create the challenge
  const makeChallenge = async () => {
    try {
      const imageId = await firestoreCtrl.uploadImageFromUri(picture?.uri);
      const imageURL = await firestoreCtrl.getImageURL(imageId);
      const date = new Date();
      await createChallenge(
        firestoreCtrl,
        caption,
        isLocationEnabled ? location : null,
        group_id,
        descriptionTitle.title ?? "",
        date,
        imageURL,
      );
      if (group_id == "" || group_id == "home") {
        navigation.navigate("Home");
      } else {
        const group: DBGroup = await firestoreCtrl.getGroup(group_id);
        navigation.navigate("GroupScreen", { currentGroup: group });
      }
    } catch (error) {
      console.error("Unable to create challenge", error);
      return error;
    }
  };

  return {
    facing,
    permission,
    requestPermission,
    camera,
    picture,
    caption,
    location,
    isCameraEnabled,
    isFlashEnabled,
    isLocationEnabled,
    toggleCameraFacing,
    toggleFlashMode,
    toggleLocation,
    toggleCameraState,
    setCaption,
    takePicture,
    makeChallenge,
    goBack,
  };
}
