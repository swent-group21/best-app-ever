import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react-native";
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
      updateLikesOf: jest.fn(),
      addComment: jest.fn().mockResolvedValue(true),
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
    render(<MaximizeScreenTest />);

    const description = await screen.findByText("Description 1");
    const user = await screen.findByText("Test User");
    const challengeImage = await screen.findByTestId("challenge-image");
    const likeButton = await screen.findByTestId("like-button");
    const commentInput = await screen.findByTestId("comment-input");
    const sendButton = await screen.findByTestId("send-button");
    const commentsSection = await screen.findByTestId("comments-section");

    expect(description).toBeTruthy();
    expect(user).toBeTruthy();
    expect(challengeImage).toBeTruthy();
    expect(likeButton).toBeTruthy();
    expect(commentInput).toBeTruthy();
    expect(sendButton).toBeTruthy();
    expect(commentsSection).toBeTruthy();
  });

  // it("allows liking the image", async () => {
  //   render(<MaximizeScreenTest />);

  //   // Find the like button
  //   const likeButton = await screen.findByTestId("like-button");

  //   // Press the like button
  //   fireEvent.press(likeButton);
  // });

  it("allows commenting on the image", async () => {
    render(<MaximizeScreenTest />);

    // Find the comment input field
    const commentInput = await screen.findByTestId("comment-input");

    // Find the send button
    const sendButton = await screen.findByTestId("send-button");

    // Type a comment in the input field
    fireEvent.changeText(commentInput, "This is a test comment");

    // Press the send button
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(mockFirestoreCtrl.addComment).toHaveBeenCalled();
    });
  });

  it("display text if no comments are available", async () => {
    render(<MaximizeScreenTest />);

    await waitFor(() => {
      expect(screen.findByText("No comments available")).toBeTruthy();
    });
  });

  it("displays comments", async () => {
    render(<MaximizeScreenTest />);

    //Add a comment
    // Find the comment input field
    const commentInput = await screen.findByTestId("comment-input");

    // Find the send button
    const sendButton = await screen.findByTestId("send-button");

    // Type a comment in the input field
    fireEvent.changeText(commentInput, "This is a test comment");

    // Press the send button
    fireEvent.press(sendButton);

    const comment = await screen.findByText("This is a test comment");
    expect(comment).toBeTruthy();
  });

  // Functions used in maximize_screen.tsx should be tested here
  it("fetches user data", async () => {
    render(<MaximizeScreenTest />);

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeTruthy();
    });
  });

  it("fetches likes", async () => {
    render(<MaximizeScreenTest />);

    await waitFor(() => {
      expect(screen.findByTestId("like-button")).toBeTruthy();
    });
  });

  it("gets the right number of likes", async () => {
    render(<MaximizeScreenTest />);

    const likesCount = await screen.findByText("2 likes");
    expect(likesCount).toBeTruthy();
  });

  it("displays correctly when no likes are available", async () => {
    render(<MaximizeScreenTest />);

    const noLikes = await screen.findByText("0 like");
    expect(noLikes).toBeTruthy();
  });
});
