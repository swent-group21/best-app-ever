import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CreateChallengeScreen from "@/app/screens/create/create_challenge";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import { createChallenge } from "@/types/ChallengeBuilder";

jest.mock("@/types/ChallengeBuilder");
jest.mock("expo-location");

const Stack = createNativeStackNavigator();

// Mock FirestoreCtrl
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
        {/* Add other screens if necessary */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("CreateChallengeScreen", () => {
  it("allows creating a new challenge with no location", async () => {
    const resetNavigationMock = jest.fn();
    jest
      .spyOn(require("@react-navigation/native"), "useNavigation")
      .mockReturnValue({
        reset: resetNavigationMock,
      });

    const requestForegroundPermissionsAsyncMock = jest.fn();
    jest
      .spyOn(require("expo-location"), "requestForegroundPermissionsAsync")
      .mockReturnValue({
        requestForegroundPermissionsAsync:
          requestForegroundPermissionsAsyncMock,
        status: "denied",
      });

    const { getByPlaceholderText, getByTestId } = render(
      <CreateChallengeScreenTest />,
    );

    // Fill in the form
    fireEvent.changeText(
      getByPlaceholderText("Challenge Name"),
      "Test Challenge",
    );
    fireEvent.changeText(
      getByPlaceholderText("Description"),
      "Test Description",
    );

    const switchButton = getByTestId("switch-button");
    expect(switchButton.props.value).toBe(true);
    await fireEvent.press(switchButton);
    expect(switchButton.props.value).toBe(false);

    // Press the right icon (arrow-forward) to submit
    const rightIcon = getByTestId("bottomRightIcon-arrow-forward");
    fireEvent.press(rightIcon);

    // Wait for the createChallenge function to be called
    await waitFor(() => {
      expect(createChallenge).toHaveBeenCalledWith(
        mockFirestoreCtrl,
        "Test Challenge",
        expect.any(Date),
        "Test Description",
        null,
        "test_image_id",
      );
    });
  });
});
