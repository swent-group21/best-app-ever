import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import FirestoreCtrl, { DBUser } from "@/firebase/FirestoreCtrl";

const { width, height } = Dimensions.get("window");

export function Challenge({ challengeDB, index, firestoreCtrl, navigation }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<DBUser>();

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

  // Display loading state or handle absence of challenge data
  if (!challengeDB) {
    return <ThemedText>Loading Challenge...</ThemedText>;
  } else {
    return (
      <ThemedView style={{ backgroundColor: "transparent" }}>
        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.8}
        >
          <ThemedView style={[styles.challenge]}>
            {/* 
              Challenge Image 
              source={{uri: challengeData.image_id}}
            */}
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
                        {"at " + challengeDB.date}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                  <ThemedIconButton
                    name="chevron-expand-outline"
                    onPress={() => {
                      navigation.navigate("MaxScreen");
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
    height: height,
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
