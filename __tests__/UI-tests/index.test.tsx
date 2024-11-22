// index.test.tsx
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import App from "@/app/index";
import { Nav } from "@/navigation/Navigation";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import { NavigationIndependentTree } from "@react-navigation/native";

// Mock FirestoreCtrl
jest.mock("@/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {}; // Provide any necessary mock implementation here
  });
});

// Suppress console.error for 'act' warnings
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (message, ...args) => {
    if (message.startsWith("Warning: An update to %s inside a test was not wrapped in act(...)")) {
      return;
    }
    originalConsoleError(message, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe("App", () => {
  it("renders the Welcome screen when user is not logged in", async () => {
    const { getByText } = render(<App />);

    // Assuming that the Welcome screen contains the text 'Login to Strive'
    await waitFor(() => expect(getByText("Login to Strive")).toBeTruthy());
  });

  it("renders the Home screen when user is logged in", async () => {
    // Modify the App component to accept props for testing purposes
    const TestApp = () => {
      const [isLoggedIn, setIsLoggedIn] = React.useState<"Welcome" | "Home">("Home");
      const firestoreCtrl = new FirestoreCtrl();

      return (
        <NavigationIndependentTree>
          <Nav isLoggedIn={isLoggedIn} firestoreCtrl={firestoreCtrl} />
        </NavigationIndependentTree>
      );
    };

    const { getByText } = render(<TestApp />);

    // Assuming that the Home screen contains the text 'Home Screen' or similar
    await waitFor(() => expect(getByText("Home Screen")).toBeTruthy());
  });
});
