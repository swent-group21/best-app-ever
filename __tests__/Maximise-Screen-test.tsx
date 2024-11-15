import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MaximizeScreen from "@/app/screens/home/maximize_screen"; // Update with your file path if different

describe("MaximizeScreen Component UI Tests", () => {
  it("renders the TopBar with the correct title", () => {
    const { getByText } = render(<MaximizeScreen />);
    expect(getByText("Commute by foot")).toBeTruthy();
  });

  it("renders the user icon button", () => {
    const { getByTestId } = render(<MaximizeScreen />);
    expect(getByTestId("userIconButton")).toBeTruthy();
  });

  it("displays the user name and location information", () => {
    const { getByText } = render(<MaximizeScreen />);
    expect(getByText("Sandraa")).toBeTruthy();
    expect(getByText("in Plage de Vidy at 18:26")).toBeTruthy();
  });

  it("renders the challenge image", () => {
    const { getByTestId } = render(<MaximizeScreen />);
    expect(getByTestId("challengeImage")).toBeTruthy();
  });

  it("renders the like button and toggles its color on press", () => {
    const { getByTestId } = render(<MaximizeScreen />);
    const likeButton = getByTestId("likeButton");

    expect(likeButton).toBe("white");

    fireEvent.press(likeButton);
    expect(likeButton).toBe("red");

    fireEvent.press(likeButton);
    expect(likeButton).toBe("white");
  });

  it("renders the comment input field and allows text entry", () => {
    const { getByTestId } = render(<MaximizeScreen />);
    const commentInput = getByTestId("commentInput");

    fireEvent.changeText(commentInput, "Test comment");
    expect(commentInput.props.value).toBe("Test comment");
  });

  it("displays the comment when the send button is pressed", () => {
    const { getByTestId, getByText } = render(<MaximizeScreen />);
    const commentInput = getByTestId("commentInput");
    const sendButton = getByTestId("sendCommentButton");

    fireEvent.changeText(commentInput, "New comment");
    fireEvent.press(sendButton);

    expect(getByText("New comment")).toBeTruthy();
  });
});
