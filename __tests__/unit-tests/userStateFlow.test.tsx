// jest.mock("@/types/Auth", () => ({
//     logInWithEmail: jest.fn((email, password, firestoreCtrl, navigation) => {
//       navigation.navigate("Home");
//     }),
//   }));

// // Mock navigation 
// const navigation = {
//     navigate: jest.fn(),
// };

// import { logInWithEmail } from "@/types/Auth";
  
//   import React from "react";
//   import { render, fireEvent, waitFor } from "@testing-library/react-native";
//   import SignInScreen from "@/app/screens/auth/sign_in_screen";
//   import HomeScreen from "@/app/screens/home/home_screen";
//   import { NavigationContainer } from "@react-navigation/native";
//   import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

// // Mock FirestoreCtrl object
// const mockFirestoreCtrl = {
//   createUser: jest.fn(),
//   getUser: jest.fn(),
//   uploadImageFromUri: jest.fn(),
//   getImageUrl: jest.fn(),
//   getName: jest.fn(),
//   setName: jest.fn(),
//   getProfilePicture: jest.fn(),
//   setProfilePicture: jest.fn(),
//   newChallenge: jest.fn(),
//   getChallenge: jest.fn(),
//   getChallengesByUserId: jest.fn(),
//   getKChallenges: jest.fn(),
// };

// // Mock user data
// const mockUser = {
//   uid: "12345",
//   email: "test@example.com",
//   name: "Test User",
//   createdAt: new Date(),
// };

// // Create a test component to wrap SignInScreen and HomeScreen with navigation
// const AppTest = ({ setUser, navigation }: { setUser: jest.Mock, navigation:any }) => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="SignIn">
//           {(props) => (
//             <SignInScreen
//               {...props}
//               navigation={navigation}
//               firestoreCtrl={mockFirestoreCtrl}
//               setUser={setUser}
//             />
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="Home">
//           {(props) => (
//             <HomeScreen {...props} navigation={navigation} firestoreCtrl={mockFirestoreCtrl} user={mockUser} />
//           )}
//         </Stack.Screen>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// describe("SignInScreen Tests", () => {
//     it("authenticates and passes the user to HomeScreen", async () => {
//       // Mock setUser
//       const mockSetUser = jest.fn();

//       // Render the test app
//       const { getByTestId, debug } = render(<AppTest setUser={mockSetUser} navigation={navigation} />);
  
//       // Simulate user interactions
//       fireEvent.changeText(getByTestId("email-input"), "test@example.com");
//       fireEvent.changeText(getByTestId("password-input"), "password123");
  
//       // Debug before pressing the button
//       console.log("Before pressing sign-in:");
//       debug();
  
//       fireEvent.press(getByTestId("sign-in-button"));
  
//       // Debug after pressing the button
//       console.log("After pressing sign-in:");
//       debug();
  
//       // Wait for navigation to HomeScreen
//     //   await waitFor(() => {
//     //     expect(logInWithEmail).toHaveBeenCalledWith("test@example.com", "test@example.com", "password123", mockFirestoreCtrl, expect.any(Object));
//     //   });
//       await waitFor(() => {
//         expect(getByTestId("home-screen")).toBeTruthy(); // Verify HomeScreen renders
//       });
  
//       // Verify logInWithEmail was called
//       expect(logInWithEmail).toHaveBeenCalledWith("test@example.com", "password123", mockFirestoreCtrl, expect.any(Object));
  
//       // Verify setUser was called with the correct user data
//       expect(mockSetUser).toHaveBeenCalledWith(mockUser);
//     });
//   });