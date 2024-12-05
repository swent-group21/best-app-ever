import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { ThemedView } from "../../../components/theme/ThemedView";
import { ThemedText } from "../../../components/theme/ThemedText";
import { ThemedTextInput } from "../../../components/theme/ThemedTextInput";
import { ThemedTextButton } from "../../../components/theme/ThemedTextButton";
import { ThemedIconButton } from "../../../components/theme/ThemedIconButton";
import { TopBar } from "../../../components/navigation/TopBar";
import { Icon } from "react-native-elements";
import { useProfileScreenViewModel } from "../../viewmodels/home/ProfileScreenViewModel";
import FirestoreCtrl, { DBUser } from "../../models/firebase/FirestoreCtrl";

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
  const {
    userIsGuest,
    name,
    setName,
    image,
    pickImage,
    upload,
    handleLogOut,
    handleChangeEmail,
    handleChangePassword,
  } = useProfileScreenViewModel(user, setUser, firestoreCtrl, navigation);

  if (userIsGuest) {
    return (
      <ThemedView style={styles.bigContainer}>
        <ThemedText style={styles.notLoggedIn}>You are not logged in!</ThemedText>
        <ThemedTextButton
          text="Sign In"
          textColorType="white"
          onPress={handleLogOut}
          style={styles.action}
        />
      </ThemedView>
    );
  }

  return (
  <ThemedView style={styles.bigContainer} testID="profile-screen">

  <TopBar
    title="Your profile"
    leftIcon="arrow-back"
    leftAction={() => navigation.goBack()}
  />
  <TouchableOpacity onPress={pickImage} testID="image-picker" style={styles.smallContainer}>
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

  <ThemedTextInput
    style={styles.username}
    value={name}
    onChangeText={setName}
    placeholder="Enter your name"
  />

  <ThemedView style={styles.actionsContainer} testID="actions-container">
    <ThemedView style={styles.row}>
      <ThemedTextButton
        text="Change your email"
        textColorType="white"
        onPress={handleChangeEmail}
        style={styles.action}
        colorType="transparent"
      />
      <Icon name="email" color="white" size={30} />
    </ThemedView>
    <ThemedView style={styles.row}>
      <ThemedTextButton
        text="Change your password"
        textColorType="white"
        onPress={handleChangePassword}
        style={styles.action}
        colorType="transparent"
      />
      <Icon name="key" color="white" size={30} />
    </ThemedView>
    <ThemedView style={styles.row}>
      <ThemedTextButton
        text="Log Out"
        textColorType="white"
        onPress={handleLogOut}
        style={styles.action}
        colorType="transparent"
      />
      <Icon name="logout" color="white" size={30} />
    </ThemedView>
  </ThemedView>
</ThemedView>

  );
}

const styles = StyleSheet.create({
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
    alignItems: "flex-start",
    
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
    alignItems: "flex-start",
    borderRadius: 10,
    borderColor: "transparent",
    borderWidth: 1,
    padding: 12,
    flexDirection: "row",
    backgroundColor: "#212124",
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
    backgroundColor: "#212124",
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  notLoggedIn: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});