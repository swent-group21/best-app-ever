import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { DBUser } from "@/firebase/FirestoreCtrl";
import { auth } from "@/firebase/Firebase";

const { width, height } = Dimensions.get("window");

export function Challenge({
  challengeDB,
  index,
  firestoreCtrl,
  navigation,
  testID,
  currentUser,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<string[]>([]);
  const [user, setUser] = useState<DBUser>();

  const challengeDate = challengeDB.date
    ? challengeDB.date.toDate()
    : new Date();

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

  useEffect(() => {
    // Fetch likes
    firestoreCtrl
      .getLikesOf(challengeDB.challenge_id ?? "")
      .then((likes: string[]) => {
        setIsLiked(likes.includes(currentUser.uid));
        setLikes(likes);
      });
  }, [challengeDB, firestoreCtrl, likes]);

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
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.8}
        >
          <ThemedView style={[styles.challenge]}>
            <Image
              source={require("@/assets/images/challenge2.png")}
              style={styles.image}
            />

            {isOpen && (
              <ThemedView style={styles.container}>
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
                        {"on " + challengeDate.toLocaleDateString()}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                  <ThemedIconButton
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
                    name={isLiked ? "heart" : "heart-outline"}
                    onPress={() => {
                      setIsLiked(!isLiked);

                      // Add or remove user id from like list
                      if (isLiked) {
                        const newLikeList = likes.filter(
                          (userId) => userId !== currentUser.uid,
                        );
                        setLikes(newLikeList);
                        firestoreCtrl.updateLikesOf(
                          challengeDB.challenge_id ?? "",
                          newLikeList,
                        );
                      } else {
                        const newLikeList = [...likes, currentUser.uid];
                        setLikes(newLikeList);
                        firestoreCtrl.updateLikesOf(
                          challengeDB.challenge_id ?? "",
                          newLikeList,
                        );
                      }
                    }}
                    size={25}
                    color={isLiked ? "red" : "white"}
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
