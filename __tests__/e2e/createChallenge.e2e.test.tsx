import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FirestoreCtrl, { DBUser } from '@/src/models/firebase/FirestoreCtrl';
import { Nav } from '@/navigation/Navigation';

jest.mock('@/src/models/firebase/FirestoreCtrl');

describe('E2E Test: Create Challenge', () => {
  const firestoreCtrl = new FirestoreCtrl();

  const mockUser: DBUser = {
    uid: 'user123',
    name: 'Test User',
    email: 'testuser@example.com',
    friends: [],
    image_id: '',
    createdAt: new Date(),
    // add other properties as needed
  };

  // Mock the FirestoreCtrl methods
  beforeEach(() => {
    // Mock the getChallengeDescription method
    firestoreCtrl.getChallengeDescription = jest.fn().mockResolvedValue({
      title: 'Current Challenge',
      description: 'Description of current challenge',
      endDate: new Date(),
    });

    // Mock getKChallenges to return an empty list initially
    firestoreCtrl.getKChallenges = jest.fn().mockResolvedValue([]);

    // Mock methods involved in creating a challenge
    firestoreCtrl.newChallenge = jest.fn().mockResolvedValue(undefined);
    firestoreCtrl.getUser = jest.fn().mockResolvedValue(mockUser);
    firestoreCtrl.getGroupsByUserId = jest.fn().mockResolvedValue([]);
    firestoreCtrl.updateGroup = jest.fn().mockResolvedValue(undefined);

    // Mock getImageUrl if needed
    firestoreCtrl.getImageUrl = jest.fn().mockResolvedValue('http://example.com/image.jpg');
  });

  it('should create a new challenge and display it in the feed', async () => {
    const setUser = jest.fn();

    const { getByTestId, getByText, queryByText } = render(
      <Nav
        isLoggedIn="Home"
        user={mockUser}
        setUser={setUser}
        firestoreCtrl={firestoreCtrl}
      />
    );

    // Wait for the HomeScreen to be displayed
    await waitFor(() => getByTestId('home-screen'));

    // Ensure the feed is empty initially
    expect(queryByText('Test Challenge')).toBeNull();

    // Navigate to Camera Screen by pressing the camera icon in the BottomBar
    const bottomBarCameraIcon = getByTestId('bottom-bar-center-icon');
    fireEvent.press(bottomBarCameraIcon);

    // Wait for the Camera Screen to be displayed
    await waitFor(() => getByTestId('camera-view'));

    // Simulate taking a picture
    const takePictureButton = getByTestId('Camera-Button');
    fireEvent.press(takePictureButton);

    // Since we can't actually take a picture, we need to simulate the state after taking a picture
    // Let's assume that after taking a picture, it navigates to the CreateChallenge screen
    // Wait for the CreateChallenge screen
    await waitFor(() => getByTestId('Create-Challenge-Text'));

    // Fill in the challenge name and description
    const challengeNameInput = getByTestId('Challenge-Name-Input');
    fireEvent.changeText(challengeNameInput, 'Test Challenge');

    const descriptionInput = getByTestId('Description-Input');
    fireEvent.changeText(descriptionInput, 'This is a test challenge.');

    // Optionally toggle location switch
    const locationSwitch = getByTestId('switch-button');
    fireEvent(locationSwitch, 'valueChange', false);

    // Submit the challenge by pressing the arrow-forward icon in the BottomBar
    const submitButton = getByTestId('bottom-bar-right-icon');
    fireEvent.press(submitButton);

    // Mock the new challenge to be returned by getKChallenges
    firestoreCtrl.getKChallenges = jest.fn().mockResolvedValue([
      {
        challenge_name: 'Test Challenge',
        description: 'This is a test challenge.',
        uid: mockUser.uid,
        date: new Date(),
        image_id: 'http://example.com/image.jpg',
        likes: [],
        location: null,
        group_id: '',
      },
    ]);

    // Re-render the HomeScreen to fetch the updated challenges
    // In a real app, you might have a useEffect that listens for challenge updates
    // or you might need to trigger a refresh manually
    // For this test, we'll simulate navigation to re-render the screen
    fireEvent.press(getByTestId('bottom-bar-right-icon')); // navigate to another screen
    fireEvent.press(getByTestId('bottom-bar-left-icon')); // navigate back to Home

    // Now the HomeScreen should fetch challenges again
    await waitFor(() => getByTestId('home-screen'));

    // Wait for the new challenge to appear
    await waitFor(() => getByText('Test Challenge'));

    // Assert that the new challenge is displayed
    expect(getByText('Test Challenge')).toBeTruthy();
    expect(getByText('This is a test challenge.')).toBeTruthy();
  });
});

