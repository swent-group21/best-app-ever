import React, { useEffect, useState } from "react";
import { Nav } from "@/navigation/Navigation";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import { NavigationContainer } from "@react-navigation/native";

import { registerRootComponent } from "expo";

function App(){
  const [isLoggedIn, setIsLoggedIn] = useState<"Welcome" | "Home">("Welcome");

  const firestoreCtrl = new FirestoreCtrl();

  return (
    <NavigationContainer>
      <Nav isLoggedIn={isLoggedIn} firestoreCtrl={firestoreCtrl}/>
    </NavigationContainer>
  );
}

registerRootComponent(App);
export default App;
