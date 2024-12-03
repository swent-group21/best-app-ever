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
import FirestoreCtrl, { DBChallenge, DBUser, DBChallengeDescription } from "@/firebase/FirestoreCtrl";
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
}: {
  user: DBUser;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  const [permission, setPermission] = useState<boolean>(false);
  const [userLocation, setUserPosition] = useState<LocationObject | undefined>(
    undefined,
  );
  const [challengesWithLocation, setChallengesWithLocation] = useState<
    DBChallenge[]
  >([]);
  const [titleChallenge, setTitleChallenge] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });

  /**
   * Asks for permission to access the user's location and sets the location state to the user's current location.
   */
  useEffect(() => {
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

    getCurrentLocation();
  }, []);

  /**
   * Fetches all challenges from Firestore and sets the markers state to the locations of the challenges.
   */
  useEffect(() => {

    const fetchCurrentChallenge = async () => {
      try {
        const currentChallengeData =
          await firestoreCtrl.getChallengeDescription();

        const formattedChallenge = {
          title: currentChallengeData.Title,
          description: currentChallengeData.Description,
          endDate: new Date(currentChallengeData.Date.seconds * 1000), // Conversion Timestamp -> Date
        };

        setTitleChallenge(formattedChallenge);
        //console.log("Current Challenge: ", formattedChallenge);
      } catch (error) {
        console.error("Error fetching current challenge: ", error);
      }
    };

    const fetchChallenges = async () => {
      try {
        console.log("Fetching challenges...");
        const challengesData = await firestoreCtrl.getPostsByChallengeTitle(titleChallenge.title);
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

    fetchCurrentChallenge();
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
