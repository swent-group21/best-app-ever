import {
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function ForgotPasswordScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.screenContainer}>
      <ThemedView style={styles.ovalShapeOne} colorType="backgroundSecondary" />

      <ThemedText style={styles.titleText} colorType="white">Forgot your Password ?</ThemedText>

      <ThemedView style={styles.smallContainer}>
        <ThemedTextInput
          style={styles.input}
          type="email"
          title="Email"
          viewWidth={"90%"}
        />

        <ThemedView style={styles.rowContainer}>
          <ThemedTextButton
            style={styles.buttonCancel}
            onPress={() => router.back()}
            text="Cancel"
            textStyle={{ fontWeight: "600" }}
          />
          <ThemedTextButton
            style={styles.buttonResetPassword}
            onPress={() => alert("Send Email")}
            text="Reset Password"
            textStyle={{ fontWeight: "600" }}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  ovalShapeOne: {
    position: "absolute",
    top: height * 0.7,
    left: -width * 0.3,
    width: width * 1.3,
    height: height * 0.7,
    borderRadius: width * 0.7,
  },

  screenContainer: {
    alignItems: "center",
    gap: 75,
    flex: 1,
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

  backgroundImage: {
    width: "90%",
    height: "39%",
    position: "absolute",
    bottom: -30,
    right: 0,
  },

  titleText: {
    fontSize: 51,
    fontWeight: "bold",
    textAlign: "justify",
    paddingTop: 100,
  },

  input: {
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    color: "white",
  },

  buttonResetPassword: {
    alignItems: "center",
    borderRadius: 15,
    padding: 8,
    width: "60%",
    backgroundColor: "black",
  },

  buttonCancel: {
    alignItems: "center",
    borderRadius: 15,
    padding: 8,
    width: "35%",
  },
});
