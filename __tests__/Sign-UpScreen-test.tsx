import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import SignUp from "@/app/screens/auth/sign_up_screen";

describe("SignUp Component", () => {
  {
    /* Test if the input fields are rendered */
  }
  it("renders the name input field", () => {
    TestInputField("Name");
  });

  it("renders the surname input field", () => {
    TestInputField("Surname");
  });

  it("renders the email input field", () => {
    TestInputField("example@your.domain");
  });

  it("renders the password input field", () => {
    TestInputField("Password");
  });

  it("renders the confirm password input field", () => {
    TestInputField("Confirm Password");
  });

  {
    /* Test if the buttons are rendered */
  }
  it("renders the register button", () => {
    const { getByText } = render(<SignUp />);

    expect(getByText("Strive with us")).toBeTruthy();
  });

  {
    /* Test if the titles are rendered */
  }
  it("renders the title", () => {
    const { getByText } = render(<SignUp />);

    expect(getByText("Tell us about you !")).toBeTruthy();
  });

  it("renders the title input", () => {
    const { getByText } = render(<SignUp />);

    expect(getByText("Name *")).toBeTruthy();
  });

  it("renders the surname input", () => {
    const { getByText } = render(<SignUp />);

    expect(getByText("Surname *")).toBeTruthy();
  });

  it("renders the email input", () => {
    const { getByText } = render(<SignUp />);

    expect(getByText("Email *")).toBeTruthy();
  });

  it("renders the password input", () => {
    const { getByText } = render(<SignUp />);

    expect(getByText("Password *")).toBeTruthy();
  });

  it("renders the confirm password input", () => {
    const { getByText } = render(<SignUp />);

    expect(getByText("Confirm Password *")).toBeTruthy();
  });

  it("render the OR text", () => {
    const { getByText } = render(<SignUp />);
    expect(getByText("OR")).toBeTruthy();
  });

  it("render the sign up button for Google button with the correct text", () => {
    const { getByText } = render(<SignUp />);
    expect(getByText("Continue with Google")).toBeTruthy();
  });

  it("render the sign up button for Facebook button with the correct text", () => {
    const { getByText } = render(<SignUp />);
    expect(getByText("Continue with Facebook")).toBeTruthy();
  });

  it("render the backround image", () => {
    const { getByTestId } = render(<SignUp />);
    expect(getByTestId("ellipse")).toBeTruthy();
  });
});

describe("Test if input are checked for validity", () => {
  it("checks if the email is valid", () => {
    const email = "bob@e";
  });
});

function TestInputField(placeholder: string) {
  const { getByPlaceholderText } = render(<SignUp />);

  expect(getByPlaceholderText(placeholder)).toBeTruthy();
}
