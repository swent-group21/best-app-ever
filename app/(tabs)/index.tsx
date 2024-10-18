<<<<<<< HEAD
import { GoogleAuthProvider } from "../../firebase/Firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../firebase/Firebase";
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import GoogleAuthConfig from "../../firebase/GoogleAuthConfig";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
||||||| parent of b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)
import { View, Text } from 'react-native';
=======
import React, { useState, useEffect } from "react";
import { View, Text, Platform, Button } from 'react-native';
import { logInWithGoogle, signUpWithEmail } from "@/types/Auth";
import GoogleAuthConfig from "@/types/GoogleAuthConfig";
import { GoogleAuthProvider } from "@/firebase/Firebase";
import * as Google from "expo-auth-session/providers/google";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

const firestoreCtrl = new FirestoreCtrl();

export default function HomeScreen( { navigation }: any) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");

  const config = Platform.select({
    web: GoogleAuthConfig.web,
    ios: GoogleAuthConfig.ios,
    android: GoogleAuthConfig.android,
  });

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      logInWithGoogle(credential, navigation, firestoreCtrl);
    }
  }, [response]);
>>>>>>> b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)

<<<<<<< HEAD
export default function SignUpScreen() { 
    const config = Platform.select({
    web: GoogleAuthConfig.web,
    ios: GoogleAuthConfig.ios,
    android: GoogleAuthConfig.android,
  });

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
    }
  }, [response]);

  return ( 
    <View style={styles.centered}> 
      <Text style={styles.title}>Sign up</Text> 
      <Button title="Sign up with Google" onPress={() => promptAsync()} />
    </View> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  }, 
  title: { 
    fontSize: 18, 
    marginVertical: 2, 
  }, 
  subtitle: { 
    fontSize: 14, 
    color: "#888", 
  }, 
});
||||||| parent of b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)
export default function HomeScreen() {
  return (
    <View className="bg-cover bg-sky-500 ">
      <Text className="text-3xl"> 
        HELLO THIS IS THE HOME SCREEN
      </Text>
    </View>
  );
}
=======
  return (
    <View className="bg-cover bg-sky-500 ">
      <Text className="text-3xl"> 
        HELLO THIS IS THE HOME SCREEN
      </Text>
      <Text className="text-3xl"> 
        This is another DIV
      </Text>

      <Button
        onPress={() => promptAsync()}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
>>>>>>> b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)
