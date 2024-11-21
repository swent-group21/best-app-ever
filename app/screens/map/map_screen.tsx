import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { MapMarker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

/**
 * The default location object, centered on the city of Nice, France.
 */
const defaultLocation = {
  coords: {
    latitude: 43.6763,
    longitude: 7.0122,
  },
} as LocationObject;

/**
 * The MapScreen component displays a map centered on the user's current location, if available.
 *
 * @returns The MapScreen component
 */
export default function MapScreen({ navigation, firestoreCtrl }: any) {
  const [location, setLocation] = useState<LocationObject>(defaultLocation);
  const [markers, setMarkers] = useState<MapMarker[]>([]);

  /**
   * Asks for permission to access the user's location and sets the location state to the user's current location.
   */
  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await getCurrentPositionAsync();
          if (location) setLocation(location);
        }
      } catch (error) {
        console.log("Error getting location permission or location:", error);
      }
    }

    getCurrentLocation();
  }, []);

  /**
   * Fetches all challenges from Firestore and sets the markers state to the locations of the challenges.
   */
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesData = await firestoreCtrl.getAllChallenges();
        setMarkers(challengesData.map((challenge: any) => challenge.location));
        console.log("Challenges", markers);
      } catch (error) {
        console.error("Error fetching challenges: ", error);
      }
    };

    fetchChallenges();
  }, []);

  /**
   * Renders the MapScreen component with every challenge as a marker on the map.
   */
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        testID="mapView"
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0,
          longitudeDelta: 0.0,
        }}
      >
        {markers.map((marker: any, index) => (
          <MapMarker
            key={index}
            coordinate={{
              latitude: marker.coordinates.latitude,
              longitude: marker.coordinates.longitude,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

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
