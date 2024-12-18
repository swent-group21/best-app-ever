import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl, {
  DBUser,
  DBChallenge,
  DBChallengeDescription,
  DBGroup,
} from "@/src/models/firebase/FirestoreCtrl";
import HomeScreen from "@/src/views/home/home_screen";
import FriendsScreen from "@/src/views/friends/friends_screen";

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

      // Mock functions used in home screen
      getGroupsByUserId: jest.fn((id) => {
        if (id === "123") {
          return new Promise<DBGroup[]>((resolve) => {
            resolve([mockTesterGroup]);
          });
        } else if (id === "456") {
          return new Promise<DBGroup[]>((resolve) => {
            resolve([mockTesterFriendGroup]);
          });
        }
        }),
      getChallengeDescription: jest.fn((id) => {
        return mockCurrentChallenge;
      }),
      getPostsByChallengeTitle: jest.fn((title) => {
        return [mockPostTesterFriend];
      }),

      getAllUsers: jest.fn(() => {
        return [mockTester, mockTesterFriend];
      }),
      addFriend: jest.fn((uid, friendUid) => {
        if (uid === "123" && friendUid === "456") {
            mockTester.friends.push(friendUid);
        } else if (uid === "456" && friendUid === "123") {
            mockTesterFriend.friends.push(friendUid);
        }
      }),
    };
  });
});
const mockFirestoreCtrl = new FirestoreCtrl();

// Mock groups fetched in HomeScreen
let mockFetchedGroups = [];

// Mock users testing
let mockTester: DBUser = {
  uid: "123",
  email: "tester@example.com",
  name: "TesterUser",
  image_id: "uri",
  createdAt: new Date(),
  friends: [],
};
let mockTesterFriend: DBUser = {
    uid: "456",
    email: "friend@example.com",
    name: "TesterFriend",
    image_id: "uri",
    createdAt: new Date(),
    friends: [],
};

// Mock posts for HomeScreen for users
let mockTesterGroup: DBGroup = {
    name: "TesterGroup",
    challengeTitle: "TesterGroupChallenge",
    members: ["123"],
    updateDate: new Date(),
    location: null,
    radius: 0,
};
let mockTesterFriendGroup: DBGroup = {
    name: "FriendGroup",
    challengeTitle: "TesterFriendGroupChallenge",
    members: ["456"],
    updateDate: new Date(),
    location: null,
    radius: 0,
};

// Mock post for HomeScreen 
const mockPostTesterFriend: DBChallenge = {
    caption: "Home Challenge Test Caption",
    uid: "456",
    challenge_description: "Current Test Challenge Title",
};

// Mock current challenge for HomeScreen
const mockCurrentChallenge: DBChallengeDescription = {
  title: "Current Test Challenge Title",
  description: "test Challenge Description",
  endDate: new Date(2099, 1, 1, 0, 0, 0, 0),
};




// Create a test component to wrap HomeScreen with navigation
// to simulate the navigation of the TesterUser
const HomeTester = () => {
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
        <Stack.Screen name="Friends">
          {(props) => (
            <FriendsScreen
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

// Create a test component to wrap HomeScreen with navigation
// to simulate the navigation of the Friend
const HomeFriend = () => {
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
                user={mockTesterFriend}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Friends">
            {(props) => (
              <FriendsScreen
                {...props}
                firestoreCtrl={mockFirestoreCtrl}
                user={mockTesterFriend}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };



/**
 * Test the flow of sending a friend request and commenting a friend's post
 */
describe("Send a friend request that is accepted and comment a friend's post", () => {

  it("Sends a friend request that is accepted and comments a friend's post", async () => {
    // Render the test app for the tester user
    const testerNavigation = render(<HomeTester />);

    // Verify the user was passed to HomeScreen by the navigation stack
    expect(mockTester).toEqual({
        uid: "123",
        email: "tester@example.com",
        name: "TesterUser",
        image_id: "uri",
        createdAt: new Date(),
        groups: [],
    });

    // Verify the HomeScreen is diplayed
    expect(testerNavigation.getByTestId("home-screen")).toBeTruthy();

    // Simulate user pressing the friends button
    fireEvent.press(testerNavigation.getByTestId("topLeftIcon-people-outline"));

    // Wait for the navigation to FriendsScreen
    await waitFor(() => {
      expect(testerNavigation.getByTestId("friendsScreen")).toBeTruthy();
    });


    // Simulate user searching for a friend in the search bar
    fireEvent.changeText(testerNavigation.getByTestId("search-bar-input"), "TesterFriend");

    // Wait for the search results to display
    await waitFor(() => {
      expect(testerNavigation.getByTestId("search-results")).toBeTruthy();
    });

    // Simulate user adding the friend
    fireEvent.press(testerNavigation.getByTestId("add-button-TesterFriend"));






    // Render the test app for the friend user
    const friendNavigation = render(<HomeFriend />);

    // Verify the user was passed to HomeScreen by the navigation stack
    expect(mockTesterFriend).toEqual({
        uid: "456",
        email: "friend@example.com",
        name: "TesterFriend",
        image_id: "uri",
        createdAt: new Date(),
        friends: [],
    });

    // Verify the HomeScreen is diplayed
    expect(friendNavigation.getByTestId("home-screen")).toBeTruthy();

    // Simulate friend user pressing the friends button
    fireEvent.press(friendNavigation.getByTestId("topLeftIcon-people-outline"));

    // Wait for the navigation to FriendsScreen
    await waitFor(() => {
      expect(friendNavigation.getByTestId("friendsScreen")).toBeTruthy();
    });

    // Simulate user searching for a friend in the search bar
    fireEvent.changeText(friendNavigation.getByTestId("search-bar-input"), "TesterUser");

    // Wait for the search results to display
    await waitFor(() => {
      expect(friendNavigation.getByTestId("search-results")).toBeTruthy();
    });

    // Simulate user adding the friend
    fireEvent.press(friendNavigation.getByTestId("handle-button-TesterUser"));




    // Simulate user pressing the create group button
    const createPostButton = getByTestId("bottom-right-icon-arrow-forward");
    fireEvent.press(createPostButton);

    // Wait for the navigation to HomeScreen
    await waitFor(() => {
      expect(getByTestId("home-screen")).toBeTruthy();
    });

    // Wait for the new group to be displayed
    await waitFor(() => {
      expect(getByTestId("group-id-TestGroup")).toBeTruthy();
    });

    // Simulate user pressing the new group button
    fireEvent.press(getByTestId("group-pressable-button-TestGroup"));

    // Wait for the navigation to GroupScreen
    await waitFor(() => {
      expect(getByTestId("group-screen")).toBeTruthy();
    });

    // Verify it is the right group
    expect(getByTestId("description-id-TestGroup")).toBeTruthy();
  });
});