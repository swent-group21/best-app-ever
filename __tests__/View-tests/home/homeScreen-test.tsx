import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../../../src/app/views/home/home_screen";
import FirestoreCtrl from "../../../src/app/models/firebase/FirestoreCtrl";

// error when no challenges
describe("HomeScreen UI Tests", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockFirestoreCtrl = new FirestoreCtrl();
  const mockUser = {
    uid: "12345",
    name: "Test User",
    image_id: null,
    email: "test@gmail.com",
    createdAt: new Date(),
  };

  it("renders the home screen container", () => {
    const { getByTestId } = render(
      <HomeScreen
        user={mockUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const screen = getByTestId("home-screen");
    expect(screen).toBeTruthy();
  });

  it("renders the top bar with the title", () => {
    const { getByText } = render(
      <HomeScreen
        user={mockUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const title = getByText("Strive");
    expect(title).toBeTruthy();
  });

  it("renders the groups section", () => {
    const { getByTestId } = render(
      <HomeScreen
        user={mockUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const groupsContainer = getByTestId("create-group-button");
    expect(groupsContainer).toBeTruthy();
  });

  it("renders the challenges section", () => {
    const { getByTestId } = render(
      <HomeScreen
        user={mockUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const challengeDescription = getByTestId("description-id");
    expect(challengeDescription).toBeTruthy();
  });


  it("renders a message if no challenges are available", () => {
    const { getByText } = render(
      <HomeScreen
        user={mockUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const noChallengesMessage = getByText("No challenge to display");
    expect(noChallengesMessage).toBeTruthy();
  });
});
