import { getImageUrl } from "@/src/models/firebase/GetFirestoreCtrl";
import { useEffect, useState } from "react";

/**
 * Friend Icon ViewModel component
 * @param name : name of the user
 * @returns the first letter of the name of the user to display
 */
export function useFriendIconViewModel({
  name,
  avatar,
}: {
  readonly name: string;
  readonly avatar: string;
}) {
  const [icon, setIcon] = useState<string>("person-circle-outline");

  const fetchImgUrl = async (img) => {
    return getImageUrl(img);
  };

  useEffect(() => {
    avatar ? fetchImgUrl(avatar).then(setIcon) : "";
  }, [avatar]);

  const firstLetter = name.charAt(0).toUpperCase();

  return { firstLetter, icon };
}
