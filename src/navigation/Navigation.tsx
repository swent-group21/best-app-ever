import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/types/RootStackParamList";
import { DBUser } from "../app/models/firebase/FirestoreCtrl";
import FirestoreCtrl from "../app/models/firebase/FirestoreCtrl";

// Screens
import WelcomeScreens from "../app/views/welcome/welcome_screen";
import WelcomeFinalScreen from "../app/views/welcome/final_screen";
import HomeScreen from "../app/views/home/home_screen";
import SignUp from "../app/views/auth/sign_up_screen";
import SignInScreen from "../app/views/auth/sign_in_screen";
import ForgotPasswordScreen from "../app/views/auth/forgot_password_screen";
import Camera from "../app/views/camera/CameraContainer";
import SetUsername from "../app/views/auth/set_up_screen";
import MaximizeScreen from "../app/views/home/maximize_screen";
import CreateChallengeScreen from "../app/views/create/create_challenge";
import ProfileScreen from "../app/views/home/profile_screen";
import MapScreen from "../app/views/map/map_screen";
import GroupScreen from "../app/views/group/GroupScreen";
import CreateGroupScreen from "../app/views/group/CreateGroupScreen";

const { Navigator, Screen, Group } =
  createNativeStackNavigator<RootStackParamList>();

interface AppStackProps {
  isLoggedIn: "Welcome" | "Home";
  user?: DBUser | null;
  setUser?: React.Dispatch<React.SetStateAction<DBUser | null>>;
  firestoreCtrl: FirestoreCtrl;
}

export const Nav: React.FC<AppStackProps> = ({
  isLoggedIn,
  user,
  setUser,
  firestoreCtrl,
}) => {
  return (
    <Navigator
      initialRouteName={isLoggedIn}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#f9f9f9",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Group>
        <Screen name="Welcome" options={{ title: "Login to Strive" }}>
          {(props: any) => (
            <WelcomeScreens
              {...props}
              setUser={setUser}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>

        <Screen name="WelcomeFinal" options={{ title: "Final Screen" }}>
          {(props: any) => (
            <WelcomeFinalScreen
              {...props}
              setUser={setUser}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>

        <Screen name="SignUp">
          {(props: any) => (
            <SignUp
              {...props}
              setUser={setUser}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>

        <Screen name="SignIn">
          {(props: any) => (
            <SignInScreen
              {...props}
              setUser={setUser}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>

        <Screen name="ForgotPassword">
          {(props: any) => (
            <ForgotPasswordScreen {...props} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>

        <Screen name="SetUser">
          {(props: any) => (
            <SetUsername
              {...props}
              user={user}
              setUser={setUser}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>
      </Group>

      <Group>
        <Screen name="Home">
          {(props: any) => (
            <HomeScreen {...props} user={user} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>

        <Screen name="Camera">
          {(props: any) => (
            <Camera {...props} user={user} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>

        <Screen name="Maximize">
          {(props: any) => (
            <MaximizeScreen
              {...props}
              user={user}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>

        <Screen name="CreateChallenge">
          {(props: any) => (
            <CreateChallengeScreen
              {...props}
              user={user}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>

        <Screen name="Profile">
          {(props: any) => (
            <ProfileScreen
              {...props}
              user={user}
              setUser={setUser}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>

        <Screen name="MapScreen">
          {(props: any) => (
            <MapScreen {...props} user={user} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>

        <Screen name="GroupScreen">
          {(props: any) => (
            <GroupScreen {...props} user={user} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>

        <Screen name="CreateGroup">
          {(props: any) => (
            <CreateGroupScreen
              {...props}
              user={user}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>
      </Group>
    </Navigator>
  );
};
