import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";
import HomeScreen from "@/src/views/home/home_screen";
import CreateGroupScreen from "@/src/views/group/CreateGroupScreen";
import GroupScreen from "@/src/views/group/GroupScreen";

const Stack = createNativeStackNavigator();


// Mock FirestoreCtrl
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      setProfilePicture: jest.fn((id, image_uri, setUser) => {
        setUser({
          ...mockTester,
          image_id: image_uri,
        });
      }),
      setName: jest.fn((id, name, setUser) => {
        setUser({
          ...mockTester,
          name: name,
        });
      }),
      getProfilePicture: jest.fn((id) => {
        return "uri";
      }),
      getChallengeDescription: jest.fn((id) => {
        return {
          title: "Challenge Title",
          description: "Challenge Description",
          endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
        };
      }),
      getKChallenges: jest.fn((id) => {
        return [];
      }),
      getGroupsByUserId: jest.fn((id) => {
        return [];
      }),
      getUser: jest.fn(() => {
        return mockTester;
      }),
      newGroup: jest.fn((group) => {
        mockFetchedGroups.push(group);
      }),
      addGroupToMemberGroups: jest.fn((id, group_name) => {
        mockTester.groups.push(group_name);
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

// Mock setUser consistency
const mockSetTester = jest.fn((user) => {
  mockTester = user;
});


// Create a test component to wrap HomeScreen with navigation
const HomeTest = ({ setUser }: { setUser: jest.Mock }) => {
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
        <Stack.Screen name="CreateGroup">
          {(props) => (
            <CreateGroupScreen
              {...props}
              firestoreCtrl={mockFirestoreCtrl}
              user={mockTester}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="GroupScreen">
            {(props) => (
                <GroupScreen
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
 * Test the flow of creating a group and navigating to it
 */
describe("Create a group and navigate to it", () => {

  it("Creates a group and navigates to it", async () => {
    // Render the test app
    const { getByTestId } = render(<HomeTest setUser={mockSetTester} />);

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

    // Simulate user pressing the create group button ("+")
    fireEvent.press(getByTestId("create-group-pressable-button"));

    // Wait for the navigation to CreateGroupScreen
    await waitFor(() => {
      expect(getByTestId("create-group-screen")).toBeTruthy();
    });
    // Make sure the location is authorized and the screen is ready to create a group
    expect(getByTestId("Create-Challenge-Text")).toBeTruthy();

    // Simulate user entering a group name
    fireEvent.changeText(getByTestId("group-name-input"), "TestGroup");
    // Simulate user entering a challenge title
    fireEvent.changeText(getByTestId("Description-Input"), "Challenge Description of Test Group");

    // Simulate user pressing the create group button
    const createPostButton = getByTestId("bottom-right-icon-arrow-forward");
    fireEvent.press(createPostButton);

    // Wait for the navigation to HomeScreen
    await waitFor(() => {
        expect(getByTestId("home-screen")).toBeTruthy();
      });

    // Verify the user was passed to ProfileScreen
    expect(mockUserConsistency).toEqual({
      uid: "123",
      email: "test@example.com",
      name: "TestUser",
      image_id: "uri",
      createdAt: expect.any(Date),
    });
  });
});
