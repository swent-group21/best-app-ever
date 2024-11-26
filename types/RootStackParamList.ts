import { DBChallenge } from "@/firebase/FirestoreCtrl";

export type RootStackParamList = {
  WelcomeScreens: undefined;
  WelcomeFinalScreen: undefined;
  HomeScreen: undefined;
  SignUp: undefined;
  SignInScreen: undefined;
  ForgotPasswordScreen: undefined;
  Camera: undefined;
  SetUsername: undefined;
  MaximizeScreen: {
    challenge: DBChallenge;
  };
  CreateChallengeScreen: {
    picture_id: string;
  };
  MapScreen: undefined;
};
