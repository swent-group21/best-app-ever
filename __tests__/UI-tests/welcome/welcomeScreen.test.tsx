// welcome_screen.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WelcomeScreens from "@/src/app/screens/welcome/welcome_screen";
import { NavigationContainer } from "@react-navigation/native";
import { Dimensions } from "react-native";
import FirestoreCtrl from "@/src/firebase/FirestoreCtrl";

const mockFirestoreCtrl = new FirestoreCtrl();

describe("WelcomeScreens", () => {
  it("renders the initial screen correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeScreens
          setUser={jest.fn()}
          navigation={{}}
          firestoreCtrl={mockFirestoreCtrl}
        />
      </NavigationContainer>,
    );

    // Initial screen should have the intro screen content
    expect(getByText("So what is\nStrive\nabout ?")).toBeTruthy();
  });

  it("allows swiping through screens", () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <WelcomeScreens
          setUser={jest.fn()}
          navigation={{}}
          firestoreCtrl={mockFirestoreCtrl}
        />
      </NavigationContainer>,
    );

    const scrollView = getByTestId("welcome-scrollview");
    const { width } = Dimensions.get("window");

    // Simulate swiping to the next screen
    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: { x: width, y: 0 },
        contentSize: { width: width * 4, height: 0 },
        layoutMeasurement: { width, height: 0 },
      },
    });

    // Check if the second screen content is visible
    expect(getByText("Competing\nyourself")).toBeTruthy();
  });
});
