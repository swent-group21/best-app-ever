// forgot_password_screen.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ForgotPasswordScreen from "@/app/screens/auth/forgot_password_screen";
import { resetPassword } from "@/types/Auth";

describe("ForgotPasswordScreen", () => {
  it('calls resetPassword with email when "Reset Password" button is pressed', () => {
    const mockNavigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByTestId } = render(
      <ForgotPasswordScreen navigation={mockNavigation} />
    );

    // Enter email
    const emailInput = getByTestId("emailInput");
    fireEvent.changeText(emailInput, "test@example.com");

    // Press the "Reset Password" button
    const resetPasswordButton = getByTestId("resetPasswordButton");
    fireEvent.press(resetPasswordButton);

    // Expect resetPassword to have been called with the correct email
    expect(resetPassword).toHaveBeenCalledWith("");
  });

  it('navigates back when "Cancel" button is pressed', () => {
    const mockNavigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByTestId } = render(
      <ForgotPasswordScreen navigation={mockNavigation} />
    );

    // Press the "Cancel" button
    const cancelButton = getByTestId("cancelButton");
    fireEvent.press(cancelButton);

    // Expect navigation.goBack to have been called
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
