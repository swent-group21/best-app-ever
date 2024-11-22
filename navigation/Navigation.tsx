import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from "@/types/RootStackParamList";
import FirestoreCtrl, { DBUser } from "@/firebase/FirestoreCtrl";

// Screens
import WelcomeScreens from "@/app/screens/welcome/welcome_screen";
import WelcomeFinalScreen from "@/app/screens/welcome/final_screen";
import HomeScreen from "@/app/screens/home/home_screen";
import SignUp from "@/app/screens/auth/sign_up_screen";
import SignInScreen from "@/app/screens/auth/sign_in_screen";
import ForgotPasswordScreen from "@/app/screens/auth/forgot_password_screen";
import Camera from "@/app/screens/camera";
import SetUsername from "@/app/screens/auth/set_up_screen";
import MaximizeScreen from "@/app/screens/home/maximize_screen";
import CreateChallengeScreen from "@/app/screens/create/create_challenge";
import MapScreen from "@/app/screens/map/map_screen";

const { Navigator, Screen, Group } = createNativeStackNavigator<RootStackParamList>();

interface AppStackProps {
  isLoggedIn: "Welcome" | "Home";
  user?: DBUser | null;
  firestoreCtrl: FirestoreCtrl;
}

export const Nav: React.FC<AppStackProps> = ({
  isLoggedIn,
  user,
  firestoreCtrl,
}) => {
  return (
    <Navigator
      firestoreCtrl={firestoreCtrl}
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
            <WelcomeScreens {...props} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>
        <Screen name="WelcomeConcept" options={{ title: "Final Screen" }}>
          {(props: any) => (
            <WelcomeFinalScreen {...props} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>
        <Screen name="SignUp">
          {(props: any) => <SignUp {...props} firestoreCtrl={firestoreCtrl} />}
        </Screen>
        <Screen name="SignIn">
          {(props: any) => (
            <SignInScreen {...props} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>
        <Screen name="ForgotPassword">
          {(props: any) => (
            <ForgotPasswordScreen {...props} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>
        <Screen name="SetUser">
          {(props: any) => (
            <SetUsername {...props} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>
      </Group>
      <Group>
        <Screen name="Home">
          {(props: any) => (
            <HomeScreen
              {...props}
              user={{ user }}
              firestoreCtrl={firestoreCtrl}
            />
          )}
        </Screen>
        <Screen name="Camera">
          {(props: any) => <Camera {...props} firestoreCtrl={firestoreCtrl} />}
        </Screen>
        <Screen name="MaximizeScreen">
          {(props: any) => (
            <MaximizeScreen {...props} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>
        <Screen name="CreateChallenge">
          {(props: any) => (
            <CreateChallengeScreen {...props} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>
        <Screen name="MapScreen">
          {(props: any) => (
            <MapScreen {...props} firestoreCtrl={firestoreCtrl} />
          )}
        </Screen>
      </Group>
    </Navigator>
  );
};
