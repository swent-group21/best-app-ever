import React from "react";
import { Text } from "react-native";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import HomeScreen from "@/app/screens/home/home_screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import { DBChallenge } from "@/firebase/FirestoreCtrl";

const Stack = createNativeStackNavigator();

const mockFirestoreCtrl = new FirestoreCtrl();

// Mock data for challenges
const mockChallenges: DBChallenge[] = [
  {
    challenge_id: "1",
    challenge_name: "Challenge 1",
    description: "Description 1",
    uid: "12345",
    date: new Date(),
  },
  {
    challenge_id: "2",
    challenge_name: "Challenge 2",
    description: "Description 2",
    uid: "12345",
    date: new Date(),
  },
];

// Mock getChallengesByUserId method
mockFirestoreCtrl.getChallengesByUserId = jest
  .fn()
  .mockResolvedValue(mockChallenges);

//Mock User
const mockUser = {
  uid: "12345",
  email: "test@example.com",
  name: "Test User",
  createdAt: new Date(),
};

// Create a test component to wrap HomeScreen with navigation
const HomeScreenTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          initialParams={{ user: { uid: "12345" } }} // Add this line
        >
          {(props) => (
            <HomeScreen
              {...props}
              user={mockUser}
              firestoreCtrl={mockFirestoreCtrl}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Camera">
          {() => <Text testID="camera-screen">Camera Screen</Text>}
        </Stack.Screen>
        {/* Add other screens if necessary */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("HomeScreen", () => {
  it("renders challenges fetched from Firestore", async () => {
    const { getByTestId } = render(<HomeScreenTest />);

    // Wait for the challenges to be fetched and rendered
    await waitFor(() => {
      expect(getByTestId("challenge-id-0")).toBeTruthy();
      expect(getByTestId("challenge-id-1")).toBeTruthy();
    });
  });
});
