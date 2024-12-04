import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WelcomeScreens from "../../../src/app/views/welcome/welcome_screen";
import FirestoreCtrl from "../../../src/app/models/firebase/FirestoreCtrl";
import { Dimensions } from "react-native";



describe("WelcomeScreens UI Tests", () => {
  const mockSetUser = jest.fn();
  const mockNavigation = {
    navigate: jest.fn(),
  };
  const mockFirestoreCtrl = new FirestoreCtrl();

  it("renders the scroll view", () => {
    const { getByTestId } = render(
      <WelcomeScreens
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const scrollView = getByTestId("welcome-scrollview");
    expect(scrollView).toBeTruthy();
  });

  it("renders all screens inside the scroll view", () => {
    const { getByTestId } = render(
      <WelcomeScreens
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    expect(getByTestId("welcome-intro-screen")).toBeTruthy();
    expect(getByTestId("welcome-concept-screen")).toBeTruthy();
    expect(getByTestId("welcome-personal-screen")).toBeTruthy();
    expect(getByTestId("welcome-final-screen")).toBeTruthy();
  });

  it("renders the dot indicators", () => {
    const { getByTestId } = render(
      <WelcomeScreens
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const dotsContainer = getByTestId("welcome-dots-container");
    expect(dotsContainer).toBeTruthy();
  });

  it("updates the active dot on scroll", () => {
    const { getByTestId, getAllByTestId } = render(
      <WelcomeScreens
        setUser={mockSetUser}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    const scrollView = getByTestId("welcome-scrollview");
    const dots = getAllByTestId("welcome-dot");

    // Simulate scrolling to the second screen
    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: {
          x: Dimensions.get("window").width,
        },
      },
    });

    // Check that the second dot is active
    expect(dots[0].props.style).not.toContainEqual({ backgroundColor: "activeColor" });
    expect(dots[1].props.style).toContainEqual({ backgroundColor: "activeColor" });
  });
});
