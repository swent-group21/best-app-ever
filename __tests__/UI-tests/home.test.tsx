import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
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
mockFirestoreCtrl.getChallengesByUserId = jest.fn().mockResolvedValue(mockChallenges);

// Create a test component to wrap HomeScreen with navigation
const HomeScreenTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} firestoreCtrl={mockFirestoreCtrl} />
          )}
        </Stack.Screen>
        {/* Add other screens if necessary */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("HomeScreen", () => {
  it("renders challenges fetched from Firestore", async () => {
    const { getByText } = render(<HomeScreenTest />);

    // Wait for the challenges to be fetched and rendered
    await waitFor(() => {
      expect(getByText("Challenge 1")).toBeTruthy();
      expect(getByText("Challenge 2")).toBeTruthy();
    });
  });

  it("navigates to Camera screen when center icon is pressed", () => {
    const navigateMock = jest.fn();
    jest.spyOn(require("@react-navigation/native"), "useNavigation").mockReturnValue({
      navigate: navigateMock,
    });

    const { getByTestId } = render(<HomeScreenTest />);

    const cameraIcon = getByTestId("center-icon");
    fireEvent.press(cameraIcon);

    expect(navigateMock).toHaveBeenCalledWith("Camera");
  });
});
