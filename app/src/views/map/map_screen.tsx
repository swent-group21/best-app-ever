import React from "react";
import { StyleSheet } from "react-native";
import MapView, { LatLng, MapMarker } from "react-native-maps";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { TopBar } from "@/components/navigation/TopBar";
import { useMapScreenViewModel } from "@/src/viewmodels/map/MapScreenViewModel";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";

export default function MapScreen({
  user,
  navigation,
  firestoreCtrl,
}: {
  user: DBUser;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  const { permission, userLocation, challengesWithLocation } =
    useMapScreenViewModel(firestoreCtrl);

  if (!permission && userLocation === undefined) {
    return (
      <ThemedView>
        <ThemedText>Getting location...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <TopBar
        title="Map"
        leftIcon="arrow-back"
        leftAction={() => navigation.goBack()}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.coords.latitude ?? 0,
          longitude: userLocation?.coords.longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomControlEnabled={true}
        mapType="standard"
        showsUserLocation={true}
        showsCompass={true}
        loadingEnabled={true}
      >
        {challengesWithLocation.map((challenge: any, index) => (
          <MapMarker
            key={index}
            testID={challenge.challenge_name}
            coordinate={{
              latitude: challenge.location.latitude,
              longitude: challenge.location.longitude,
            }}
            image={require("../../../assets/images/icon_trans.png")}
            flat={true}
            title={challenge.challenge_name}
            description={challenge.description}
          />
        ))}
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
});
