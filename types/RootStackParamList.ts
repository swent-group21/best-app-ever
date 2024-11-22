import { DBChallenge, DBUser } from "@/firebase/FirestoreCtrl";

export type RootStackParamList = {
  WelcomeScreens: undefined;
  WelcomeFinalScreen: undefined;
  HomeScreen: {
    user: DBUser;
  }
  SignUp: undefined;
  SignInScreen: undefined;
  ForgotPasswordScreen: undefined;
  Camera: undefined;
  SetUsername: undefined;
  MaximizeScreen: {
    challenge: DBChallenge;
    user: DBUser;
  }
  CreateChallengeScreen: {
    picture_id: string;
  };
};
