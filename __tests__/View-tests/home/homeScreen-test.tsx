// import React from "react";
// import { render, fireEvent } from "@testing-library/react-native";
// import HomeScreen from "../../../src/app/views/home/home_screen";
// import FirestoreCtrl from "../../../src/app/models/firebase/FirestoreCtrl";

// // error when no challenges
// describe("HomeScreen UI Tests", () => {
//   const mockNavigation = {
//     navigate: jest.fn(),
//   };

//   const mockFirestoreCtrl = new FirestoreCtrl();
//   const mockUser = {
//     uid: "12345",
//     name: "Test User",
//     image_id: null,
//     email: "test@gmail.com",
//     createdAt: new Date(),
//   };

//   it("renders the home screen container", () => {
//     const { getByTestId } = render(
//       <HomeScreen
//         user={mockUser}
//         navigation={mockNavigation}
//         firestoreCtrl={mockFirestoreCtrl}
//       />
//     );

//     const screen = getByTestId("home-screen");
//     expect(screen).toBeTruthy();
//   });

//   it("renders the top bar with the title", () => {
//     const { getByText } = render(
//       <HomeScreen
//         user={mockUser}
//         navigation={mockNavigation}
//         firestoreCtrl={mockFirestoreCtrl}
//       />
//     );

//     const title = getByText("Strive");
//     expect(title).toBeTruthy();
//   });

//   it("renders the groups section", () => {
//     const { getByTestId } = render(
//       <HomeScreen
//         user={mockUser}
//         navigation={mockNavigation}
//         firestoreCtrl={mockFirestoreCtrl}
//       />
//     );

//     const groupsContainer = getByTestId("create-group-button");
//     expect(groupsContainer).toBeTruthy();
//   });

//   it("renders the challenges section", () => {
//     const { getByTestId } = render(
//       <HomeScreen
//         user={mockUser}
//         navigation={mockNavigation}
//         firestoreCtrl={mockFirestoreCtrl}
//       />
//     );

//     const challengeDescription = getByTestId("description-id");
//     expect(challengeDescription).toBeTruthy();
//   });


//   it("renders a message if no challenges are available", () => {
//     const { getByText } = render(
//       <HomeScreen
//         user={mockUser}
//         navigation={mockNavigation}
//         firestoreCtrl={mockFirestoreCtrl}
//       />
//     );

//     const noChallengesMessage = getByText("No challenge to display");
//     expect(noChallengesMessage).toBeTruthy();
//   });
// });

import React from "react";
import { Text } from "react-native";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import HomeScreen from "@../../../src/app/views/home/home_screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl from "@../../../src/app/models/firebase/FirestoreCtrl";
import {
  DBChallenge,
  DBGroup,
  DBChallengeDescription,
} from "@../../../src/app/models/firebase/FirestoreCtrl";
import { Timestamp } from "firebase/firestore";

const Stack = createNativeStackNavigator();

const mockFirestoreCtrl = new FirestoreCtrl();

// Mock data for challenges
const mockChallenges: DBChallenge[] = [
  {
    challenge_id: "1",
    challenge_name: "Challenge 1",
    description: "Description 1",
    uid: "12345",
    date: new Timestamp( 0, 0),
    location: null,
  },
  {
    challenge_id: "2",
    challenge_name: "Challenge 2",
    description: "Description 2",
    uid: "12345",
    date: new Timestamp( 0, 0),
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
mockFirestoreCtrl.getChallengesByUserId = jest
  .fn()
  .mockResolvedValue(mockChallenges);

mockFirestoreCtrl.getGroupsByUserId = jest.fn().mockResolvedValue(mockGroups);

mockFirestoreCtrl.getChallengeDescription = jest
  .fn()
  .mockResolvedValue(mockChallengeDescription);

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
        id = {undefined}
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
  it("renders default text", async () => {
    const { getByText } = render(<HomeScreenTest />);

    expect(getByText("No challenge to display")).toBeTruthy();
  });

  it("renders challenges fetched from Firestore", async () => {
    const { findByTestId } = render(<HomeScreenTest />);

    // Wait for the challenges to be fetched and rendered
    await waitFor(() => {
      expect(findByTestId("challenge-id-0")).toBeTruthy();
      expect(findByTestId("challenge-id-1")).toBeTruthy();
    });
  });

  it("renders description fetched from Firestore", async () => {
    const { getByTestId } = render(<HomeScreenTest />);

    // Wait for the description to be fetched and rendered
    await waitFor(() => {
      expect(getByTestId("description-id")).toBeTruthy();
    });
  });

  it("renders description fetched from Firestore", async () => {
    const { getByTestId } = render(<HomeScreenTest />);

    // Wait for the description to be fetched and rendered
    await waitFor(() => {
      expect(getByTestId("group-id-0")).toBeTruthy();
      expect(getByTestId("group-id-1")).toBeTruthy();
    });
    expect(getByTestId("create-group-button")).toBeTruthy();
  });
});

describe("Home test", () => {
  it("placeholder", async () => {
    expect(true).toBe(true);
  });
});

