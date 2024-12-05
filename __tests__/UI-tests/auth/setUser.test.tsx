// set_up_screen.test.tsx
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import SetUsername from "@/app/screens/auth/set_up_screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import HomeScreen from "@/app/screens/home/home_screen";

const Stack = createNativeStackNavigator();

// Mock FirestoreCtrl
jest.mock("@/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getChallengeDescription: jest.fn().mockResolvedValueOnce({
        title: "Challenge Title",
        description: "Challenge Description",
        endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
      }),
      // Add any other methods as needed
    };
  });
});
const mockFirestoreCtrl = new FirestoreCtrl();

// Mock ImagePicker
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(async () => ({
    cancelled: false,
    uri: "mock-image-uri",
  })),
  MediaTypeOptions: {
    Images: "Images",
  },
}));

// Mock User
const mockUser = {
  uid: "",
  email: "",
  name: "",
  image_id: "",
  createdAt: new Date(),
};

// Create a test component to wrap SetUsername with navigation
const SetUsernameTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SetUser"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SetUser">
          {(props) => (
            <SetUsername
              {...props}
              firestoreCtrl={mockFirestoreCtrl}
              setUser={jest.fn()}
              user={mockUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              firestoreCtrl={mockFirestoreCtrl}
              user={mockUser}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("SetUsernameScreen", () => {
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("should render all UI components", async () => {
    render(<SetUsernameTest />);

    // Verify static texts
    expect(screen.getByText("Set up your profile")).toBeDefined();
    expect(screen.getByText("What will we see of you ?")).toBeDefined();

    // Verify input and buttons
    expect(screen.getByTestId("usernameInput")).toBeDefined();
    expect(screen.getByTestId("profilePicButton")).toBeDefined();
    expect(screen.getByTestId("bottom-right-icon-arrow-forward")).toBeDefined();
  });

  it("should allow the user to enter a username", async () => {
    render(<SetUsernameTest />);

    const usernameInput = screen.getByTestId("usernameInput");
    fireEvent.changeText(usernameInput, "newUsername");

    await waitFor(() => {
      expect(screen.getByDisplayValue("newUsername")).toBeDefined();
    });
  });

  it("should allow the user to pick an image", async () => {
    const mockLaunchImageLibraryAsync = jest.spyOn(
      require("expo-image-picker"),
      "launchImageLibraryAsync",
    );
    mockLaunchImageLibraryAsync.mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: "mockImageUri" }],
    });

    render(<SetUsernameTest />);
    const profilePicButton = screen.getByTestId("profilePicButton");

    fireEvent.press(profilePicButton);

    await waitFor(() => {
      expect(screen.getByTestId("profilePicImage")).toBeDefined();
      expect(screen.getByTestId("profilePicImage").props.source.uri).toBe(
        "mockImageUri",
      );
    });
  });

  it("should alert if username is not entered on upload", async () => {
    const alertMock = jest.fn();
    window.alert = alertMock; // Mock window.alert

    render(<SetUsernameTest />);
    const bottomBarIcon = screen.getByTestId("bottom-right-icon-arrow-forward");

    fireEvent.press(bottomBarIcon);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Please enter a username.");
    });
  });

  it("should call FirestoreCtrl methods when uploading profile", async () => {
    mockFirestoreCtrl.setName = jest.fn().mockResolvedValueOnce(null);
    mockFirestoreCtrl.setProfilePicture = jest.fn().mockResolvedValueOnce(null);
    mockFirestoreCtrl.getChallengeDescription = jest
      .fn()
      .mockResolvedValueOnce({
        title: "Challenge Title",
        description: "Challenge Description",
        endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
      });

    render(<SetUsernameTest />);
    const usernameInput = screen.getByTestId("usernameInput");
    const bottomBarIcon = screen.getByTestId("bottom-right-icon-arrow-forward");

    fireEvent.changeText(usernameInput, "testUsername");
    fireEvent.press(bottomBarIcon);

    await waitFor(() => {
      expect(mockFirestoreCtrl.setName).toHaveBeenCalledWith(
        "",
        "testUsername",
        expect.any(Function),
      );
      expect(mockFirestoreCtrl.setProfilePicture).not.toHaveBeenCalled();
    });
  });

  it("should navigate to Home after successful upload", async () => {
    mockFirestoreCtrl.setName = jest.fn().mockResolvedValueOnce(null);
    mockFirestoreCtrl.setProfilePicture = jest.fn().mockResolvedValueOnce(null);
    mockFirestoreCtrl.getChallengeDescription = jest
      .fn()
      .mockResolvedValueOnce({
        title: "Challenge Title",
        description: "Challenge Description",
        endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
      });

    render(<SetUsernameTest />);

    // Simulate user interactions
    fireEvent.changeText(screen.getByTestId("usernameInput"), "TestUser2");
    fireEvent.press(screen.getByTestId("bottom-right-icon-arrow-forward"));

    // Wait for the navigation to HomeScreen
    await waitFor(() => {
      expect(screen.getByTestId("home-screen")).toBeTruthy();
    });
  });
});
