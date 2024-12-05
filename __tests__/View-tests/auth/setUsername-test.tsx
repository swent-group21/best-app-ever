import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SetUsernameScreen from "@/src/views/auth/set_up_screen";
import FirestoreCtrl from "@/src/models/firebase/FirestoreCtrl";

// Mock de SetUsernameViewModel
jest.mock("@/src/viewmodels/auth/SetUsernameViewModel", () => jest.fn());

import SetUsernameViewModel from "@/src/viewmodels/auth/SetUsernameViewModel";

describe("SetUsernameScreen Tests", () => {
  const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() };
  const mockFirestoreCtrl = new FirestoreCtrl();
  const mockSetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock des valeurs retournées par le ViewModel
    (SetUsernameViewModel as jest.Mock).mockReturnValue({
      username: "",
      image: null,
      errorMessage: null,
      handleUsernameChange: jest.fn(),
      pickImage: jest.fn(),
      upload: jest.fn(),
    });
  });

  it("renders the initial state correctly", () => {
    const { getByTestId, queryByTestId, queryByText } = render(
      <SetUsernameScreen
        user={{
          uid: "123",
          name: "Test User",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
        setUser={mockSetUser}
      />,
    );

    // Vérifie que le champ d'entrée pour le nom d'utilisateur est vide
    const usernameInput = getByTestId("usernameInput");

    // Vérifie que l'image de profil par défaut est affichée
    expect(queryByTestId("profilePicImage")).toBeNull();
    expect(getByTestId("profile-icon-button")).toBeTruthy();

    // Vérifie qu'aucun message d'erreur n'est affiché
    expect(queryByText(/Failed/)).toBeNull();
  });

  it("updates username field when typing", () => {
    const handleUsernameChangeMock = jest.fn();

    (SetUsernameViewModel as jest.Mock).mockReturnValue({
      username: "",
      image: null,
      errorMessage: null,
      handleUsernameChange: handleUsernameChangeMock,
      pickImage: jest.fn(),
      upload: jest.fn(),
    });

    const { getByTestId } = render(
      <SetUsernameScreen
        user={{
          uid: "123",
          name: "Test User",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
        setUser={mockSetUser}
      />,
    );

    const usernameInput = getByTestId("usernameInput");

    // Simule la saisie d'un texte
    fireEvent.changeText(usernameInput, "newUsername");
    expect(handleUsernameChangeMock).toHaveBeenCalledWith("newUsername");
  });

  it("displays an error message when there is an error", () => {
    (SetUsernameViewModel as jest.Mock).mockReturnValue({
      username: "",
      image: null,
      errorMessage: "Failed to pick image.",
      handleUsernameChange: jest.fn(),
      pickImage: jest.fn(),
      upload: jest.fn(),
    });

    const { getByText } = render(
      <SetUsernameScreen
        user={{
          uid: "123",
          name: "Test User",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
        setUser={mockSetUser}
      />,
    );

    // Vérifie que le message d'erreur est affiché
    const errorMessage = getByText("Failed to pick image.");
    expect(errorMessage).toBeTruthy();
  });

  it("calls pickImage when profile picture button is pressed", () => {
    const pickImageMock = jest.fn();

    (SetUsernameViewModel as jest.Mock).mockReturnValue({
      username: "",
      image: null,
      errorMessage: null,
      handleUsernameChange: jest.fn(),
      pickImage: pickImageMock,
      upload: jest.fn(),
    });

    const { getByTestId } = render(
      <SetUsernameScreen
        user={{
          uid: "123",
          name: "Test User",
          email: "test@example.com",
          createdAt: new Date(),
        }}
        navigation={mockNavigation}
        firestoreCtrl={mockFirestoreCtrl}
        setUser={mockSetUser}
      />,
    );

    const profilePicButton = getByTestId("profilePicButton");

    // Simule un appui sur le bouton de sélection d'image
    fireEvent.press(profilePicButton);
    expect(pickImageMock).toHaveBeenCalled();
  });
});
