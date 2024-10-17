import React from 'react';
import { render } from '@testing-library/react-native';
import WelcomeScreens from '../app/(tabs)/welcome_screens'; 

describe('WelcomeScreens Component', () => {
    test('welcome_intro correctly displays title', () => {
        const { getByText } = render(<WelcomeScreens />);
        
        expect(getByText('So what is Strive about ?')).toBeTruthy(); 
    });

    test('welcome_concept correctly displays title', () => {
        const { getByText } = render(<WelcomeScreens />);
        
        expect(getByText('Compete with your friends and people around you\nBecome the goat and win prizes!')).toBeTruthy(); 
    });

    test('welcome_personal correctly displays title', () => {
        const { getByText } = render(<WelcomeScreens />);
        
        expect(getByText('Become the best version of yourself\nInteract with motivated people to reach your goals !')).toBeTruthy(); 
    });

    test('welcome_final correctly displays title', () => {
        const { getByText } = render(<WelcomeScreens />);
        
        expect(getByText('Ready to\nStrive?')).toBeTruthy(); 
    });
});
