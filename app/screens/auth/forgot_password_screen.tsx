import { StyleSheet, Dimensions } from "react-native";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { useRouter } from "expo-router";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function ForgotPasswordScreen() {
  const router = useRouter();
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
          viewWidth={"90%"}
        />

        {/* Buttons */}
        <ThemedView style={styles.rowContainer} testID="buttonsReset">
          {/* Cancel button */}
          <ThemedTextButton
            style={styles.buttonCancel}
            onPress={() => router.back()}
            text="Cancel"
            textType="defaultSemiBold"
            textColorType="textOverLight"
            testID="cancelButton"
          />
          {/* Reset password button */}
          <ThemedTextButton
            style={styles.buttonResetPassword}
            onPress={() => alert("Send Email")}
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
