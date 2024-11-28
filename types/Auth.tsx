import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
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
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>,
) => {
  if (email && password) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // Checks that the user exists in auth
      if (response.user) {
        // Checks that the user's info exists in the database
        const user = await firestoreCtrl
          .getUser(response.user.uid)
          .catch(() => {
            // User might not exist in the database
            firestoreCtrl
              .createUser(response.user.uid, {
                uid: response.user.uid || "",
                name: response.user.displayName || "",
                email: response.user.email || "",
                createdAt: new Date(),
              })
              .then(() => {
                alert("User did not exist. Please set up your profile.");
                setUser({
                  uid: response.user.uid || "",
                  name: response.user.displayName || "",
                  email: response.user.email || "",
                  createdAt: new Date(),
                });
                navigation.navigate("SetUser");
              });
          });
        // User exists in both auth and database
        if (user) {
          setUser(user);
          navigation.reset({
            index: 0,
            routes: [{ name: "Home", params: { user: user } }],
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
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>,
) => {
  if (userName && email && password) {
    // Creates user in auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData: DBUser = {
          uid: userCredential.user.uid,
          name: userName,
          email: email,
          createdAt: new Date(),
        };

        // Creates user in firestore
        firestoreCtrl
          .createUser(userCredential.user.uid, userData)
          .then(() => {
            setUser(userData);
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

export const signInAsGuest = async (
  firestoreCtrl: FirestoreCtrl,
  navigation: any,
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>,
) => {
  signInAnonymously(auth)
    .then((userCredential) => {
      const userData: DBUser = {
        uid: userCredential.user.uid,
        name: "Guest",
        email: "",
        createdAt: new Date(),
      };
      console.log("User data:", userData);
      firestoreCtrl
        .createUser(userCredential.user.uid, userData)
        .then(() => {
          setUser(userData);
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert("Failed to create user: " + error);
        });
    })
    .catch((error) => {
      alert("Failed to sign in as guest: " + error);
    });
}
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    alert("Error signing out: " + error);
  }
}

export const resetPassword = async (email: string) => {
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent.");
      })
      .catch((error) => {
        alert("Failed to send password reset email: " + error);
      });
  } else {
    alert("Please enter your email.");
  }
};
