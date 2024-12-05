import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ForgotPasswordScreen from "@/src/views/auth/forgot_password_screen";
import ForgotPasswordViewModel from "@/src/viewmodels/auth/ForgotPasswordViewModel";

// Mock du ViewModel
jest.mock("@/src/viewmodels/auth/ForgotPasswordViewModel", () => jest.fn());

describe("ForgotPasswordScreen Tests", () => {
  const mockNavigation = { goBack: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock des valeurs retournées par le ViewModel
    (ForgotPasswordViewModel as jest.Mock).mockReturnValue({
      email: "",
      errorMessage: null,
      handleEmailChange: jest.fn(),
      handleResetPassword: jest.fn(),
    });
  });


  it("displays an error message when there is an error", () => {
    (ForgotPasswordViewModel as jest.Mock).mockReturnValue({
      email: "",
      errorMessage: "Please enter a valid email.",
      handleEmailChange: jest.fn(),
      handleResetPassword: jest.fn(),
    });

    const { getByText } = render(<ForgotPasswordScreen navigation={mockNavigation} />);

    // Vérifie que le message d'erreur est affiché
    const errorMessage = getByText("Please enter a valid email.");
    expect(errorMessage).toBeTruthy();
  });

  it("calls handleResetPassword when the reset button is pressed", () => {
    const handleResetPasswordMock = jest.fn();

    (ForgotPasswordViewModel as jest.Mock).mockReturnValue({
      email: "test@example.com",
      errorMessage: null,
      handleEmailChange: jest.fn(),
      handleResetPassword: handleResetPasswordMock,
    });

    const { getByTestId } = render(<ForgotPasswordScreen navigation={mockNavigation} />);

    const resetButton = getByTestId("resetPasswordButton");

    // Simule un appui sur le bouton de réinitialisation
    fireEvent.press(resetButton);
    expect(handleResetPasswordMock).toHaveBeenCalled();
  });

  it("navigates back when the cancel button is pressed", () => {
    const { getByTestId } = render(<ForgotPasswordScreen navigation={mockNavigation} />);

    const cancelButton = getByTestId("cancelButton");

    // Simule un appui sur le bouton d'annulation
    fireEvent.press(cancelButton);
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
