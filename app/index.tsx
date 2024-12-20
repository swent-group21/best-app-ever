import React, { useState, useEffect } from "react";
import { Nav } from "@/navigation/Navigation";
import { DBUser } from "@/src/models/firebase/TypeFirestoreCtrl";
import { NavigationIndependentTree } from "@react-navigation/native";
import "../gesture-handler";
import { registerRootComponent } from "expo";
import {
  startNetworkListener,
  stopNetworkListener,
  getStoredUser,
  storeUserLocally,
} from "@/src/models/firebase/LocalStorageCtrl";
import { ActivityIndicator, View } from "react-native";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<"Welcome" | "Home">("Home");
  const [user, setUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start listening to network connectivity changes
    startNetworkListener();

    // Check if user is stored in localStorage
    getStoredUser().then((storedUser) => {
      if (storedUser !== null) {
        setUser(storedUser);
        setIsLoggedIn("Home");
        setLoading(false);
      } else {
        setIsLoggedIn("Welcome");
        setLoading(false);
      }
    });

    // Cleanup function to stop listening when the component unmounts
    return () => {
      stopNetworkListener();
    };
  }, []);

  useEffect(() => {
    if (user !== null) {
      // User has logged in
      storeUserLocally(user);
      setIsLoggedIn("Home");
    }
  }, [user]);

  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <NavigationIndependentTree>
      <Nav isLoggedIn={isLoggedIn} user={user} setUser={setUser} />
    </NavigationIndependentTree>
  );
}


function LoadingIndicator() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

registerRootComponent(App);
export default App;
