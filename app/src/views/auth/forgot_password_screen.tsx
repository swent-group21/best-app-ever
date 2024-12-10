import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import ForgotPasswordViewModel from "@/src/viewmodels/auth/ForgotPasswordViewModel";

const { width, height } = Dimensions.get("window");

/**
 * Screen for resetting the password
 * @param navigation : navigation object
 * @returns : a screen for resetting the password
 */
export default function ForgotPasswordScreen({ navigation }: any) {
  const { email, errorMessage, handleEmailChange, handleResetPassword } =
    ForgotPasswordViewModel();

  return (
    <ThemedView style={styles.screenContainer}>
      <ThemedView style={styles.ovalShapeOne} colorType="backgroundSecondary" />
      <ThemedText style={styles.titleText} colorType="textPrimary">
        Forgot your Password?
      </ThemedText>

      {/* Form */}
      <ThemedView style={styles.smallContainer} testID="emailInput">
        <ThemedTextInput
          style={styles.input}
          type="email"
          title="Email"
          onChangeText={handleEmailChange}
          value={email}
          viewWidth={"90%"}
        />

        {/* Error message for the user*/}
        {Boolean(errorMessage) && (
          <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText>
        )}

        <ThemedView style={styles.rowContainer} testID="buttonsReset">
          <ThemedTextButton
            style={styles.buttonCancel}
            onPress={() => navigation.goBack()}
            text="Cancel"
            textType="defaultSemiBold"
            textColorType="textOverLight"
            testID="cancelButton"
          />

          <ThemedTextButton
            style={styles.buttonResetPassword}
            onPress={handleResetPassword}
            text="Reset Password"
            textType="defaultSemiBold"
            textColorType="textOverLight"
            testID="resetPasswordButton"
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  ovalShapeOne: {
    position: "absolute",
    top: "70%",
    left: "-30%",
    width: "130%",
    height: "70%",
    borderRadius: width * 0.7,
  },

  screenContainer: {
    flex: 1,
    alignItems: "center",
    gap: height * 0.1,
  },

  smallContainer: {
    width: "90%",
    backgroundColor: "transparent",
    alignItems: "center",
  },

  rowContainer: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  titleText: {
    textAlign: "justify",
    paddingTop: height * 0.14,
    fontSize: 51,
    fontWeight: "bold",
  },

  input: {
    marginBottom: height * 0.02,
    padding: 8,
    borderWidth: 2,
    borderRadius: 15,
  },

  buttonResetPassword: {
    width: "60%",
    alignItems: "center",
    borderRadius: 15,
    padding: 8,
  },

  buttonCancel: {
    width: "35%",
    alignItems: "center",
    borderRadius: 15,
    padding: 8,
  },

  errorMessage: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
