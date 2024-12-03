import { StyleSheet, Dimensions } from "react-native";
import { ThemedView } from "@/src/components/theme/ThemedView";
import { ThemedText } from "@/src/components/theme/ThemedText";
import { ThemedTextInput } from "@/src/components/theme/ThemedTextInput";
import { ThemedTextButton } from "@/src/components/theme/ThemedTextButton";
import { resetPassword } from "@/src/types/Auth";
import { useState } from "react";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState("");

  return (
    <ThemedView style={styles.screenContainer}>
      {/* Background shape */}
      <ThemedView style={styles.ovalShapeOne} colorType="backgroundSecondary" />

      {/* Screen content */}
      <ThemedText style={styles.titleText} colorType="textPrimary">
        Forgot your Password ?
      </ThemedText>

      {/* Input fields */}
      <ThemedView style={styles.smallContainer} testID="emailInput">
        {/* Email input */}
        <ThemedTextInput
          style={styles.input}
          type="email"
          title="Email"
          onChangeText={(text) => setEmail(text)}
          viewWidth={"90%"}
        />

        {/* Buttons */}
        <ThemedView style={styles.rowContainer} testID="buttonsReset">
          {/* Cancel button */}
          <ThemedTextButton
            style={styles.buttonCancel}
            onPress={() => navigation.goBack()}
            text="Cancel"
            textType="defaultSemiBold"
            textColorType="textOverLight"
            testID="cancelButton"
          />
          {/* Reset password button */}
          <ThemedTextButton
            style={styles.buttonResetPassword}
            onPress={() => resetPassword(email)}
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
});
