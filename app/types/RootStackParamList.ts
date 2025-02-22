import {
  DBChallenge,
  DBGroup,
  DBUser,
} from "@/src/models/firebase/TypeFirestoreCtrl";

/*
 * RootStackParamList defines the types for the navigation stack
 */
export type RootStackParamList = {
  Welcome: undefined;
  WelcomeFinal: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  SetUser: undefined;
  Home: undefined;
  Camera: {
    group_id: string;
  };
  SetUsername: undefined;
  Friends: undefined;
  Maximize: {
    challenge: DBChallenge;
  };
  Profile: undefined;
  MapScreen: undefined;
  GroupScreen: {
    currentGroup: DBGroup;
  };
  CreateGroup: undefined;
  Memories: {
    user: DBUser;
  };
  JoinGroup: undefined;
};
