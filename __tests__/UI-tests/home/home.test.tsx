import React from "react";
import { Text } from "react-native";
import { render, waitFor, screen } from "@testing-library/react-native";
import HomeScreen from "@/app/screens/home/home_screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl, {
  DBChallenge,
  DBGroup,
  DBChallengeDescription,
} from "@/firebase/FirestoreCtrl";

const Stack = createNativeStackNavigator();

// Mock data for challenges
const mockChallenges: DBChallenge[] = [
  {
    challenge_id: "1",
    challenge_name: "Challenge 1",
    description: "Description 1",
    uid: "12345",
    date: new Date(),
    location: null,
  },
  {
    challenge_id: "2",
    challenge_name: "Challenge 2",
    description: "Description 2",
    uid: "12345",
    date: new Date(),
    location: null,
  },
];

const mockGroups: DBGroup[] = [
  {
    group_id: "1",
    group_name: "Group 1",
    description: "Description 1",
    members: ["12345"],
    creationDate: new Date(),
  },
  {
    group_id: "2",
    group_name: "Group 2",
    description: "Description 2",
    members: ["12345"],
    creationDate: new Date(),
  },
];

const mockChallengeDescription: DBChallengeDescription = {
  title: "Challenge Title",
  description: "Challenge Description",
  endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
};

// Mock getChallengesByUserId method
jest.mock("@/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getChallengesByUserId: jest.fn(() => {
        return mockChallenges;
      }),
      getGroupsByUserId: jest.fn(() => {
        return Promise.resolve(mockGroups);
      }),
      getChallengeDescription: jest.fn(() => {
        return mockChallengeDescription;
      }),
      getKChallenges: jest.fn(() => {
        return mockChallenges;
      }),
      getUser: jest.fn(() => {
        return mockUser;
      }),
      getLikesOf: jest.fn(() => {
        return Promise.resolve(["12345"]);
      }),
    };
  });
});
const mockFirestoreCtrl = new FirestoreCtrl();

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
  // Reset mock data before each test
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders default text", async () => {
    render(<HomeScreenTest />);

    await waitFor(async () => {
      expect(screen.getByText("No challenge to display")).toBeTruthy();
    });
  });

  it("renders challenges fetched from Firestore", async () => {
    render(<HomeScreenTest />);

    // Await individual findBy* methods
    const challenge1 = await screen.findByTestId("challenge-id-0");
    const challenge2 = await screen.findByTestId("challenge-id-1");

    expect(challenge1).toBeTruthy();
    expect(challenge2).toBeTruthy();
  });

  it("renders description fetched from Firestore", async () => {
    render(<HomeScreenTest />);

    // Await the findByTestId for the description
    const description = screen.findByTestId("description-id");

    expect(description).toBeTruthy();
  });
});
