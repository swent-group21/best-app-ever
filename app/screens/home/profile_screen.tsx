import React from "react";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { TopBar } from "@/components/navigation/TopBar";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { Icon } from "react-native-elements";
import FirestoreCtrl, { DBUser } from "@/firebase/FirestoreCtrl";
import { logOut, resetEmail, resetPassword } from "@/types/Auth";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";

//TODO : change the colors for light mode
const { width, height } = Dimensions.get("window");

export default function ProfileScreen({
  user,
  setUser,
  navigation,
  firestoreCtrl,
}: {
  user: DBUser;
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  const userIsGuest = user.name === "Guest";

  React.useEffect(() => {
    const fetchProfilePicture = async () => {
      const profilePicture = await firestoreCtrl.getProfilePicture(user.uid);
      setImage(profilePicture || null);
    };
    fetchProfilePicture();
  }, [user.uid]);

  const [name, setName] = React.useState<string>(user.name);
  
  React.useEffect(() => {
    setName(user.name);
  }, [user.name]);

  const [image, setImage] = React.useState<string | null>(user.image_id ? user.image_id : null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const upload = async () => {
    if (await user.name === "") {
      alert("Please enter a username.");
    } else {
      try {
        await firestoreCtrl.setName(user.uid, await name, setUser);
        if (image) {
          await firestoreCtrl.setProfilePicture(user.uid, image, setUser);
        }
      } catch (error) {
        console.error("Error changing profile: ", error);
        alert("Error changing profile: " + error);
      }
    }
  };

  return (
    <ThemedView style={styles.bigContainer} testID="profile-screen">
      {!userIsGuest && (
        <>
          <TopBar
            title="Your profile"
            leftIcon="arrow-back"
            leftAction={() => {upload(); navigation.goBack();}}
          />
          <TouchableOpacity onPress={pickImage} style={styles.smallContainer}>
            {!image ? (
              <ThemedIconButton
                name="person-circle-outline"
                size={300}
                color="white"
                onPress={pickImage}
              />
            ) : (
              <Image source={{ uri: image }} style={styles.image} />
            )}
          </TouchableOpacity>
          <ThemedView style={styles.smallContainer}>
            <ThemedTextInput style={styles.username} value={name} onChangeText={setName} />
          </ThemedView>
          <ThemedView style={styles.actionsContainer}>
            <ThemedView style={styles.row}>
              <ThemedTextButton
                text="Change your email"
                textColorType="white"
                darkColor="transparent"
                lightColor="transparent"
                onPress={() => resetEmail(user.email)}
                style={styles.action}
              >
                {" "}
              </ThemedTextButton>
              <Icon name="email" color="white" size={30} />
            </ThemedView>

            <ThemedView style={styles.row}>
              <ThemedTextButton
                text="Change your password"
                textColorType="white"
                darkColor="transparent"
                lightColor="transparent"
                style={styles.action}
                onPress={() => resetPassword(user.email)}
              ></ThemedTextButton>
              <Icon name="key" color="white" size={30} />
            </ThemedView>
            <ThemedView style={styles.row}>
              <ThemedTextButton
                text="Log Out"
                textColorType="white"
                darkColor="transparent"
                lightColor="transparent"
                onPress={() => logOut(navigation)}
                style={styles.action}
              ></ThemedTextButton>
              <Icon name="logout" color="white" size={30} />
            </ThemedView>
          </ThemedView>
        </>
      )}

      {userIsGuest && (
        <ThemedView style={styles.smallContainer}>
          <ThemedText style={styles.notLoggedIn}>
            You are not logged in !
          </ThemedText>
          <ThemedTextButton
            text="Sign In"
            textColorType="white"
            darkColor="transparent"
            lightColor="transparent"
            onPress={() => navigation.reset({ index: 0, routes: [{ name: "WelcomeFinal" }] })}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = {
  bigContainer: {
    flex: 1,
    alignItems: "center",
  },
  smallContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 100,
    marginBottom: 40,
  },
  username: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  columnInfo: {
    flexDirection: "column",
    alignItems: "left",
  },
  logOut: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 1,
  },
  logOutView: {
    top: 0,
    alignItems: "center",
  },
  action: {
    alignItems: "left",
    borderRadius: 10,
    borderColor: "transparent",
    borderWidth: 1,
    padding: 12,
    flexDirection: "row",
  },
  actionsContainer: {
    borderRadius: 10,
    width: "95%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#212124",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  notLoggedIn: {
    width: "100%",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
};
