import React from 'react';
import { render } from '@testing-library/react-native';
import SignInScreen from '../app/auth/sign-in';

describe('SignInScreen Component', () => {
    it('renders the sign in screen', () => {
        TestTextAppearsOnScreen("We've missed you");
    });
    
    it('renders the email input', () => {
        TestTextAppearsOnScreen('Email');
        TestButtonAppearsOnScreen('emailInput');
    });

    it('renders the password input', () => {
        TestTextAppearsOnScreen('Password');
        TestButtonAppearsOnScreen('passwordInput');
    });

    it('renders the sign in button', () => {
        TestTextAppearsOnScreen('Sign In');
        TestButtonAppearsOnScreen('signInButton');
    });

    it('renders the sign in with google button', () => {
        TestTextAppearsOnScreen('Continue with Google');
        TestButtonAppearsOnScreen('continueWithGoogleButton');
    });

    it('renders the sign in with facebook button', () => {
        TestTextAppearsOnScreen('Continue with Facebook');
        TestButtonAppearsOnScreen('continueWithFacebookButton');
    });

    it('renders the forgot password button', () => {
        TestTextAppearsOnScreen('Forgot Password?');
        TestButtonAppearsOnScreen('forgotPasswordButton');
    });
});

function TestTextAppearsOnScreen(text: string) {
    const { getByText } = render(<SignInScreen />);
        
    expect(getByText(text)).toBeTruthy(); 
}

function TestButtonAppearsOnScreen(text: string) {
    const { getByTestId } = render(<SignInScreen />);
        
    expect(getByTestId(text)).toBeTruthy(); 
}