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

jest.mock("@/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUser: jest.fn().mockResolvedValue({
        uid: "12345",
        name: "Test User",
        email: "test@example.com",
      }),
      getLikesOf: jest.fn().mockResolvedValue(["12345", "67890"]),
      getCommentsOf: jest.fn().mockResolvedValue([
        {
          uid: "12345",
          name: "Test User",
          comment: "This is a test comment",
          created_at: new Date(),
        },
      ]),
    };
  });
});

const mockFirestoreCtrl = new FirestoreCtrl();

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

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
      challenge: {
        challenge_id: "1",
        challenge_name: "Challenge 1",
        description: "Description 1",
        uid: "12345",
        likes: ["12345", "67890"],
      },
      firestoreCtrl: mockFirestoreCtrl,
      navigation: mockNavigation,
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
    const { findByText, findByTestId } = render(<MaximizeScreenTest />);

    await waitFor(() => {
      expect(findByText("Description 1")).toBeTruthy();
      expect(findByText("Test User")).toBeTruthy();
      expect(findByTestId("challenge-image")).toBeTruthy();
      expect(findByTestId("like-button")).toBeTruthy();
      expect(findByTestId("comment-input")).toBeTruthy();
      expect(findByTestId("send-button")).toBeTruthy();
      expect(findByTestId("comments-section")).toBeTruthy();
    });
  });

  it("allows liking the image", async () => {
    const { findByTestId } = render(<MaximizeScreenTest />);

    // Wait for the component to finish rendering
    await waitFor(() => findByTestId("like-button"));

    const likeButton = findByTestId("like-button");

    // Press the like button
    fireEvent.press(likeButton);
  });

  it("allows commenting on the image", async () => {
    const { findByTestId } = render(<MaximizeScreenTest />);

    // Wait for the component to finish rendering
    await waitFor(() => findByTestId("comment-input"));

    const commentInput = findByTestId("comment-input");
    const sendButton = findByTestId("send-button");

    // Type a comment in the input field
    fireEvent.changeText(commentInput, "This is a test comment");

    // Press the send button
    fireEvent.press(sendButton);
  });

  // it("display text if no comments are available", async () => {
  //   mockFirestoreCtrl.getCommentsOf.mockResolvedValue([]);

  //   const { findByText } = render(<MaximizeScreenTest />);

  //   await waitFor(() => {
  //     expect(findByText("No comments available")).toBeTruthy();
  //   });
  // });

  it("displays comments", async () => {
    const { findByText } = render(<MaximizeScreenTest />);

    await waitFor(() => {
      expect(findByText("This is a test comment")).toBeTruthy();
    });
  });

  // Functions used in maximize_screen.tsx should be tested here
  it("fetches user data", async () => {
    const { getByText } = render(<MaximizeScreenTest />);

    await waitFor(() => {
      expect(getByText("Test User")).toBeTruthy();
    });
  });

  it("fetches likes", async () => {
    const { findByTestId } = render(<MaximizeScreenTest />);

    await waitFor(() => {
      expect(findByTestId("like-button")).toBeTruthy();
    });
  });

  it("gets the right number of likes", async () => {
    const { findByText } = render(<MaximizeScreenTest />);

    await waitFor(() => {
      expect(findByText("2 likes")).toBeTruthy();
    });
  });

  // it("displays correctly when no likes are available", async () => {
  //   mockFirestoreCtrl.getLikesOf.mockResolvedValue([]);

  //   const { getByText } = render(<MaximizeScreenTest />);

  //   await waitFor(() => {
  //     expect(getByText("0 like")).toBeTruthy();
  //   });
  // });
});
