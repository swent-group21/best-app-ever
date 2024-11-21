import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { LatLng, MapMarker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { BottomBar } from "@/components/navigation/BottomBar";

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
  const [permission, setPermission] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationObject | undefined>(
    undefined,
  );
  const [markers, setMarkers] = useState<LatLng[]>([]);

  /**
   * Asks for permission to access the user's location and sets the location state to the user's current location.
   */
  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status === "granted") {
          setPermission(true);
          const location = await getCurrentPositionAsync();
          setLocation(location);
        } else {
          setPermission(false);
          setLocation(defaultLocation);
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
        const markers: LatLng[] = challengesData.map((challenge: any) => ({
          latitude: challenge.coordinates.latitude,
          longitude: challenge.coordinates.longitude,
        }));
        setMarkers(markers);
        console.log("Challenges", markers);
      } catch (error) {
        console.error("Error fetching challenges: ", error);
      }
    };

    fetchChallenges();
  }, []);

  /**
   * Renders a loading message while the location is being fetched.
   */
  if (permission && location === undefined) {
    return (
      <ThemedView>
        <ThemedText>Getting location...</ThemedText>
      </ThemedView>
    );
  }

  /**
   * Renders the MapScreen component with every challenge as a marker on the map.
   */
  return (
    <ThemedView style={styles.container}>
      <MapView
        style={styles.map}
        testID="mapView"
        initialRegion={{
          latitude: location?.coords.latitude ?? 0,
          longitude: location?.coords.longitude ?? 0,
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
      <BottomBar
        leftIcon="map-outline"
        centerIcon="home-outline"
        rightIcon="trophy-outline"
        leftAction={() => navigation.navigate("MapScreen")}
        centerAction={() => navigation.navigate("Home")}
      />
    </ThemedView>
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
