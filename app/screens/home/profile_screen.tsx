import React from "react";
import { View, Text } from "react-native";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { TopBar } from "@/components/navigation/TopBar";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from "react-native";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { BottomBar } from "@/components/navigation/BottomBar";
import { Alert } from "react-native";
import { Icon } from "react-native-elements";
import { auth } from "@/firebase/Firebase"; 


//TODO : change the colors for light mode 
const { width, height } = Dimensions.get("window");

export default function ProfileScreen({user, navigation, firestoreCtrl}: any) {

  const currentUser = auth.currentUser;
  const username = currentUser?.displayName;
 // const email = currentUser?.email;
  //const username = "test";
  const [image, setImage] = React.useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<Boolean>(auth.currentUser ? true : false);

  const signOut = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const pickImage = async () => {
    console.log("Loading image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
       
       setImage(result.assets[0].uri);
     }
   };

  return (
    <ThemedView style = {styles.bigContainer} >
     {isLoggedIn &&
     ( <><TopBar title="Your profile" leftIcon="arrow-back" leftAction={navigation.goBack} /><TouchableOpacity onPress={pickImage} style={styles.smallContainer}>
        {!image ? (
          <ThemedIconButton
            name="person-circle-outline"
            size={300}
            color="white"
            onPress={pickImage} />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}

      </TouchableOpacity><ThemedView style={styles.smallContainer}>
          <ThemedText style={styles.username}>{username}</ThemedText>
        </ThemedView><ThemedView style={styles.actionsContainer}>
          <ThemedView style={styles.row}>
            <ThemedTextButton text='Change your email' textColorType='white' darkColor="transparent" lightColor="transparent" onPress={() => Alert.alert("Email", email)} style={styles.action}> </ThemedTextButton>
            <Icon name='email' color='white' size={30} />
          </ThemedView>

          <ThemedView style={styles.row}>
            <ThemedTextButton text='Change your password' textColorType='white' darkColor="transparent" lightColor="transparent" onPress={() => Alert.alert("Email", email)} style={styles.action}>
            </ThemedTextButton>
            <Icon name='key' color='white' size={30} />
          </ThemedView>
          <ThemedView style={styles.row}>
            <ThemedTextButton text='Log Out' textColorType='white' darkColor="transparent" lightColor="transparent" onPress={() => { signOut; navigation.navigate("SignIn"); } } style={styles.action}>
            </ThemedTextButton>
            <Icon name='logout' color='white' size={30} />
          </ThemedView>

        </ThemedView></> 
        )}

        {!isLoggedIn && (
          <ThemedView style={styles.smallContainer}>
            <ThemedText style={styles.notLoggedIn}>You are not logged in !</ThemedText>
            <ThemedTextButton
              text="Sign In"
              textColorType="white"
              darkColor="transparent"
              lightColor="transparent"
              onPress={() => navigation.navigate("SignIn")}
            />
          </ThemedView>
        )}
            
        </ThemedView>  
  );
};





const styles = {
    bigContainer: {
        flex: 1,
        alignItems: "center",
        },

    smallContainer: {
        width: "100%",
        alignItems: "center",
        
       
        },

        image: {
            width: 220,
            height: 220,
            borderRadius: 100,
            marginBottom: 40,
          },

          username : {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            color: "white",
            
          },

          columnInfo : {
            flexDirection: "column",
            alignItems: "left",
          },

          logOut : {
            width: "100%",
            alignItems: "center",
            marginTop : 20, 
            borderRadius: 10,
            borderColor : "red", 
            borderWidth : 1,

            
                  }, 

           logOutView: {
                top : 0, 
                alignItems: "center",


           }, 
           action: {
            alignItems: "left",
            borderRadius: 10,
            borderColor : "transparent",
            borderWidth : 1,
            padding : 12,    
            
            flexDirection: "row",
            
           },

           actionsContainer : {
            borderRadius: 10,
            width: "95%",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#212124",
          

           }, 
           row : {  
            flexDirection : "row", 
            backgroundColor: "transparent",
            width: "100%",
            borderRadius: 10,
            justifyContent: "space-between",
            alignItems: "center",
            
           }, 
           
           notLoggedIn: {
            width: "100%",
            alignItems: "center",
            fontSize: 20,
            fontWeight: "bold",
           }

        
};