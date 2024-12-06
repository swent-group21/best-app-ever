import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import { ThemedText } from "../theme/ThemedText";
import { ThemedView } from "../theme/ThemedView";
import { ThemedIconButton } from "../theme/ThemedIconButton";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
} from "../../app/models/firebase/FirestoreCtrl";
import React from "react";

const { width, height } = Dimensions.get("window");

export function Challenge({
  challengeDB,
  index,
  firestoreCtrl,
  navigation,
  testID,
  currentUser,
}: {
  challengeDB: DBChallenge;
  index: number;
  firestoreCtrl: FirestoreCtrl;
  navigation: any;
  testID: string;
  currentUser: DBUser;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<string[]>([]);
  const [user, setUser] = useState<DBUser>();

  // @ts-ignore - date is a Timestamp object
  let challengeDate: Date = challengeDB.date
    ? challengeDB.date.toDate()
    : new Date();

  // Fetch user data
  useEffect(() => {
    if (challengeDB.uid) {
      const fetchUser = async () => {
        try {
          const userData = await firestoreCtrl.getUser(challengeDB.uid);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching challenges: ", error);
        }
      };
      fetchUser();
    }
  }, [user]);

  // Fetch likes data
  useEffect(() => {
    firestoreCtrl
      .getLikesOf(challengeDB.challenge_id ?? "")
      .then((likes: string[]) => {
        setIsLiked(likes.includes(currentUser.uid));
        setLikes(likes);
      });
  }, [challengeDB.challenge_id]);

  // Display loading state or handle absence of challenge data
  if (!challengeDB) {
    return <ThemedText>Loading Challenge...</ThemedText>;
  } else {
    return (
      <ThemedView
        key={index}
        testID={testID}
        style={{ backgroundColor: "transparent" }}
      >
        <TouchableOpacity
          testID="challenge-touchable"
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.8}
        >
          <ThemedView style={[styles.challenge]}>
            <Image
              testID="challenge-image"
              source={
                challengeDB.image_id
                  ? { uri: challengeDB.image_id }
                  : require("../../assets/images/no-image.svg")
              }
              style={styles.image}
            />

            {isOpen && (
              <ThemedView testID="challenge-container" style={styles.container}>
                <ThemedView
                  style={[styles.user, { justifyContent: "space-between" }]}
                >
                  <ThemedView style={styles.user}>
                    <ThemedIconButton
                      name="person-circle-outline"
                      onPress={() => {
                        /* user button */
                      }}
                      size={45}
                      color="white"
                    />
                    <ThemedView style={styles.userInfo}>
                      <ThemedText
                        lightColor="white"
                        darkColor="white"
                        type="smallSemiBold"
                      >
                        {user?.name}
                      </ThemedText>
                      <ThemedText
                        lightColor="white"
                        darkColor="white"
                        type="small"
                      >
                        {"on " + challengeDate.toUTCString()}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                  <ThemedIconButton
                    testID="expand-button"
                    name="chevron-expand-outline"
                    onPress={() => {
                      navigation.navigate("Maximize", {
                        navigation: navigation,
                        firestoreCtrl: firestoreCtrl,
                        challenge: challengeDB,
                        user: currentUser,
                      });
                    }}
                    size={25}
                    style={{ paddingRight: 8 }}
                    color="white"
                  />
                </ThemedView>
                <ThemedView style={styles.bottomBar}>
                  <ThemedIconButton
                    testID="like-button"
                    name={isLiked ? "heart" : "heart-outline"}
                    color={isLiked ? "red" : "white"}
                    size={25}
                    onPress={() => {
                      const newIsLiked = !isLiked;
                      setIsLiked(newIsLiked);

                      const newLikeList = newIsLiked
                        ? [...likes, currentUser.uid] // Liking
                        : likes.filter((userId) => userId !== currentUser.uid); // Unliking

                      setLikes(newLikeList);

                      firestoreCtrl.updateLikesOf(
                        challengeDB.challenge_id ?? "",
                        newLikeList,
                      );
                    }}
                  />
                  <ThemedIconButton
                    name="location-outline"
                    onPress={() => {
                      /* location button */
                    }}
                    size={25}
                    color="white"
                  />
                </ThemedView>
              </ThemedView>
            )}
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
    marginRight: 24,
  },
  challenge: {
    width: width - 20,
    height: height / 3,
    borderRadius: 15,
    backgroundColor: Colors.light.transparent,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    padding: 5,
    backgroundColor: "transparent",
  },
  userInfo: {
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  bottomBar: {
    flexDirection: "row",
    verticalAlign: "middle",
    justifyContent: "space-between",
    padding: 15,
    gap: 3,
    backgroundColor: "transparent",
  },
});
