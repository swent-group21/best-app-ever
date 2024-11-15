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
      if (response.user) {
        const user = await firestoreCtrl.getUser(response.user.uid)
        if (user) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      } else {
        console.log("Invalid credentials");
      }
    } catch (e) {
      console.log("Login failed. Please check your credentials.");
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData: DBUser = {
          name: userName,
          email: email,
          createdAt: new Date(),
        };

        console.log("User INFO \n", userCredential.user.uid, userData);
        firestoreCtrl
          .createUser(userCredential.user.uid, userData)
          .then(() => {
            navigation.navigate("SetUser");
          })
          .catch((error) => {
            console.log(
              "FirestoreCtrl failed to create user due to following error \n",
              error,
            );
          });
      })
      .catch((error) => {
        console.log("Sign Up failed. Please check your credentials.", error);
      });
  } else {
    console.log("Please input email and password.");
  }
};
