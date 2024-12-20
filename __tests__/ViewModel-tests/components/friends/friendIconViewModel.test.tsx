import React from "react";
import { render, renderHook } from "@testing-library/react-native";
import { FriendListItem } from "@/src/views/components/friends/friend_list_item";
import { useFriendIconViewModel } from "@/src/viewmodels/components/friends/FriendIconViewModel";

jest.mock("@/src/models/firebase/GetFirestoreCtrl", () => ({
  getImageUrl: jest.fn().mockResolvedValue("image_url"),
}));

describe("FriendIcon ViewModel", () => {
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("Results the first letter of the name", () => {
    const mockName = "Tester";
    const mockAvatar = "The airbender";
    const { result } = renderHook(() =>
      useFriendIconViewModel({ name: mockName, avatar: mockAvatar }),
    );

    expect(result.current.firstLetter).toEqual("T");
  });

  it("Results the first letter in uppercase of the name", () => {
    const mockName = "zoe";
    const mockAvatar = "The airbender";
    const { result } = renderHook(() =>
      useFriendIconViewModel({ name: mockName, avatar: mockAvatar }),
    );

    expect(result.current.firstLetter).toEqual("Z");
  });

  it("Results nothing if name is the empty string", () => {
    const mockName = "";
    const mockAvatar = "";
    const { result } = renderHook(() =>
      useFriendIconViewModel({ name: mockName, avatar: mockAvatar }),
    );

    expect(result.current.firstLetter).toEqual("");
  });
});
