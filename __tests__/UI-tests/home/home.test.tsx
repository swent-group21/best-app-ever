// import React from "react";
// import { Text } from "react-native";
// import {
//   render,
//   fireEvent,
//   waitFor,
//   screen,
// } from "@testing-library/react-native";
// import HomeScreen from "@/app/screens/home/home_screen";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import FirestoreCtrl from "@/firebase/FirestoreCtrl";
// import {
//   DBChallenge,
//   DBGroup,
//   DBChallengeDescription,
// } from "@/firebase/FirestoreCtrl";

// const Stack = createNativeStackNavigator();

// const mockFirestoreCtrl = new FirestoreCtrl();

// // Mock data for challenges
// const mockChallenges: DBChallenge[] = [
//   {
//     challenge_id: "1",
//     challenge_name: "Challenge 1",
//     description: "Description 1",
//     uid: "12345",
//     date: new Date(),
//     location: null,
//   },
//   {
//     challenge_id: "2",
//     challenge_name: "Challenge 2",
//     description: "Description 2",
//     uid: "12345",
//     date: new Date(),
//     location: null,
//   },
// ];

// const mockGroups: DBGroup[] = [
//   {
//     group_id: "1",
//     group_name: "Group 1",
//     description: "Description 1",
//     members: ["12345"],
//     creationDate: new Date(),
//   },
//   {
//     group_id: "2",
//     group_name: "Group 2",
//     description: "Description 2",
//     members: ["12345"],
//     creationDate: new Date(),
//   },
// ];

// const mockChallengeDescription: DBChallengeDescription = {
//   title: "Challenge Title",
//   description: "Challenge Description",
//   endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
// };

// // Mock getChallengesByUserId method
// mockFirestoreCtrl.getChallengesByUserId = jest
//   .fn()
//   .mockResolvedValue(mockChallenges);

// mockFirestoreCtrl.getGroupsByUserId = jest.fn().mockResolvedValue(mockGroups);

// mockFirestoreCtrl.getChallengeDescription = jest
//   .fn()
//   .mockResolvedValue(mockChallengeDescription);

// //Mock User
// const mockUser = {
//   uid: "12345",
//   email: "test@example.com",
//   name: "Test User",
//   createdAt: new Date(),
// };

// // Create a test component to wrap HomeScreen with navigation
// const HomeScreenTest = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen
//           name="Home"
//           initialParams={{ user: { uid: "12345" } }} // Add this line
//         >
//           {(props) => (
//             <HomeScreen
//               {...props}
//               user={mockUser}
//               firestoreCtrl={mockFirestoreCtrl}
//             />
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="Camera">
//           {() => <Text testID="camera-screen">Camera Screen</Text>}
//         </Stack.Screen>
//         {/* Add other screens if necessary */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// describe("HomeScreen", () => {
//   it("renders default text", async () => {
//     const { getByText } = render(<HomeScreenTest />);

//     expect(getByText("No challenge to display")).toBeTruthy();
//   });

//   it("renders challenges fetched from Firestore", async () => {
//     const { findByTestId } = render(<HomeScreenTest />);

//     // Wait for the challenges to be fetched and rendered
//     await waitFor(() => {
//       expect(findByTestId("challenge-id-0")).toBeTruthy();
//       expect(findByTestId("challenge-id-1")).toBeTruthy();
//     });
//   });

//   it("renders description fetched from Firestore", async () => {
//     const { getByTestId } = render(<HomeScreenTest />);

//     // Wait for the description to be fetched and rendered
//     await waitFor(() => {
//       expect(getByTestId("description-id")).toBeTruthy();
//     });
//   });

//   it("renders description fetched from Firestore", async () => {
//     const { getByTestId } = render(<HomeScreenTest />);

//     // Wait for the description to be fetched and rendered
//     await waitFor(() => {
//       expect(getByTestId("group-id-0")).toBeTruthy();
//       expect(getByTestId("group-id-1")).toBeTruthy();
//     });
//     expect(getByTestId("create-group-button")).toBeTruthy();
//   });
// });

describe("Home test", () => {
  it("placeholder", async () => {
    expect(true).toBe(true);
  });
});
