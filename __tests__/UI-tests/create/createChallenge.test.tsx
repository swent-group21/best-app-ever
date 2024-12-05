import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react-native";
import CreateChallengeScreen from "@/app/screens/create/create_challenge";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

jest.mock("@/types/ChallengeBuilder");
jest.mock("expo-location");

const Stack = createNativeStackNavigator();

// Mock FirestoreCtrl
jest.mock("@/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => {
    return {
      newChallenge: jest.fn(),
    };
  });
});
const mockFirestoreCtrl = new FirestoreCtrl();

// Mock navigation params
const mockRoute = {
  params: {
    image_id: "test_image_id",
  },
};

// Create a test component to wrap CreateChallengeScreen with navigation
const CreateChallengeScreenTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateChallenge"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="CreateChallenge">
          {(props) => (
            <CreateChallengeScreen
              {...props}
              route={mockRoute}
              firestoreCtrl={mockFirestoreCtrl}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Home">{() => <></>}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("CreateChallengeScreen", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1466424490000));
  });

  it("allows creating a new challenge with no location", async () => {
    const requestForegroundPermissionsAsyncMock = jest.fn();
    jest
      .spyOn(require("expo-location"), "requestForegroundPermissionsAsync")
      .mockReturnValue({
        requestForegroundPermissionsAsync:
          requestForegroundPermissionsAsyncMock,
        status: "denied",
      });

    render(<CreateChallengeScreenTest />);

    // Fill in the form
    fireEvent.changeText(
      screen.getByPlaceholderText("Challenge Name"),
      "Test Challenge",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Description"),
      "Test Description",
    );

    const switchButton = screen.getByTestId("switch-button");
    await act(async () => {
      expect(switchButton.props.value).toBe(true);
      await fireEvent.press(switchButton);
      expect(switchButton.props.value).toBe(false);
    });

    // Press the right icon (arrow-forward) to submit
    const rightIcon = screen.getByTestId("bottom-right-icon-arrow-forward");
    await act(async () => {
      fireEvent.press(rightIcon);
    });
  });
});
