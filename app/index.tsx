import React, { useEffect, useState } from "react";
import { Nav } from "@/navigation/Navigation";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

import { registerRootComponent } from "expo";

function App(){
  const [isLoggedIn, setIsLoggedIn] = useState<"Welcome" | "Home">("Welcome");

  const firestoreCtrl = new FirestoreCtrl();

  return (
    <Nav isLoggedIn={isLoggedIn} firestoreCtrl={firestoreCtrl}/>
  );
}

registerRootComponent(App);
export default App;
