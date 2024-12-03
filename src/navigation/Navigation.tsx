import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/RootStackParamList";
import FirestoreCtrl, { DBUser } from "@/src/firebase/FirestoreCtrl";

// Screens
import WelcomeScreens from "@/src/app/screens/welcome/welcome_screen";
import WelcomeFinalScreen from "@/src/app/screens/welcome/final_screen";
import HomeScreen from "@/src/app/screens/home/home_screen";
import SignUp from "@/src/app/screens/auth/sign_up_screen";
import SignInScreen from "@/src/app/screens/auth/sign_in_screen";
import ForgotPasswordScreen from "@/src/app/screens/auth/forgot_password_screen";
import Camera from "@/src/app/screens/camera";
import SetUsername from "@/src/app/screens/auth/set_up_screen";
import MaximizeScreen from "@/src/app/screens/home/maximize_screen";
import CreateChallengeScreen from "@/src/app/screens/create/create_challenge";
import ProfileScreen from "@/src/app/screens/home/profile_screen";
import MapScreen from "@/src/app/screens/map/map_screen";

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
      </Group>
    </Navigator>
  );
};
