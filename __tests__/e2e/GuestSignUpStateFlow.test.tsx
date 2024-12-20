import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DBUser,
  DBChallenge,
  DBChallengeDescription,
  DBGroup,
} from "@/src/models/firebase/TypeFirestoreCtrl";
import HomeScreen from "@/src/views/home/home_screen";
import { PermissionResponse } from "expo-camera";
import { ThemedView } from "@/src/views/components/theme/themed_view";
import { GeoPoint } from "firebase/firestore";
import Camera from "@/src/views/camera/camera_container";
import WelcomeScreens from "@/src/views/welcome/welcome_screen";
import WelcomeFinalScreen from "@/src/views/welcome/final_screen";
import SignUp from "@/src/views/auth/sign_up_screen";
import SetUsernameScreen from "@/src/views/auth/set_up_screen";



const Stack = createNativeStackNavigator();
jest.mock("@/src/models/firebase/GetFirestoreCtrl", () => ({
  getUser: jest.fn(() => {
    return mockTester;
  }),

  // Mock functions used in home screens
  getGroupsByUserId: jest.fn((id) => {
    return new Promise<DBGroup[]>((resolve) => {
      resolve(mockFetchedGroups);
    });
  }),
  getChallengeDescription: jest.fn((id) => {
    return mockCurrentChallenge;
  }),
  getPostsByChallengeTitle: jest.fn((title) => {
    return mockHomePosts;
  }),

  // Mock functions used in camera screen
  getImageUrl: jest.fn(() => {
    return "testUrl";
  }),
  getGroup: jest.fn((id) => {
    if (id === "new-group-id") return mockNewGroup;
  }),
}));

jest.mock("@/src/models/firebase/SetFirestoreCtrl", () => ({
  createUser: jest.fn((uid, user) => {
    mockTester = user
  }),

  // Mock functions used in camera screen
  uploadImage: jest.fn(() => {}),
  newChallenge: jest.fn((challenge) => {
    if (challenge.group_id === "new-group-id") {
      mockGroupPosts.push(challenge);
    } else mockHomePosts.push(challenge);
  }),
}));



// Mock GeoPoint constructor
jest.mock("firebase/firestore", () => ({
  GeoPoint: jest.fn((latitude, longitude) => {
    return { latitude, longitude };
  }),
}));

// Mock Camera used to post
jest.mock("expo-camera", () => ({
  Camera: jest.fn(() => {
    return {
      takePictureAsync: jest.fn(() => {
        return {
          uri: "testUri",
        };
      }),
    };
  }),
  useCameraPermissions: jest.fn(() => {
    const requestPermission = () => {
      console.log("request permission called");
      return Promise.resolve({ status: "granted" });
    };
    const permission: PermissionResponse = {
      canAskAgain: true,
      expires: null,
      granted: true,
      status: null,
    };
    return [permission, requestPermission];
  }),
  CameraCapturedPicture: jest.fn(() => {
    return {
      uri: "testUri",
    };
  }),
  CameraView: jest.fn(() => <ThemedView />),
}));

// Mock location permissions and current position
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" }),
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 46.5231352,
        longitude: 6.5647066,
      },
    }),
  ),
}));

jest.mock("@/src/models/firebase/Firebase", () => ({
    signInAnonymously: jest.fn(() =>
      Promise.resolve({
          user: {
              uid: "guest-tester-id"
          }
      })
    ),
    signUpWithEmail: jest.fn(() =>
      Promise.resolve({
          user: {
              uid: "123"
          }
      })
    ),
      
    //isValidEmail: jest.fn((email) => true),
  }));


// Mock posts for HomeScreen and GroupScreen
const mockHomePosts: DBChallenge[] = [
  {
    caption: "Home Challenge Test Caption",
    uid: "123",
    challenge_description: "Current Test Challenge Title",
  },
];
const mockGroupPosts: DBChallenge[] = [
  {
    caption: "Group Challenge Test Caption",
    uid: "123456",
    challenge_description: "",
  },
];

// Mock current challenge Title fetched from Firestore
const mockCurrentChallenge: DBChallengeDescription = {
  title: "Current Test Challenge Title",
  description: "test Challenge Description",
  endDate: new Date(2099, 1, 1, 0, 0, 0, 0),
};

// Mock groups used for the test
const mockGroup1: DBGroup = {
  gid: "test-group-1-id",
  name: "Group Test 1",
  members: ["456"],
  challengeTitle: "Current Group 1 Test Challenge",
  updateDate: new Date(),
  location: new GeoPoint(46.5186495, 10.5687462),
  radius: 32000,
};
// Mock groups fetched in HomeScreen
let mockFetchedGroups = [mockGroup1];
let mockNewGroup: DBGroup = undefined;


// Mock user Sign-in Sign-up
let mockTester: DBUser = {
    uid: "uid-test",
    email: "teset@example.com",
    name: "TesterUser",
    createdAt: new Date(),
  };
  // Mock setUser Sign-in Sign-up
  const mockSetTester = jest.fn((user) => {
    mockTester = user;
  });



// Create a test component to wrap HomeScreen with navigation
const SignUpNavigation = ({ setUser }: { setUser: jest.Mock }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome">
          {(props: any) => (
            <WelcomeScreens
              {...props}
              setUser={setUser}
              user={mockTester}
            />
          )} 
        </Stack.Screen>
        
        <Stack.Screen name="WelcomeFinal">
          {(props: any) => (
            <WelcomeFinalScreen
              {...props}
              setUser={setUser}
              user={mockTester}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              user={mockTester}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {(props: any) => (
            <SignUp
              {...props}
              setUser={setUser}
              user={mockTester}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SetUser">
          {(props: any) => (
            <SetUsernameScreen
              {...props}
              setUser={setUser}
              user={mockTester}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Camera">
          {(props: any) => (
            <Camera
              {...props}
              user={mockTester}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 * Test the flow trying the app as a guest, then signUp and post a challenge
 */
describe("Guest User sign up and post", () => {
  it("Guest User signs up and post", async () => {

    // Render the test app
    const { getByTestId } = render(<SignUpNavigation setUser={mockSetTester} />);

    // Verify the user is rightly passed
    expect(mockTester).toEqual({
        uid: "uid-test",
        email: "tester@example.com",
        name: "TesterUser",
        createdAt: expect.any(Date),
    });

    // Verify the WelcomeScreens are diplayed
    expect(getByTestId("welcome-scrollview")).toBeTruthy();

    // Verify the last WelcomeScreenFinal is displayed
    expect(getByTestId("welcome-final-screen")).toBeTruthy();

    // Simulate user pressing the continue as guest button
    fireEvent.press(getByTestId("continue-as-guest-button"));

    // Wait for the navigation to CreateGroupScreen
    await waitFor(() => {
      expect(getByTestId("home-screen")).toBeTruthy();
    });

    // Verify the user was passed to HomeScreen and set by continue as guest
    expect(mockTester).toEqual({
        uid: "guest-tester-id",
        email: "",
        name: "Guest",
        createdAt: expect.any(Date),
    });

    // Simulate a press on the profile icon
    fireEvent.press(getByTestId("topRightIcon-person-circle-outline"));

    // Make sure the guest popUp is displayed
    await waitFor(() => {
      expect(getByTestId("guest-pop-up-id")).toBeTruthy();
    });

    // Simulate a press on the SignUp from guest button
    fireEvent.press(getByTestId("guest-sign-up-id"));




    // Wait for the navigation to WelcomeFinalScreen
    await waitFor(() => {
      expect(getByTestId("welcome-final-screen")).toBeTruthy();
    });

    // Simulate a press on the SignUp button
    fireEvent.press(getByTestId("sign-up-button"));

    // Wait for the navigation to SignUpScreen
    await waitFor(() => {
      expect(getByTestId("sign-up-screen")).toBeTruthy();
    });

    // Simulate user filling the sign up form
    fireEvent.changeText(getByTestId("name-input"), "Test");
    fireEvent.changeText(getByTestId("surname-input"), "User");
    fireEvent.changeText(getByTestId("email-input"), "tester@verified.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "password123");
    
    // Simulate user pressing the sign up button
    fireEvent.press(getByTestId("sign-up-button"));

    // Wait for the navigation to HomeScreen
    await waitFor(() => {
      expect(getByTestId("set-up-screen")).toBeTruthy();
    });


    // Simulate user interactions
    fireEvent.changeText(getByTestId("usernameInput"), "TesterBoss");

    // Simulate user pressing the arrow forward button
    fireEvent.press(getByTestId("bottom-right-icon-arrow-forward"));

    // Wait for the navigation to HomeScreen
    await waitFor(() => {
      expect(getByTestId("home-screen")).toBeTruthy();
    });


    // Verify the user was passed to HomeScreen and set by continue as guest
    expect(mockTester).toEqual({
      uid: "guest-tester-id",
      email: "tester@verified.com",
      name: "TesterBoss",
      createdAt: expect.any(Date),
    });






    // Simulate user pressing the camera button
    fireEvent.press(getByTestId("bottom-center-icon-camera-outline"));

    // Wait for the navigation to CameraScreen
    await waitFor(() => {
      expect(getByTestId("camera-screen")).toBeTruthy();
    });

    // Make sure the location is authorized and camera is enabled at first
    await waitFor(() => {
      expect(getByTestId("camera-container")).toBeTruthy();
    });

    // Simulate user pressing the camera button to take a picture
    fireEvent.press(getByTestId("Camera-Button"));

    // Wait for isCameraEnabled to be set to false
    await act(async () => {
      await Promise.resolve();
    });

    // Verify the camera is disabled and the preview is displayed
    expect(getByTestId("camera-preview")).toBeTruthy();

    // Simulate user changing the caption
    fireEvent.changeText(
      getByTestId("Caption-Input"),
      "Test Challenge Caption",
    );

    // Simulate user pressing the submit button
    fireEvent.press(getByTestId("Submit-Button"));

    // Wait for the navigation to HomeScreen
    await waitFor(() => {
      expect(getByTestId("home-screen")).toBeTruthy();
    });

    // Wait for the new challenge to be fetched
    await act(async () => {
      await Promise.resolve();
    });

    // Verify the new challenge was posted
    expect(getByTestId("challenge-id-Test Challenge Caption")).toBeTruthy();
  });
});