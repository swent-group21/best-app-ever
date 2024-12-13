import React from "react";
import {
  render,
  fireEvent,
  renderHook,
  act,
  waitFor,
} from "@testing-library/react-native";
import { useUserListItemViewModel } from "@/src/viewmodels/components/friends/UserListItemViewModel";

describe("UserListItem ViewModel", () => {
  const mockOnAdd = jest.fn();
  const mockOnCancelRequest = jest.fn();
  const mockOnPress = jest.fn();

  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct default values", async () => {
    const { result } = renderHook(() =>
      useUserListItemViewModel({
        isFriend: false,
        isRequested: false,
        onAdd: mockOnAdd,
        onCancelRequest: mockOnCancelRequest,
      }),
    );

    await waitFor(() => {
      expect(result.current.status).toBeDefined();
    });

    // Check that the status is set to "ADD"
    expect(result.current.status).toEqual("ADD");

    // Call the handlePress function
    await act(async () => {
      await result.current.handlePress();
    });

    // Wait for the promise to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(mockOnAdd).toHaveBeenCalled();
    expect(result.current.status).toEqual("REQUESTED");
  });

  it("renders with the correct values when friend", async () => {
    const { result } = renderHook(() =>
      useUserListItemViewModel({
        isFriend: true,
        isRequested: false,
        onAdd: mockOnAdd,
        onCancelRequest: mockOnCancelRequest,
      }),
    );

    await waitFor(() => {
      expect(result.current.status).toBeDefined();
    });

    expect(result.current.status).toEqual("FRIEND");

    await act(async () => {
      await result.current.handlePress();
    });

    // Wait for the promise to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(mockOnAdd).toHaveBeenCalledTimes(0);
    expect(result.current.status).toEqual("FRIEND");
  });

  it("renders with the correct values when requested", async () => {
    const { result } = renderHook(() =>
      useUserListItemViewModel({
        isFriend: false,
        isRequested: true,
        onAdd: mockOnAdd,
        onCancelRequest: mockOnCancelRequest,
      }),
    );

    await waitFor(() => {
      expect(result.current.status).toBeDefined();
    });

    expect(result.current.status).toEqual("REQUESTED");

    await act(async () => {
      await result.current.handlePress();
    });

    // Wait for the promise to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(mockOnCancelRequest).toHaveBeenCalled();
    expect(result.current.status).toEqual("ADD");
  });
});
