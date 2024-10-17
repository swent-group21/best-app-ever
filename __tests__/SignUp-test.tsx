import React from 'react';
import { render } from '@testing-library/react-native';
import SignUp from '@/app/auth/sign-up'; 

describe('SignUp Component', () => {
    it('renders the name input field', () => {
        TestInputField('Name');
    });

    it('renders the surname input field', () => {
        TestInputField('Surname');
    });

    it('renders the email input field', () => {
        TestInputField('example@your.domain');
    });

    it('renders the password input field', () => {
        TestInputField('Password');
    });

    it('renders the confirm password input field', () => {
        TestInputField('Confirm Password');
    });

    it('renders the register button', () => {
        const { getByText } = render(<SignUp />);
        
        expect(getByText('Strive with us')).toBeTruthy(); 
    });

    it('renders the title', () => {
        const { getByText } = render(<SignUp />);
        
        expect(getByText('Tell us about you !')).toBeTruthy(); 
    });

    it('renders the title input', () => {
        const { getByText } = render(<SignUp />);
        
        expect(getByText('Name *')).toBeTruthy(); 
    });

    it('renders the surname input', () => {
        const { getByText } = render(<SignUp />);
        
        expect(getByText('Surname *')).toBeTruthy(); 
    });

    it('renders the email input', () => {
        const { getByText } = render(<SignUp />);
        
        expect(getByText('Email *')).toBeTruthy(); 
    });

    it('renders the password input', () => {
        const { getByText } = render(<SignUp />);
        
        expect(getByText('Password *')).toBeTruthy(); 
    });

    it('renders the confirm password input', () => {
        const { getByText } = render(<SignUp />);
        
        expect(getByText('Confirm Password *')).toBeTruthy(); 
    });

});

function TestInputField(placeholder: string) {
    const { getByPlaceholderText } = render(<SignUp />);
        
    expect(getByPlaceholderText(placeholder)).toBeTruthy(); 
}