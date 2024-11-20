import React from "react";
import { render } from "@testing-library/react-native";
import MapScreen from "@/app/screens/map/map_screen";

describe("MapScreen Component", () => {
  it("renders the map", () => {
    const { getByTestId } = render(<MapScreen />);

    expect(getByTestId("mapView")).toBeTruthy();
  });
});
