import { DBChallenge, DBUser } from "@/firebase/FirestoreCtrl";

export type RootStackParamList = {
  Welcome: undefined;
  WelcomeFinal: undefined;
  Home: {
    user: DBUser;
  }
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  SetUser: undefined;
  Camera: undefined;
  SetUsername: undefined;
  Maximize: {
    challenge: DBChallenge;
    user: DBUser;
  }
  CreateChallenge: {
    picture_id: string;
  };
};
