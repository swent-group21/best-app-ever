import React from "react";
import { render } from "@testing-library/react-native";
import ProfileScreen from "@/app/screens/home/profile_screen";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { launchImageLibraryAsync } from "expo-image-picker";
import FirestoreCtrl, { DBUser } from "@/firebase/FirestoreCtrl";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { resetEmail, resetPassword, logOut } from "@/types/Auth";

const Stack = createNativeStackNavigator();

// Mock the firestoreCtrl
const mockFirestoreCtrl = new FirestoreCtrl();

// Mock the guest user
const mockGuestUser: DBUser = {
  name: "Guest",
  uid: "123",
  email: "guest@example.com",
  image_id: "test-image-id",
  createdAt: new Date(),
};

// Mock the user
const mockUser: DBUser = {
  name: "Test User",
  uid: "321",
  email: "test@example.com",
  image_id: "test-image-id",
  createdAt: new Date(),
};

// Mock setUser
const setUser = jest.fn();

const ProfileScreenTest: React.FC<{ user: DBUser }> = ({ user }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Profile"
        >
          {(props) => (
            <ProfileScreen
              {...props}
              user={user}
              setUser={setUser}
              firestoreCtrl={mockFirestoreCtrl}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Test if the screen renders correctly
describe("ProfileScreen", () => {
   it("renders the profile screen correctly", () => {
     const { getByText } = render(<ProfileScreenTest user={mockUser} />);
  
     expect(getByText("Your profile")).toBeTruthy(); // Verify the title renders
     expect(getByText("Change your email")).toBeTruthy(); // Verify email button renders
     expect(getByText("Change your password")).toBeTruthy(); // Verify password button renders
     expect(getByText("Log Out")).toBeTruthy(); // Verify logout button renders
   });
  });
  
// Test if the screen render properly for a guest user
describe("ProfileScreen - Guest User", () => {
  it("renders the profile screen correctly for a guest user", () => {
    const { getByText, getByTestId } = render(<ProfileScreenTest user={mockGuestUser} />);

    expect(getByText("You are not logged in !")).toBeTruthy(); // Verify the title renders
    expect(getByTestId("sign-in-button")).toBeTruthy(); // Verify the sign in button renders
  });
});

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    cancelled: false,
    uri: "test-image-uri",
  }),
}));

jest.mock("@/types/Auth", () => ({
  logOut: jest.fn(),
  resetEmail: jest.fn(),
  resetPassword: jest.fn(),
}));

describe("ProfileScreen - Log Out", () => {
   it("calls logOut when the log out button is pressed", async () => {
     const { getByText } = render(<ProfileScreenTest user={mockUser} />);
  
     const logOutButton = getByText("Log Out");
  
     await fireEvent.press(logOutButton);
  
     expect(logOut).toHaveBeenCalled();
   });
});

describe("ProfileScreen - Change Email", () => {
   it("displays the email alert when the 'Change your email' button is pressed", () => {
     const { getByText } = render(<ProfileScreenTest user={mockUser} />);
  
     const changeEmailButton = getByText("Change your email");
     fireEvent.press(changeEmailButton);
  
     expect(resetEmail).toHaveBeenCalled();
   });
});

describe("ProfileScreen - Change Password", () => {
   it("displays the password alert when the 'Change your password' button is pressed", () => {
     const { getByText } = render(<ProfileScreenTest user={mockUser} />);
  
     const changePasswordButton = getByText("Change your password");
     fireEvent.press(changePasswordButton);
  
     expect(resetPassword).toHaveBeenCalled();
   });
});

describe("ProfileScreen - Sign-In as Guest", () => {
    it("displays the sign-in alert when the 'Sign In' button is pressed", () => {
      const { getByText } = render(<ProfileScreenTest user={mockGuestUser} />);
    
      const signInButton = getByText("Sign In");
      fireEvent.press(signInButton);
    
      expect(logOut).toHaveBeenCalled();
    });
  });
