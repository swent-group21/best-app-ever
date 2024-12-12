import React, { useState } from "react";
import { Nav } from "@/navigation/Navigation";
import FirestoreCtrl, { DBUser, backgroundTask, uploadTaskScheduled } from "@/src/models/firebase/FirestoreCtrl";
import { NavigationIndependentTree } from "@react-navigation/native";
import "../gesture-handler";
import { registerRootComponent } from "expo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<"Welcome" | "Home">("Welcome");

  const [user, setUser] = useState<DBUser | null>(null);

  const firestoreCtrl = new FirestoreCtrl();

  (async () => {
    try{
       await backgroundTask();
    } catch(error){
      console.log("Error in background task:", error);
    }
  })();

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
