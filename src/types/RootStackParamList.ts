import { DBChallenge, DBUser } from "@/src/firebase/FirestoreCtrl";

export type RootStackParamList = {
  Welcome: undefined;
  WelcomeFinal: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  SetUser: undefined;
  Home: undefined;
  Camera: undefined;
  SetUsername: undefined;
  Maximize: {
    challenge: DBChallenge;
  };
  CreateChallenge: {
    picture_id: string;
  };
  Profile: undefined;
  MapScreen: undefined;
};
