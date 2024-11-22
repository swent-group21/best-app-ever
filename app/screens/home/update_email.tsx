import React, { useState } from "react";
import { Alert } from "react-native";
import {
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
    sendSignInLinkToEmail,
} from "firebase/auth";
import { auth } from "@/firebase/Firebase";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";

export default function ChangeEmailScreen({ navigation }: any) {
  const currentUser = auth.currentUser; // Current Firebase user
  const [newEmail, setNewEmail] = useState(""); // For the new email address
  const [password, setPassword] = useState(""); // For re-authentication
  const [isVerified, setIsVerified] = useState(false); // Whether the new email is verified

  // Step 1: Send a verification email to the new email address
  const sendVerificationEmail = async () => {
    if (!currentUser) {
      Alert.alert("Error", "No user is currently logged in.");
      return;
    }
    const actionCodeSettings = {
        url: "https://your-app-url.com/verify-email", // Replace with your app's URL
        handleCodeInApp: true, // Must be enabled for email link authentication
        iOS: {
          bundleId: "com.your.bundleId",
        },
        android: {
          packageName: "com.your.packageName",
          installApp: true,
          minimumVersion: "12",
        },
        dynamicLinkDomain: "yourapp.page.link", // Replace with your dynamic link domain if set up
      };

    try {
        await sendSignInLinkToEmail(auth, newEmail, actionCodeSettings);
        Alert.alert(
          "Verification Email Sent",
          "A verification email has been sent to your new email address. Please check your inbox."
        );
      } catch (error) {
        console.log(error);
      }
    };

  // Step 2: Re-authenticate and update the email
  const updateEmailHandler = async () => {
    if (!currentUser) {
      Alert.alert("Error", "No user is currently logged in.");
      return;
    }

    try {
      if (!isVerified) {
        Alert.alert(
          "Error",
          "Please verify the new email before updating your account."
        );
        return;
      }

      // Re-authenticate the user
    if (currentUser.email) {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );
      
      await reauthenticateWithCredential(currentUser, credential);
    }

      // Update the email
      await updateEmail(currentUser, newEmail);
      Alert.alert(
        "Success",
        "Your email has been updated successfully. Please log in with your new email."
      );
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Reauthentication Required",
          "Please log in again to update your email."
        );
      } else {
        Alert.alert(error);
      }
    }
    
  };

  // Step 3: Check if the new email is verified
  const checkEmailVerification = async () => {
    try {
      const verified = await isEmailVerified(newEmail);
      setIsVerified(verified);

      if (verified) {
        Alert.alert("Verified", "The new email address has been verified.");
      } else {
        Alert.alert(
          "Not Verified",
          "The new email address has not been verified yet."
        );
      }
    } catch (error) {
      Alert.alert("Error");
    }
  };

  return (
    <ThemedView>
      <ThemedText>Update Email</ThemedText>

      {/* Input for New Email */}
      <ThemedTextInput
        placeholder="New Email"
        onChangeText={(text) => setNewEmail(text)}
        value={newEmail}
      />

      {/* Input for Password (Required for Reauthentication) */}
      <ThemedTextInput
        placeholder="Password (required for security)"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      {/* Button to Send Verification Email */}
      <ThemedTextButton
        onPress={sendVerificationEmail}
        text="Send Verification Email"
      />

      {/* Button to Check Verification Status */}
      <ThemedTextButton
        onPress={checkEmailVerification}
        text="Check Verification Status"
      />

      {/* Button to Update Email */}
      <ThemedTextButton
        onPress={updateEmailHandler}
        text="Update Your Email"
      />

      <ThemedText>
        {isVerified ? "New email is verified!" : "New email is not verified yet."}
      </ThemedText>
    </ThemedView>
  );
}

// Helper function to check if an email is verified (mock implementation)
const isEmailVerified = async (email: string) => {
  // Replace with logic to check if the email is verified
  // For example, check your backend or Firebase to confirm verification
  return true; // Assuming the email is verified for demo purposes
};
