import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/src/views/components/theme/themed_text";
import { ThemedView } from "@/src/views/components/theme/themed_view";
import { Colors } from "@/constants/Colors";
import { useState, useEffect } from "react";

/**
 * User list item ViewModel helps display component
 * @param isFriend : boolean indicating if the user is a friend
 * @param isRequested : boolean indicating if the user has been requested
 * @param onAdd : function to add a friend
 * @param onCancelRequest : function to cancel a friend request
 * @returns UserListItem ViewModel Component
 */
export const useUserListItemViewModel = ({
  isFriend,
  isRequested,
  onAdd,
  onCancelRequest,
}: any) => {

  const [status, setStatus] = useState("ADD");

  // Set the status of the user based on the friend and requested status
  useEffect(() => {
    if (isFriend) {
      setStatus("FRIEND");
    } else if (isRequested) {
      setStatus("REQUESTED");
    } else {
      setStatus("ADD");
    }
  }, [isFriend, isRequested]);

  // Handle the press event based on the status
  const handlePress = () => {
    if (status === "ADD") {
      onAdd();
      setStatus("REQUESTED");
    } else if (status === "REQUESTED") {
      onCancelRequest();
      setStatus("ADD");
    }
  };

  return (handlePress);
}