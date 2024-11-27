import React from "react";
import { render } from "@testing-library/react-native";
import ProfileScreen from "@/app/screens/home/profile_screen";
import { fireEvent } from "@testing-library/react-native";
import * as ImagePicker from "expo-image-picker";


// Test if the screen renders correctly

describe("ProfileScreen", () => {
  it("renders the profile screen correctly", () => {
    const { getByText } = render(<ProfileScreen user={{}} navigation={{}} firestoreCtrl={{}} />);
    
    expect(getByText("Your profile")).toBeTruthy(); // Verify the title renders
    expect(getByText("Change your email")).toBeTruthy(); // Verify email button renders
    expect(getByText("Change your password")).toBeTruthy(); // Verify password button renders
    expect(getByText("Log Out")).toBeTruthy(); // Verify logout button renders
  });
});

jest.mock("expo-image-picker", () => ({
    launchImageLibraryAsync: jest.fn(() => ({
      canceled: false,
      assets: [{ uri: "test-image-uri" }],
    })),
    auth: {
        signOut: jest.fn(),
      },
  }));
  
  describe("ProfileScreen - Image Picker", () => {
    it("opens the image picker when the profile image is clicked", async () => {
      const { getByTestId } = render(<ProfileScreen user={{}} navigation={{}} firestoreCtrl={{}} />);
      const imagePickerButton = getByTestId("image-picker");
  
      await fireEvent.press(imagePickerButton);
  
      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    });
  
    it("displays the selected image", async () => {
      const { getByTestId, getByRole } = render(<ProfileScreen user={{}} navigation={{}} firestoreCtrl={{}} />);
      const imagePickerButton = getByTestId("image-picker");
  
      await fireEvent.press(imagePickerButton);
  
      const selectedImage = getByRole("image");
      expect(selectedImage.props.source.uri).toBe("test-image-uri");
    });
  });

  describe("ProfileScreen - Log Out", () => {
    it("calls signOut when the log out button is pressed", async () => {
      const mockSignOut = jest.fn();
      const { getByText } = render(<ProfileScreen user={{}} navigation={{}} firestoreCtrl={{}} />);
  
      const logOutButton = getByText("Log Out");
  
      await fireEvent.press(logOutButton);
  
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  describe("ProfileScreen - Change Email", () => {
    it("displays the email alert when the 'Change your email' button is pressed", () => {
      const { getByText } = render(<ProfileScreen user={{}} navigation={{}} firestoreCtrl={{}} />);
  
      const changeEmailButton = getByText("Change your email");
      fireEvent.press(changeEmailButton);
  
      expect(getByText("Email")).toBeTruthy();
      expect(getByText("tristan@gmail.com")).toBeTruthy();
    });
  });
