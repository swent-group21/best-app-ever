import React from "react";
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import MaximizeScreen from "@/app/screens/home/maximize_screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

// Mock the FirestoreCtrl methods used in MaximizeScreen
jest.mock("@/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUser: jest.fn().mockResolvedValue({
        uid: "12345",
        name: "Test User",
        email: "test@example.com",
      }),
      // Add any other methods as needed
    };
  });
});

const mockFirestoreCtrl = new FirestoreCtrl();

// Mock the user object
const mockUser = {
  uid: "12345",
  name: "Test User",
  email: "test@example.com",
  createdAt: new Date(),
};

// Create a stack navigator for testing
const Stack = createNativeStackNavigator();

// Wrap MaximizeScreen with NavigationContainer and Stack.Navigator
const MaximizeScreenTest = () => {
  const route = {
    params: {
      user: {
        uid: "12345",
        name: "Test User",
        email: "test@example.com",
      },
      challenge: {},
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MaximizeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MaximizeScreen">
          {(props) => (
            <MaximizeScreen
              {...props}
              user={mockUser}
              route={route}
              firestoreCtrl={mockFirestoreCtrl}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("MaximizeScreen", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = render(<MaximizeScreenTest />);

    // Check if the user name is displayed
    expect(getByText("Test User")).toBeTruthy();

    // Check if the image is rendered
    expect(getByTestId("max-image")).toBeTruthy();

    // Check if the like button is rendered
    expect(getByTestId("like-button")).toBeTruthy();

    // Check if the comment input is rendered
    expect(getByTestId("comment-input")).toBeTruthy();

    // Check if the send button is rendered
    expect(getByTestId("send-button")).toBeTruthy();
  });

  it("allows liking the image", async () => {
    const { getByTestId } = render(<MaximizeScreenTest />);

    // Wait for the component to finish rendering
    await waitFor(() => getByTestId("like-button"));

    const likeButton = getByTestId("like-button");

    // Press the like button
    fireEvent.press(likeButton);
  });

  it("allows adding a comment", async () => {
    const { getByTestId, queryByText } = render(<MaximizeScreenTest />);

    const commentInput = getByTestId("comment-input");
    const sendButton = getByTestId("send-button");

    // Type a comment
    fireEvent.changeText(commentInput, "This is a test comment");

    // Press the send button
    fireEvent.press(sendButton);

    // Wait for the comment to appear
    await waitFor(() => {
      expect(queryByText("This is a test comment")).toBeTruthy();
    });
  });
});
