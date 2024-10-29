import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import SignUp from '@/app/screens/auth/sign_up_screen';
import { signUpWithEmail } from "@/types/Auth";
import FirestoreCtrl from '@/firebase/FirestoreCtrl';

// Mock the firebase controller 
jest.mock('@/firebase/FirestoreCtrl', () => {
  return jest.fn().mockImplementation(() => {
    return { addUser: jest.fn() };
  });
});

// Mock the signUpWithEmail function
jest.mock('@/types/Auth', () => {
  return {
    ...jest.requireActual('@/types/Auth'),
    signUpWithEmail: jest.fn((name, email, password, firestoreCtrl, router, setError) => {
      // Simulate successful sign-up
      firestoreCtrl.addUser({ name, email });
      router.push('/screens/home/PLACEHOLDER_home_screen');
    }),
  };
});

describe('SignUp Component', () => {
  // Existing test cases...

  it('creates a new user and navigates to the home screen', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);
    const nameInput = getByPlaceholderText('Name');
    const surnameInput = getByPlaceholderText('Surname');
    const emailInput = getByPlaceholderText('example@your.domain');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signUpButton = getByText('Strive with us');

    // Simulating user input
    fireEvent.changeText(nameInput, 'John');
    fireEvent.changeText(surnameInput, 'Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    // Simulating button press
    fireEvent.press(signUpButton);

    // Assertions
    await waitFor(() => {
      expect(signUpWithEmail).toHaveBeenCalledWith(
        'John Doe',
        'john.doe@example.com',
        'password123',
        expect.any(FirestoreCtrl),
        expect.any(Object), // Router mock
        expect.any(Function) // Set error mock
      );
    });

    const firestoreCtrl = new FirestoreCtrl();
    expect(firestoreCtrl.addUser).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });
});

function TestInputField(placeholder: string) {
  const { getByPlaceholderText } = render(<SignUp />);
  expect(getByPlaceholderText(placeholder)).toBeTruthy();
}
