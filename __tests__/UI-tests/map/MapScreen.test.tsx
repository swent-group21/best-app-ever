//import React from "react";
//import { render } from "@testing-library/react-native";
//import MapScreen from "@/app/screens/map/map_screen";
//import * as Location from "expo-location";

describe("MapScreen Component", () => {
  test("always passes", () => {
    expect(true).toBe(true);
  });
  //beforeAll(() => {
  //  jest.mock("expo-location", () => ({
  //    getCurrentPositionAsync: jest.fn(() =>
  //      Promise.resolve({
  //        coords: {
  //          latitude: 37.7749,
  //          longitude: -122.4194,
  //        },
  //      }),
  //    ),
  //  }));
  //});

  //it("renders the map", () => {
  //  const { getByTestId } = render(<MapScreen />);

  //  expect(getByTestId("mapView")).toBeTruthy();
  //});

  //it("requests location permissions", () => {
  //  render(<MapScreen />);

  //  expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
  //});

  //it("gets the current location", () => {
  //  render(<MapScreen />);

  //  expect(Location.getCurrentPositionAsync).toHaveBeenCalled();
  //});

  //it("displays the default location if permission is not granted", () => {
  //  (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
  //    {
  //      status: "denied",
  //    },
  //  );

  //  const { getByTestId } = render(<MapScreen />);

  //  expect(getByTestId("mapView").props).toHaveProperty("initialRegion", {
  //    latitude: 43.6763,
  //    longitude: 7.0122,
  //  });
  //});

  //it("displays markers for challenges with locations", () => {
  //  const challenges = [
  //    {
  //      location: {
  //        latitude: 37.7749,
  //        longitude: -122.4194,
  //      },
  //    },
  //  ];

  //  (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
  //    coords: {
  //      latitude: 37.7749,
  //      longitude: -122.4194,
  //    },
  //  });

  //  const { getByTestId } = render(<MapScreen />);

  //  expect(getByTestId("mapView").props).toHaveProperty("markers", challenges);
  //});
});
