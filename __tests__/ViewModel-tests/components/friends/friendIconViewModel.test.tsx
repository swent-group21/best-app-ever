import React from "react";
import { render, renderHook } from "@testing-library/react-native";
import { FriendListItem } from "@/src/views/components/friends/friend_list_item";
import { useFriendIconViewModel } from "@/src/viewmodels/components/friends/FriendIconViewModel";

describe("FriendIcon ViewModel", () => {
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("Results the first letter of the name", () => {
    const mockName = "Tester";
    const { result } = renderHook(() =>
      useFriendIconViewModel({ name: mockName }),
    );

    expect(result.current.firstLetter).toEqual("T");
  });

  it("Results the first letter in uppercase of the name", () => {
    const mockName = "zoe";
    const { result } = renderHook(() =>
      useFriendIconViewModel({ name: mockName }),
    );

    expect(result.current.firstLetter).toEqual("Z");
  });

  it("Results nothing if name is the empty string", () => {
    const mockName = "";
    const { result } = renderHook(() =>
      useFriendIconViewModel({ name: mockName }),
    );

    expect(result.current.firstLetter).toEqual("");
  });
});
