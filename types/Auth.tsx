import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@/firebase/Firebase";
import FirestoreCtrl, { DBUser } from "@/firebase/FirestoreCtrl";

/***
 * Function to check if the email is valid
 * @param email - email to be checked
 * @returns - true if the email is valid, false otherwise
 */
export function isValidEmail(email: string) {
  let reg =
    /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
  return reg.test(email);
}

export const logInWithEmail = async (
  email: string,
  password: string,
  firestoreCtrl: FirestoreCtrl,
  navigation: any,
) => {
  if (email && password) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // Checks that the user exists in auth
      if (response.user) {
        const user = await firestoreCtrl.getUser(response.user.uid)
        if (user) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      } else {
        alert("Failed to log in. Please check your credentials.");
      }
    } catch (e) {
      alert("Failed to log in: " + e);
    }
  }
};

export const signUpWithEmail = async (
  userName: string,
  email: string,
  password: string,
  firestoreCtrl: FirestoreCtrl,
  navigation: any,
) => {
  if (userName && email && password) {
    // Creates user in auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData: DBUser = {
          name: userName,
          email: email,
          createdAt: new Date(),
        };

        // Creates user in firestore
        firestoreCtrl
          .createUser(userCredential.user.uid, userData)
          .then(() => {
            navigation.navigate("SetUser");
          })
          .catch((error) => {
            alert("Failed to create user: " + error);
          });
      })
      .catch((error) => {
        alert("Failed to create user: " + error);
      });
  } else {
    alert("Please fill in all fields.");
  }
};
