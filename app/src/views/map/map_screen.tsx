import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { MapCircle, MapMarker } from "react-native-maps";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { TopBar } from "@/components/navigation/TopBar";
import { useMapScreenViewModel } from "@/src/viewmodels/map/MapScreenViewModel";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";

/**
 * Screen for the map
 * @param user : user object
 * @param navigation : navigation object
 * @param firestoreCtrl : FirestoreCtrl object
 * @returns : a screen for the map
 */
export default function MapScreen({
  user,
  navigation,
  firestoreCtrl,
  route,
}: {
  readonly user: DBUser;
  readonly navigation: any;
  readonly firestoreCtrl: FirestoreCtrl;
  readonly route: any;
}) {
  const firstLocation = route.params?.location;
  const geoRestriction = route.params?.challengeArea;
  const {
    userLocation,
    challengesWithLocation,
    navigateGoBack,
    challengeArea,
    isMapReady,
    setIsMapReady,
  } = useMapScreenViewModel(
    firestoreCtrl,
    navigation,
    firstLocation,
    geoRestriction,
  );

  const uri = "@/assets/images/icon_trans.png";

  if (userLocation === undefined || challengesWithLocation === undefined) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <ThemedText style={styles.loadingText}>
          Loading, this may take some time...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <TopBar
        title="Map"
        leftIcon="arrow-back"
        leftAction={() => navigateGoBack()}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomControlEnabled={true}
        mapType="standard"
        showsUserLocation={true}
        showsCompass={true}
        loadingEnabled={true}
        onMapReady={() => {
          setIsMapReady(true);
        }}
      >
        {isMapReady &&
          challengesWithLocation.map((challenge: any, index) => (
            <MapMarker
              key={index}
              testID={challenge.challenge_name}
              coordinate={{
                latitude: challenge.location.latitude,
                longitude: challenge.location.longitude,
              }}
              image={require(uri)}
              flat={true}
              title={challenge.challenge_name}
              description={challenge.description}
              onCalloutPress={() => {
                navigation.navigate("Maximize", {
                  challenge: challenge,
                  user: user,
                  firestoreCtrl: firestoreCtrl,
                });
              }}
            />
          ))}
        {isMapReady && challengeArea && (
          <MapCircle
            center={{
              latitude: challengeArea.center.latitude,
              longitude: challengeArea.center.longitude,
            }}
            radius={challengeArea.radius}
            strokeWidth={1}
            strokeColor="#000000"
            fillColor="rgba(0,0,0,0.2)"
          />
        )}
      </MapView>
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
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
});
