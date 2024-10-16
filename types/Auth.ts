import {
  auth,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  firebaseConfig
} from "@/firebase/Firebase";
import firestoreCtrl, { DBUser } from "@/firebase/FirestoreCtrl";

export function isValidEmail(email: string) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

export const logInWithGoogle = (
  credential: any,
  navigation: any,
  firestoreCtrl: firestoreCtrl
) => {
  signInWithCredential(auth, credential).then((result) => {
    const newUser =
      result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
    if (newUser) {
      const userData: DBUser = {
        name: result.user.displayName || "",
        email: result.user.email || "",
        createdAt: new Date(),
      };

      firestoreCtrl.createUser(result.user.uid, userData).then(() => {
        navigation.navigate("(tabs)");
      });
    } else {
      firestoreCtrl
        .getUser(result.user.uid)
        .then((user: any) => {
          if ( user ) {
            navigation.navigate("(tabs)");
          }
        })
        .catch(() => {
          // User might not exist in the database
          firestoreCtrl
            .createUser(result.user.uid, {
              name: result.user.displayName || "",
              email: result.user.email || "",
              createdAt: new Date(),
            })
            .then(() => {
              navigation.navigate("(tabs)");
            });
        });
    }
  });
};

export const logInWithEmail = async (
  email: string,
  password: string,
  firestoreCtrl: firestoreCtrl,
  navigation: any,
  setError: any
) => {
  if (email && password) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        const user = await firestoreCtrl
          .getUser(response.user.uid)
          .catch(() => {
            // User might not exist in the database
            firestoreCtrl
              .createUser(response.user.uid, {
                name: response.user.displayName || "",
                email: response.user.email || "",
                createdAt: new Date(),
              })
              .then(() => {
                navigation.navigate("(tabs)");
              });
          });
        if ( user ) {
          navigation.navigate("(tabs)");
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (e) {
      setError("Login failed. Please check your credentials.");
    }
  }
};

export const signUpWithEmail = async (
  userName: string,
  email: string,
  password: string,
  firestoreCtrl: firestoreCtrl,
  navigation: any,
  setError: any
) => {
  if (userName && email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData: DBUser = {
          name: userName,
          email: email,
          createdAt: new Date(),
        };

        firestoreCtrl
          .createUser(userCredential.user.uid, userData)
          .then(() => {
            navigation.navigate("(tabs)");
          });
      })
      .catch((error) => {
        setError("Sign Up failed. Please check your credentials.");
      });
  } else {
    setError("Please input email and password.");
  }
};

