import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { Challenge } from "@/components/home/Challenge";
import { Group } from "@/components/home/Group";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedView } from "@/components/theme/ThemedView";
import { BottomBar } from "@/components/navigation/BottomBar";
import { DBChallenge, DBGroup } from "@/firebase/FirestoreCtrl";
import { getAuth } from "firebase/auth";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { Colors } from "@/constants/Colors";
import { color } from "react-native-elements/dist/helpers";


// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function HomeScreen({ user, navigation, firestoreCtrl }: { user: DBUser; navigation: any; firestoreCtrl: FirestoreCtrl }) {
  const [challenges, setChallenges] = useState<DBChallenge[]>([]);
  const [groups, setGroups] = useState<DBGroup[]>([]);

  useEffect(() => {
    if (user.uid) {
      const fetchChallenges = async () => {
        try {
          const challengesData = await firestoreCtrl.getChallengesByUserId(
            user.uid,
          );
          console.log("Challenges", challengesData);
          setChallenges(challengesData);
        } catch (error) {
          console.error("Error fetching challenges: ", error);
        }
      };

      fetchChallenges();
    }
  }, [uid]);

  useEffect(() => {
    console.log("UID", uid);
    if (uid) {
      const fetchGroups = async () => {
        try {
          const groupsData = await firestoreCtrl.getGroupsByUserId(uid);
          console.log("Groups [" + uid + "]", groupsData);
          setGroups(groupsData);
        } catch (error) {
          console.error("Error fetching groups: ", error);
        }
      };

      fetchGroups();
    }
  }, [uid]);

  return (
    <ThemedView style={styles.bigContainer} testID="home-screen">
      <TopBar
        title="Commute by foot"
        leftIcon="people-outline"
        rightIcon="person-circle-outline"
        rightAction={() => {navigation.navigate("Profile"); console.log(auth.currentUser)}}
      />

      <ThemedScrollView
        style={styles.groupsContainer}
        //colorType="transparent"
        horizontal
      >
        {groups.map((group, index) => (
          <Group
            groupDB={group}
            navigation={navigation}
            firestoreCtrl={firestoreCtrl}
            key={index}
            // Include other props as needed
          />
        ))}

        <ThemedView style={styles.createGroupContainer}>
          
            <ThemedTextButton 
                style={styles.createGroup} 
                onPress={() => {}}
                text="+"
                textStyle={styles.createGroupText}
                textColorType="textOverLight"
                colorType= "backgroundSecondary"
            >
              <ThemedText 
                  //style={styles.createGroup} 
                  colorType="textOverLight"
              >
                Create a new group
            </ThemedText>

            </ThemedTextButton>
        </ThemedView>

      </ThemedScrollView>

      {/* Challenges */}
      <ThemedScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        colorType="transparent"
      >
        {challenges.length === 0 ? (
          <ThemedText>No challenge to display</ThemedText>
        ) : (
          challenges.map((challenge, index) => (
            <Challenge
              navigation={navigation}
              firestoreCtrl={firestoreCtrl}
              key={index}
              challengeDB={challenge}
              testID={`challenge-id-${index}`}
              // Include other props as needed
            />
          ))
        )}
      </ThemedScrollView>

      <BottomBar
        testID="bottom-bar"
        leftIcon="map-outline"
        centerIcon="camera-outline"
        rightIcon="trophy-outline"
        leftAction={() => navigation.navigate("MapScreen")}
        centerAction={() => navigation.navigate("Camera")}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    borderRadius: 20,
    padding: 20,
  },

  groupsContainer: {
    width: width - 20,
    height: 0.2 * height,
    borderRadius: 15,
    backgroundColor: "transparent",
  },

  container: {
    width: "100%",
    height: "100%",
  },

  contentContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: height * 0.04,
  },

  createGroupContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    width: width * 0.23,
    height:width * 0.2,
    borderRadius: 20,
    margin: 10,
    alignItems: "center",
  },

  createGroup: {
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    borderRadius: 15,
    padding: 8,
    //gap: 6,
    color:"transparent",
    fontSize: 5,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor : "transparent",
    
  },


  createGroupText: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 60,
    fontWeight: "normal",
  }
});
