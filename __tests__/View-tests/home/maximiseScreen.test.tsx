import React, { act } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import MaximizeScreen from "@/src/views/home/maximize_screen";

jest.mock("@/src/viewmodels/home/MaximizeScreenViewModel", () => ({
  useMaximizeScreenViewModel: jest.fn(),
}));

describe("MaximizeScreen UI Tests", () => {
  const mockChallenge = {
    challenge_id: "challenge123",
    uid: "user456",
    caption: "Test Challenge",
    image_id: "test_image",
    created_at: new Date("2024-01-01T00:00:00Z"),
    location: { latitude: 48.8566, longitude: 2.3522 },
    description: "Test Description",
    group_id: "group123",
  };

  const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() };
  const mockRoute = {
    params: {
      challenge: {
        challenge_id: "challenge-id-1",
        description: "A test challenge",
        image_id: "https://example.com/test-image.jpg",
        location: { latitude: 48.8566, longitude: 2.3522 },
      },
    },
  };

  const mockUser = {
    uid: "user-1",
    name: "Test User",
    image_id: "https://example.com/user-image.jpg",
    email: "bla.gmail.com",
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the ViewModel
    require("@/src/viewmodels/home/MaximizeScreenViewModel").useMaximizeScreenViewModel.mockReturnValue(
      {
        commentText: "",
        setCommentText: jest.fn(),
        commentList: [
          {
            comment_text: "This is a comment",
            user_name: "Test User",
            created_at: new Date("2024-01-01T00:00:00Z"),
          },
        ],
        postUser: { name: "Post User" },
        likeList: ["user123"],
        isLiked: false,
        toggleLike: jest.fn(),
        addComment: jest.fn(),
        postDate: new Date("2024-01-01T00:00:00Z"),
        postImage: "test_image",
        postCaption: "Test Challenge",
        navigateGoBack: jest.fn(),
        userProfilePicture: "test_pp",
      },
    );
  });

  it("renders the MaximizeScreen with comments and likes", async () => {
    const { getByText } = render(
      <MaximizeScreen
        user={{
          uid: "12345",
          name: "TestUser",
          email: "test1@gmail.com",
          createdAt: new Date(),
          image_id: null,
        }}
        navigation={mockNavigation}
        route={{ params: { challenge: mockChallenge } }}
      />,
    );

    await waitFor(() => {
      expect(getByText("Test Challenge")).toBeTruthy();

      expect(getByText("This is a comment")).toBeTruthy();
    });
  });

  it("handles double-tap to like the post", () => {
    const mockToggleLike = jest.fn();
    jest
      .spyOn(
        require("@/src/viewmodels/home/MaximizeScreenViewModel"),
        "useMaximizeScreenViewModel",
      )
      .mockReturnValue({
        toggleLike: mockToggleLike,
        isLiked: false,
        likeList: [],
        commentList: [],
        postDate: new Date(),
        postUser: mockUser,
        postDescription: "A test challenge",
        postImage: "https://example.com/test-image.jpg",
      });

    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={mockNavigation}
        route={mockRoute}
      />,
    );

    const postImage = getByTestId("post-image");
    fireEvent.press(postImage);
    fireEvent.press(postImage); // Simulate double-tap

    expect(mockToggleLike).toHaveBeenCalled();
  });

  it("handles liking a post", async () => {
    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={mockNavigation}
        route={{ params: { challenge: mockChallenge } }}
      />,
    );

    await act(async () => {
      fireEvent.press(getByTestId("like-button"));
    });
    const toggleLike =
      require("@/src/viewmodels/home/MaximizeScreenViewModel").useMaximizeScreenViewModel()
        .toggleLike;
    expect(toggleLike).toHaveBeenCalled();
  });

  it("handles adding a comment", async () => {
    const mockAppendComment = jest.fn();
    jest
      .spyOn(
        require("@/src/viewmodels/home/MaximizeScreenViewModel"),
        "useMaximizeScreenViewModel",
      )
      .mockReturnValue({
        toggleLike: false,
        isLiked: false,
        likeList: [],
        commentList: [],
        postDate: new Date(),
        postUser: mockUser,
        postDescription: "A test challenge",
        postImage: "https://example.com/test-image.jpg",
        addComment: mockAppendComment,
      });
    const { getByTestId } = render(
      <MaximizeScreen
        user={{
          uid: "12345",
          name: "Test User",
          email: "test@gmail.com",
          createdAt: new Date(),
          image_id: null,
        }}
        navigation={mockNavigation}
        route={{ params: { challenge: mockChallenge } }}
      />,
    );

    const input = getByTestId("comment-input");
    await act(async () => {
      fireEvent.changeText(input, "New Comment");
      fireEvent.press(getByTestId("send-comment-button"));
    });
    expect(mockAppendComment).toHaveBeenCalled();
  });

  it("navigates to the MapScreen when the location button is pressed", async () => {
    const { getByTestId, getByText } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={mockNavigation}
        route={{ params: { challenge: mockChallenge } }}
      />,
    );

    const locationButton = getByTestId("location-button");
    await act(async () => {
      fireEvent.press(locationButton);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("MapScreen", {
      navigation: mockNavigation,
      user: mockUser,
      location: { latitude: 48.8566, longitude: 2.3522 },
    });
  });

  it("toggles the like button when pressed", () => {
    const mockToggleLike = jest.fn();
    jest
      .spyOn(
        require("@/src/viewmodels/home/MaximizeScreenViewModel"),
        "useMaximizeScreenViewModel",
      )
      .mockReturnValue({
        toggleLike: mockToggleLike,
        isLiked: false,
        likeList: [],
        commentList: [],
        postDate: new Date(),
        postUser: mockUser,
        postDescription: "A test challenge",
        postImage: "https://example.com/test-image.jpg",
      });

    const { getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={mockNavigation}
        route={mockRoute}
      />,
    );

    const likeButton = getByTestId("like-button");
    fireEvent.press(likeButton);

    expect(mockToggleLike).toHaveBeenCalled();
  });

  it("renders the screen with the info, image, and description", () => {
    const { getByText, getByTestId } = render(
      <MaximizeScreen
        user={mockUser}
        navigation={mockNavigation}
        route={mockRoute}
      />,
    );

    // Check for post description
    expect(getByText("Test Challenge")).toBeTruthy();

    // Check for post image
    expect(getByTestId("post-image")).toBeTruthy();

    // Check for post description
    expect(getByText("This is a comment")).toBeTruthy();
  });
});

// it("handles liking a post", () => {
//   const { getByText } = render(
//     <MaximizeScreen
//       user={{ uid: "12345", name: "Test User", email: "test@gmail.com", createdAt: new Date(), image_id: null }}
//       navigation={mockNavigation}
//       route={{ params: { challenge: mockChallenge } }}
//       firestoreCtrl={mockFirestoreCtrl}
//     />
//   );

//   fireEvent.press(getByText("heart-outline"));
//   const toggleLike = require("@/src/viewmodels/home/MaximizeScreenViewModel").useMaximizeScreenViewModel()
//     .toggleLike;
//   expect(toggleLike).toHaveBeenCalled();
// });

// it("handles adding a comment", () => {
//   const { getByText, getByPlaceholderText } = render(
//     <MaximizeScreen
//       user={{ uid: "12345", name: "Test User", email: "test@gmail.com", createdAt: new Date(), image_id: null }}
//       navigation={mockNavigation}
//       route={{ params: { challenge: mockChallenge } }}
//       firestoreCtrl={mockFirestoreCtrl}
//     />
//   );

//   const addComment = require("@/src/viewmodels/home/MaximizeScreenViewModel").useMaximizeScreenViewModel()
//     .addComment;

//   const input = getByPlaceholderText("Write a comment...");
//   fireEvent.changeText(input, "New Comment");
//   fireEvent.press(getByText("send"));
//   expect(addComment).toHaveBeenCalled();
// });

// it("handles navigation back", () => {
//   const { getByText } = render(
//     <MaximizeScreen
//       user={{ uid: "12345", name: "Test User", email: "test@gmail.com", createdAt: new Date(), image_id: null }}
//       navigation={mockNavigation}
//       route={{ params: { challenge: mockChallenge } }}
//       firestoreCtrl={mockFirestoreCtrl}
//     />
//   );

//   fireEvent.press(getByText("arrow-back-outline"));
//   expect(mockNavigation.goBack).toHaveBeenCalled();
// });
