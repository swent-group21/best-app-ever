import React from 'react';
import { render } from '@testing-library/react-native';
import WelcomeScreens from '../app/(tabs)/welcome_screens'; // Adjust the import path accordingly

describe('WelcomeScreens Component', () => {
    test('should render correctly', () => {
        const { getByText } = render(<WelcomeScreens />);
        
        // Check if the welcome message is rendered
        expect(getByText('Welcome to the App')).toBeTruthy();
    });

    test('should have a button to get started', () => {
        const { getByText } = render(<WelcomeScreens />);
        
        // Check if the "Get Started" button is rendered
        expect(getByText('Get Started')).toBeTruthy();
    });

    // Add more tests as needed
});