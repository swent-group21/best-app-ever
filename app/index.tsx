import React, { useState } from "react";
import { Nav } from "@/navigation/Navigation";
import FirestoreCtrl, { DBUser } from "@/firebase/FirestoreCtrl";
import { NavigationIndependentTree } from "@react-navigation/native";
import "@/gesture-handler";
import { registerRootComponent } from "expo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<"Welcome" | "Home">("Welcome");

  const [user, setUser] = useState<DBUser | null>(null);

  const firestoreCtrl = new FirestoreCtrl();

  return (
    <NavigationIndependentTree>

      <Nav
        isLoggedIn={isLoggedIn}
        user={user}
        firestoreCtrl={firestoreCtrl}
        setUser={setUser}
      />
    </NavigationIndependentTree>
  );
}

registerRootComponent(App);
export default App;
