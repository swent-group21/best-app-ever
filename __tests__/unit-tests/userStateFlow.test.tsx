import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignInScreen from "@/app/screens/auth/sign_in_screen";
import HomeScreen from "@/app/screens/home/home_screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { logInWithEmail } from "@/types/Auth";

const Stack = createNativeStackNavigator();

// Mock FirestoreCtrl object
const mockFirestoreCtrl = {
  createUser: jest.fn(),
  getUser: jest.fn(),
  uploadImageFromUri: jest.fn(),
  getImageUrl: jest.fn(),
  getName: jest.fn(),
  setName: jest.fn(),
  getProfilePicture: jest.fn(),
  setProfilePicture: jest.fn(),
  newChallenge: jest.fn(),
  getChallenge: jest.fn(),
  getChallengesByUserId: jest.fn(),
  getKChallenges: jest.fn(),
};

// Mock user data
const mockUser = {
  uid: "12345",
  email: "test@example.com",
  displayName: "Test User",
  name: "Test User",
  createdAt: new Date(),
};

// Mock logInWithEmail function
jest.mock("@/types/Auth", () => ({
  logInWithEmail: jest.fn(),
}));

// Create a test component to wrap SignInScreen and HomeScreen with navigation
const AppTest = ({ setUser }: { setUser: jest.Mock }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn">
          {(props) => (
            <SignInScreen
              {...props}
              firestoreCtrl={mockFirestoreCtrl}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} firestoreCtrl={mockFirestoreCtrl} user={mockUser} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("SignInScreen Tests", () => {
  it("authenticates and passes the user to HomeScreen", async () => {
    // Mock resolved value for logInWithEmail
    (logInWithEmail as jest.Mock).mockResolvedValueOnce(mockUser);

    // Mock setUser
    const mockSetUser = jest.fn();

    // Render the test app
    const { getByTestId, getByText } = render(<AppTest setUser={mockSetUser} />);

    // Simulate user interactions
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.press(getByTestId("sign-in-button"));

    // Wait for navigation to HomeScreen
    await waitFor(() => {
      expect(getByTestId("home-screen")).toBeTruthy(); // Verify HomeScreen renders
    });

    // Verify logInWithEmail was called correctly
    expect(logInWithEmail).toHaveBeenCalledWith("test@example.com", "password123");

    // Verify setUser was called with the correct user data
    expect(mockSetUser).toHaveBeenCalledWith(mockUser);

    // Verify the user is displayed correctly on HomeScreen
    expect(getByTestId("user-email").props.children).toBe("test@example.com");
    expect(getByTestId("user-displayName").props.children).toBe("Test User");
  });
});