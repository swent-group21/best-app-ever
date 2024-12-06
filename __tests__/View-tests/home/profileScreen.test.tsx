import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileScreen from "@/src/views/home/profile_screen";
import FirestoreCtrl from "@/src/models/firebase/FirestoreCtrl";

describe("ProfileScreen UI Tests", () => {
  const mockSetUser = jest.fn();
  const mockFirestoreCtrl = new FirestoreCtrl();
  const mockNavigation = {};
  const mockUser = {
    uid: "12345",
    name: "Test User",
    image_id: null,
    email: "test@gmail.com",
    createdAt: new Date(),
  };

  it("renders the profile screen container", () => {
    const { getByTestId } = render(
      <ProfileScreen
        user={mockUser}
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const container = getByTestId("profile-screen");
    expect(container).toBeTruthy();
  });

  it("renders the profile image picker", () => {
    const { getByTestId } = render(
      <ProfileScreen
        user={mockUser}
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const imagePicker = getByTestId("image-picker");
    expect(imagePicker).toBeTruthy();
  });

  it("renders the username input", () => {
    const { getByPlaceholderText } = render(
      <ProfileScreen
        user={mockUser}
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const usernameInput = getByPlaceholderText("Enter your name");
    expect(usernameInput).toBeTruthy();
  });

  it("renders the actions container", () => {
    const { getByTestId } = render(
      <ProfileScreen
        user={mockUser}
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const actionsContainer = getByTestId("actions-container");
    expect(actionsContainer).toBeTruthy();
  });

  it("renders the 'Change your email' button", () => {
    const { getByText } = render(
      <ProfileScreen
        user={mockUser}
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const emailButton = getByText("Change your email");
    expect(emailButton).toBeTruthy();
  });

  it("renders the 'Change your password' button", () => {
    const { getByText } = render(
      <ProfileScreen
        user={mockUser}
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const passwordButton = getByText("Change your password");
    expect(passwordButton).toBeTruthy();
  });

  it("renders the 'Log Out' button", () => {
    const { getByText } = render(
      <ProfileScreen
        user={mockUser}
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    const logoutButton = getByText("Log Out");
    expect(logoutButton).toBeTruthy();
  });
});
