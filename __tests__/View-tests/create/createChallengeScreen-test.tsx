import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CreateChallengeScreen from "../../../src/app/views/create/create_challenge";
import FirestoreCtrl from "../../../src/app/models/firebase/FirestoreCtrl";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";


describe("CreateChallengeScreen UI Tests", () => {
  const mockNavigation = {};
  const mockRoute = {};
  const mockFirestoreCtrl = new FirestoreCtrl();

  it("renders the Create Challenge screen container", () => {
    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={mockNavigation}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const container = getByTestId("Create-Challenge-Text");
    expect(container).toBeTruthy();
  });

  it("renders the Challenge Name input", () => {
    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={mockNavigation}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const challengeNameInput = getByTestId("Challenge-Name-Input");
    expect(challengeNameInput).toBeTruthy();
  });

  it("renders the Description input", () => {
    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={mockNavigation}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const descriptionInput = getByTestId("Description-Input");
    expect(descriptionInput).toBeTruthy();
  });

  it("renders the Location toggle switch", () => {
    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={mockNavigation}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const switchButton = getByTestId("switch-button");
    expect(switchButton).toBeTruthy();
  });



  it("renders the BottomBar with the submit button", () => {
    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={mockNavigation}
        route={mockRoute}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const bottomBar = getByTestId("bottom-bar");
    expect(bottomBar).toBeTruthy();
  });
});
