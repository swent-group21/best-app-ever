import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { LatLng, MapMarker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { TopBar } from "@/components/navigation/TopBar";
import FirestoreCtrl, { DBChallenge, DBUser } from "@/firebase/FirestoreCtrl";
// import { DBChallenge } from "@/firebase/FirestoreCtrl";

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

export default function MapScreen({
  user,
  navigation,
  firestoreCtrl,
  route,
}: {
  user: DBUser;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
  route: any;
}) {
  // Sets the first location to the location provided in the route parameters, if available.
  const firstLocation =
    route.params != undefined ? route.params.location : undefined;
  const [permission, setPermission] = useState<boolean>(false);
  const [userLocation, setUserPosition] = useState<LocationObject | undefined>(
    firstLocation,
  );
  const [challengesWithLocation, setChallengesWithLocation] = useState<
    DBChallenge[]
  >([]);

  /**
   * Asks for permission to access the user's location and sets the location state to the user's current location.
   */
  useEffect(() => {
    /**
     * Gets the user's current location and sets the location state to the user's current location.
     * This function is called only if no first location was provided when calling the MapScreen component.
     */
    async function getCurrentLocation() {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        console.log("Status: ", status);
        if (status === "granted") {
          setPermission(true);
          const location = await getCurrentPositionAsync();
          setUserPosition(location);
        } else {
          setPermission(false);
          setUserPosition(defaultLocation);
        }
      } catch (error) {
        console.log("Error getting location permission or location:", error);
      }
    }

    if (firstLocation === undefined) {
      getCurrentLocation();
    }
  }, []);

  /**
   * Fetches all challenges from Firestore and sets the markers state to the locations of the challenges.
   */
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        console.log("Fetching challenges...");
        const challengesData = await firestoreCtrl.getKChallenges(100);
        const filteredChallenges = challengesData.filter(
          (challenge: any) =>
            challenge.location !== undefined && challenge.location !== null,
        );
        setChallengesWithLocation(filteredChallenges);
        console.log("Markers", filteredChallenges);
      } catch (error) {
        console.error("Error fetching challenges: ", error);
      }
    };

    fetchChallenges();
  }, []);

  /**
   * Renders a loading message while the location is being fetched.
   */
  if (permission && userLocation === undefined) {
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
      <TopBar
        title="Map"
        leftIcon="arrow-back"
        leftAction={() => navigation.goBack()}
      />
      <MapView
        style={styles.map}
        testID="mapView"
        initialRegion={{
          latitude: userLocation?.coords.latitude ?? 0,
          longitude: userLocation?.coords.longitude ?? 0,
          latitudeDelta: 0.0,
          longitudeDelta: 0.0,
        }}
        zoomControlEnabled={true}
        mapType="standard"
        showsUserLocation={true}
        showsCompass={true}
        loadingEnabled={true}
      >
        {challengesWithLocation.map((challengeWithLocation: any, index) => (
          <MapMarker
            key={index}
            coordinate={{
              latitude: challengeWithLocation.location.latitude,
              longitude: challengeWithLocation.location.longitude,
            }}
            image={require("@/assets/images/icon_trans.png")}
            flat={true}
            title={challengeWithLocation.challenge_name}
            description={challengeWithLocation.description}
            onCalloutPress={() => {
              console.log("Challenge pressed: ", challengeWithLocation);
              navigation.navigate("Maximize", {
                challenge: challengeWithLocation,
                user: user,
                firestoreCtrl: firestoreCtrl,
              });
            }}
          />
        ))}
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
