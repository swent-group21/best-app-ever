import React from "react";
import { render } from "@testing-library/react-native";
import ForgotPasswordScreen from "@/app/screens/auth/forgot_password_screen";

describe("ForgotPasswordScreen Component", () => {
  it('renders the "Forgot your Password?" title', () => {
    TestTextAppearsOnScreen("Forgot your Password ?");
  });

  it("renders the email input", () => {
    TestTextAppearsOnScreen("Email");
    TestButtonAppearsOnScreen("emailInput");
  });

  it("renders the Cancel button", () => {
    TestButtonAppearsOnScreen("cancelButton");
  });

  it("renders the Reset Password button", () => {
    TestButtonAppearsOnScreen("resetPasswordButton");
  });
});

function TestTextAppearsOnScreen(text: string) {
  const { getByText } = render(<ForgotPasswordScreen />);

  expect(getByText(text)).toBeTruthy();
}

function TestButtonAppearsOnScreen(text: string) {
  const { getByTestId } = render(<ForgotPasswordScreen />);

  expect(getByTestId(text)).toBeTruthy();
}
