import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import {
  useForegroundPermissions,
  getCurrentPositionAsync,
} from "expo-location";

const MapScreen = () => {
  const [permission, requestPermission] = useForegroundPermissions();
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  useEffect(() => {
    async function fetchLocation() {
      await requestPermission();
      if (permission && permission.status === "granted") {
        const location = await getCurrentPositionAsync();
        setLocation(location.coords);
      }
    }
    fetchLocation();
  }, [permission]);

  if (!location) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
