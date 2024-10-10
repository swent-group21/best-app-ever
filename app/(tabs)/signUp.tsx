import { GoogleAuthProvider } from "../../firebase/Firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../firebase/Firebase";
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import GoogleAuthConfig from "../../firebase/GoogleAuthConfig";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
// import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() { 
  const config = Platform.select({
    web: GoogleAuthConfig.web,
    ios: GoogleAuthConfig.ios,
    android: GoogleAuthConfig.android,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  // async function HandleGoogleSignIn() {
  //   const user = await AsyncStorage.getItem("@user");
  //   if (!user) {
  //   } else {
  //     setUserInfo(JSON.parse(user));
  //   }
  // }

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