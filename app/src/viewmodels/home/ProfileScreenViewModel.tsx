import { useEffect, useState } from "react";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import FirestoreCtrl, { DBUser } from "../../models/firebase/FirestoreCtrl";
import { logOut, resetEmail, resetPassword } from "@/types/Auth";

/**
 * ViewModel for the profile screen.
 * @param user : user object
 * @param setUser : set user object
 * @param firestoreCtrl : FirestoreCtrl object
 * @param navigation : navigation object
 * @returns : functions for the profile screen
 */
export function useProfileScreenViewModel(
  user: DBUser,
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>,
  firestoreCtrl: FirestoreCtrl,
  navigation: any,
) {
  const userIsGuest = user.name === "Guest";

  const [name, setName] = useState<string>(user.name);
  const [image, setImage] = useState<string | null>(user.image_id ?? null);

  // Fetch the user's profile picture
  useEffect(() => {
    const fetchProfilePicture = async () => {
      const profilePicture = await firestoreCtrl.getProfilePicture(user.uid);
      setImage(profilePicture || null);
    };
    fetchProfilePicture();
  }, [user.uid, firestoreCtrl]);

  // Pick an image from the user's gallery
  const pickImage = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  // Upload the user's profile picture and name
  const upload = async () => {
    if (!name) {
      alert("Please enter a username.");
      return;
    }

    try {
      await firestoreCtrl.setName(user.uid, name, setUser);
      if (image) {
        await firestoreCtrl.setProfilePicture(user.uid, image, setUser);
      }
    } catch (error) {
      console.error("Error changing profile: ", error);
      alert("Error changing profile: " + error);
    }
  };

  const handleLogOut = () => logOut(navigation);
  const handleChangeEmail = () => resetEmail(user.email);
  const handleChangePassword = () => resetPassword(user.email);

  return {
    userIsGuest,
    name,
    setName,
    image,
    pickImage,
    upload,
    handleLogOut,
    handleChangeEmail,
    handleChangePassword,
  };
}
