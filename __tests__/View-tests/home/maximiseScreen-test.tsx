import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MaximizeScreen from "../../../src/app/views/home/maximize_screen";
import FirestoreCtrl from "../../../src/app/models/firebase/FirestoreCtrl";

// tests don't pass but Roman's PR solves it 
describe("MaximizeScreen UI Tests", () => {
  const mockFirestoreCtrl = new FirestoreCtrl();
  const mockUser = {
    uid: "12345",
    name: "Test User",
    email : "test@gmail.com",
    image_id: null,
    createdAt: new Date(),
  };
  const mockRoute = {
    params: {
      challenge: {
        challenge_name: "Test Challenge",
        description: "This is a test challenge description",
        date: new Date(),
        image_id: null,
        likes: [],
        comments: [],
      },
    },
  };

  it("renders the main container", () => {
    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={{}}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const container = getByTestId("maximize-screen-container");
    expect(container).toBeTruthy();
  });

  it("renders the user information", () => {
    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={{}}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const userInfo = getByTestId("user-info");
    expect(userInfo).toBeTruthy();
  });

  it("renders the challenge image", () => {
    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={{}}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const image = getByTestId("challenge-image");
    expect(image).toBeTruthy();
  });

  it("renders the like button and like count", () => {
    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={{}}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const likeButton = getByTestId("like-button");
    const likeCount = getByTestId("like-count");

    expect(likeButton).toBeTruthy();
    expect(likeCount).toBeTruthy();
  });

  it("renders the comment input", () => {
    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={{}}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const commentInput = getByTestId("comment-input");
    expect(commentInput).toBeTruthy();
  });

  it("renders the comments section", () => {
    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={{}}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const commentsSection = getByTestId("comments-section");
    expect(commentsSection).toBeTruthy();
  });

  it("increments like count when like button is pressed", () => {
    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={{}}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const likeButton = getByTestId("like-button");
    fireEvent.press(likeButton);

    const likeCount = getByTestId("like-count");
    expect(likeCount.props.children).toEqual(["1", " ", "likes"]);
  });

  it("adds a comment when the send button is pressed", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={{}}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const commentInput = getByPlaceholderText("Add a comment...");
    fireEvent.changeText(commentInput, "Test comment");

    const sendButton = getByTestId("send-button");
    fireEvent.press(sendButton);

    const commentsSection = getByTestId("comments-section");
    expect(commentsSection.props.children.length).toBeGreaterThan(0);
  });
});
