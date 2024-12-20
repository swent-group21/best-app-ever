import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MemoriesScreen from '@/src/views/home/memories_screen';

const mockNavigation = {
  navigate: jest.fn(),
};

const mockRoute = {
  params: {
    user: {
      uid: 'user123',
      name: 'Test User',
      email: 'testuser@example.com',
      image_id: 'image123',
    },
  },
};

jest.mock('@/src/viewmodels/home/MemoriesScreenViewModel', () => ({
  useMemoriesViewModel: () => ({
    userIsGuest: false,
    challenges: [
      {
        id: 'challenge1',
        title: 'Mock Challenge 1',
        date: new Date(),
      },
    ],
    icon: 'person-circle-outline',
  }),
}));

describe("Memories screen", () => {
  it('MemoriesScreen renders correctly', async () => {
    const { getByTestId, getByText } = render(
      <MemoriesScreen navigation={mockNavigation} route={mockRoute} />
    );

    // Check if the top bar is rendered
    expect(getByTestId('topBar')).toBeTruthy();

    // Check if user information is displayed
    expect(getByTestId('user-header')).toBeTruthy();

    // Check if the challenge is displayed
    expect(getByTestId('challenge-id-0')).toBeTruthy();
  });

});
