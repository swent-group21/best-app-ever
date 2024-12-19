import React, { useRef } from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl, {
  DBUser,
  DBChallenge,
  DBChallengeDescription,
  DBGroup,
} from "@/src/models/firebase/FirestoreCtrl";
import HomeScreen from "@/src/views/home/home_screen";
import MaximizeScreen from "@/src/views/home/maximize_screen";
import Camera from "@/src/views/camera/CameraContainer";
import { createPermissionHook, PermissionResponse } from "expo-modules-core";
import { CameraView } from "expo-camera";
import { ThemedView } from "@/src/views/components/theme/themed_view";

const Stack = createNativeStackNavigator();

// Mock FirestoreCtrl
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUser: jest.fn(() => {
        return mockTester;
      }),

      // Mock functions used in group creation
      newGroup: jest.fn((group) => {
        mockFetchedGroups.push(group);
      }),
      addGroupToMemberGroups: jest.fn((id, group_name) => {
        mockTester.groups.push(group_name);
      }),

      // Mock functions used in home and group screens
      getGroupsByUserId: jest.fn((id) => {
        return new Promise<DBGroup[]>((resolve) => {
          resolve(mockFetchedGroups);
        });
      }),

      getAllPostsOfGroup: jest.fn((id) => {
        return mockGroupPosts;
      }),
      getChallengeDescription: jest.fn((id) => {
        return mockCurrentChallenge;
      }),
      getPostsByChallengeTitle: jest.fn((title) => {
        return new Promise<DBChallenge[]>((resolve) => {
            resolve(mockHomePosts);
        });
      }),


      uploadImage: jest.fn(() => {}),
      getImageUrl: jest.fn(() => {
        return "testUrl";
      }),

      newChallenge: jest.fn((challenge) => {
        mockHomePosts.push(challenge);
      }),
    };
  });
});
const mockFirestoreCtrl = new FirestoreCtrl();

// Mock groups fetched in HomeScreen
let mockFetchedGroups = [];

// Mock user testing
let mockTester: DBUser = {
  uid: "123",
  email: "test@example.com",
  name: "TestUser",
  image_id: "uri",
  createdAt: new Date(),
  groups: [],
};


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

const mockCurrentChallenge: DBChallengeDescription = {
  title: "Current Test Challenge Title",
  description: "test Challenge Description",
  endDate: new Date(2099, 1, 1, 0, 0, 0, 0),
};

// Mock location permissions and current position
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" }),
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 0,
        longitude: 0,
      },
    }),
  ),
}));

jest.mock("firebase/firestore", () => ({
  GeoPoint: jest.fn((latitude, longitude) => {
    return { latitude, longitude };
  }),
}));

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
                console.log('request permission called')
                return Promise.resolve({ status: 'granted' })
            }

            const permission: PermissionResponse = {
                canAskAgain:true,
                expires: null,
                granted: true,
                status: null
            }

            return [
                permission,
                requestPermission
            ]
        }),

        CameraCapturedPicture: jest.fn(() => {
            return {
                uri: "testUri",
            };
        }),

        CameraView: jest.fn(() => 
            <ThemedView/>
        )
    
}));


// Create a test component to wrap HomeScreen with navigation
const HomeTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              firestoreCtrl={mockFirestoreCtrl}
              user={mockTester}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Camera">
          {(props: any) => (
            <Camera 
              {...props} 
              firestoreCtrl={mockFirestoreCtrl} 
              user={mockTester} 
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Maximize">
          {(props) => (
            <MaximizeScreen
              {...props}
              firestoreCtrl={mockFirestoreCtrl}
              user={mockTester}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 * Test the flow of posting a challenge
 */
describe("Post a challenge and render it in home screen", () => {


  it("Posts a challenge and renders it in home screen", async () => {

    // Render the test app
    const { getByTestId } = render(<HomeTest />);

    // Verify the user was passed to HomeScreen by the navigation stack
    expect(mockTester).toEqual({
      uid: "123",
      email: "test@example.com",
      name: "TestUser",
      image_id: "uri",
      createdAt: expect.any(Date),
      groups: [],
    });

    // Verify the HomeScreen is diplayed
    expect(getByTestId("home-screen")).toBeTruthy();

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
    fireEvent.changeText(getByTestId("Caption-Input"), "Test Challenge Caption");


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
    expect(getByTestId("challenge-id-1")).toBeTruthy();
    expect(getByTestId("caption-id-Test Challenge Caption")).toBeTruthy();
  });
});