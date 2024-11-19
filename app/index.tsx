import React, { useEffect, useState } from "react";
import { Nav } from "@/navigation/Navigation";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import { NavigationIndependentTree } from "@react-navigation/native";

import { registerRootComponent } from "expo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<"Welcome" | "Home">("Welcome");

  const firestoreCtrl = new FirestoreCtrl();

  return (

    <NavigationIndependentTree>
      <Nav isLoggedIn={isLoggedIn} firestoreCtrl={firestoreCtrl} />
    </NavigationIndependentTree>

  );
}

registerRootComponent(App);
export default App;
