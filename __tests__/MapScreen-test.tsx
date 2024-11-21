import React from "react";
import { render } from "@testing-library/react-native";
import MapScreen from "@/app/screens/map/map_screen";
import * as Location from "expo-location";

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

describe("MapScreen Component", () => {
  beforeAll(() => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      { status: "granted" },
    );
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    });
  });

  it("renders the map", () => {
    const { getByTestId } = render(<MapScreen />);

    expect(getByTestId("mapView")).toBeTruthy();
  });

  it("requests location permissions", () => {
    render(<MapScreen />);

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
  });
});
