import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";

const defaultLocation = {
  coords: {
    latitude: 37.78825,
    longitude: -122.4324,
  },
} as LocationObject;

/**
 * The MapScreen component displays a map centered on the user's current location, if available.
 *
 * @returns The MapScreen component
 */
const MapScreen = () => {
  const [location, setLocation] = useState<LocationObject>(defaultLocation);

  useEffect(() => {
    /**
     * Asks for permission to access the user's location and sets the location state to the user's current location.
     */
    async function getCurrentLocation() {
      let { status } = await requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await getCurrentPositionAsync();
        setLocation(location);
      }
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        testID="mapView"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
