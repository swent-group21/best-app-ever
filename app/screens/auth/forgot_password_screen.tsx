import { Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const uri = "@/assets/images/auth/ForgotPasswordScreen/";
  return (
    <ThemedView style={styles.screenContainer}>
      <Image
        source={require(`${uri}bg.png`)}
        style={[styles.backgroundImage]}
      />

      <ThemedText style={styles.titleText}>Forgot your Password ?</ThemedText>

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
          />
          <ThemedTextButton
            style={styles.buttonResetPassword}
            onPress={() => alert("Send Email")}
            text="Reset Password"
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
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
    borderWidth: 1,
    width: "35%",
    borderColor: "#ccc",
  },
});
