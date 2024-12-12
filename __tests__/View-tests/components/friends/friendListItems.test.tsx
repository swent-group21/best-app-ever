import React from "react";
import { render } from "@testing-library/react-native";
import { FriendListItem } from "@/src/views/components/friends/friend_list_item";

// Mock du ViewModel
jest.mock("@/src/viewmodels/components/friends/FriendIconViewModel", () => ({
  useFriendIconViewModel: jest.fn(),
}));


describe("FriendListItem Component", () => {
  const mockUseFriendIconViewModel =
    require("@/src/viewmodels/components/friends/FriendIconViewModel").useFriendIconViewModel;

  const mockOnPress = jest.fn();



  it("renders the component at first", () => {
    mockUseFriendIconViewModel.mockReturnValue({
      firstLetter: "T",
    });

    const { getByTestId } = render(
      <FriendListItem
        name="Tester"
        avatar="https://example.com/avatar.jpg"
        onPress={mockOnPress}
      />,
    );

    expect(getByTestId("friend-item-Tester")).toBeTruthy();
  });

  it("renders with a custom avatar", () => {
    mockUseFriendIconViewModel.mockReturnValue({
      firstLetter: "J",
    });

    const { getByTestId } = render(
      <FriendListItem
        name="John Doe"
        avatar="https://example.com/avatar.jpg"
        onPress={mockOnPress}
      />,
    );

    const avatarImage = getByTestId("friend-avatar-image");
    expect(avatarImage.props.source.uri).toBe("https://example.com/avatar.jpg");
  });


  it("renders with a default avatar when no avatar is provided", () => {
    mockUseFriendIconViewModel.mockReturnValue({
      firstLetter: "J",
    });

    const { getByTestId, getByText } = render(
      <FriendListItem name="Jane Smith" avatar={null} onPress={mockOnPress} />,
    );

    const defaultAvatar = getByTestId("friend-default-avatar");
    const initialText = getByText("J");
    const textAvatarPlaceholder = getByTestId("friend-avatar-text");
    expect(defaultAvatar).toBeTruthy();
    expect(initialText).toBeTruthy();
    expect(textAvatarPlaceholder).toBeTruthy();
  });

  it("displays the friend's name correctly", () => {
    mockUseFriendIconViewModel.mockReturnValue({
      firstLetter: "A",
    });

    const { getByText } = render(
      <FriendListItem
        name="Alice Johnson"
        avatar={null}
        onPress={mockOnPress}
      />,
    );

    const friendName = getByText("Alice Johnson");
    expect(friendName).toBeTruthy();
  });
});
