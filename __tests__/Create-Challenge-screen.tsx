import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CreateChallengeScreen from "@/app/screens/create/create_challenge";

describe("CreateChallengeScreen", () => {
  const navigationMock = { navigate: jest.fn() };
  const firestoreCtrlMock = {};

  it("renders all elements correctly", () => {
    const { getByTestId } = render(
      <CreateChallengeScreen
        navigation={navigationMock}
        image_id="test-image"
        firestoreCtrl={firestoreCtrlMock}
      />
    );

    expect(getByTestId("Create-Challenge-Text")).toBeTruthy();
    expect(getByTestId("Challenge-Name-Input")).toBeTruthy();
    expect(getByTestId("Description-Input")).toBeTruthy();
    expect(getByTestId("switch-button")).toBeTruthy();
    expect(getByTestId("Location-validation")).toBeTruthy();
    expect(getByTestId("bottom-bar")).toBeTruthy();
    expect(getByTestId("input-arrow-forward")).toBeTruthy();
  });
});