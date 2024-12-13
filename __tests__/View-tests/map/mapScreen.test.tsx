import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import MapScreen from "@/src/views/map/map_screen";
import FirestoreCtrl from "@/src/models/firebase/FirestoreCtrl";

jest.mock("@/src/viewmodels/map/MapScreenViewModel", () => ({
  useMapScreenViewModel: jest.fn(),
}));

jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  const MockMapView = (props) => <View {...props} />;
  const MockMapMarker = (props) => <View {...props} />;
  return {
    __esModule: true,
    default: MockMapView,
    MapMarker: MockMapMarker,
  };
});

describe("MapScreen UI Tests", () => {
  const mockNavigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };
  const mockFirestoreCtrl = new FirestoreCtrl();
  const mockUser = {
    uid: "123",
    name: "Test User",
    email: "test@gmail.com",
    createdAt: new Date(),
    image_id: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the ViewModel
    require("@/src/viewmodels/map/MapScreenViewModel").useMapScreenViewModel.mockReturnValue(
      {
        permission: true,
        userLocation: {
          coords: {
            latitude: 43.6763,
            longitude: 7.0122,
          },
        },
        challengesWithLocation: [
          {
            challenge_id: "1",
            challenge_name: "Challenge 1",
            description: "Description for Challenge 1",
            location: { latitude: 43.6763, longitude: 7.0122 },
          },
          {
            challenge_id: "2",
            challenge_name: "Challenge 2",
            description: "Description for Challenge 2",
            location: { latitude: 43.7, longitude: 7.015 },
          },
        ],
      },
    );
  });

  it("should render the map", async () => {
    const { getByTestId } = render(
      <MapScreen
        user={mockUser}
        navigation={mockNavigation}
        route={{ params: { user: mockUser } }}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    await waitFor(() => {
      expect(getByTestId("map")).toBeDefined();
    });
  });

  it("should render the map markers", async () => {
    const { getByTestId } = render(
      <MapScreen
        user={mockUser}
        navigation={mockNavigation}
        route={{ params: { user: mockUser } }}
        firestoreCtrl={mockFirestoreCtrl}
      />,
    );

    await waitFor(() => {
      expect(getByTestId("map-marker-0")).toBeDefined();
      expect(getByTestId("map-marker-1")).toBeDefined();
    });
  });
});
