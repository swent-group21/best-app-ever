import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { renderHook, act } from "@testing-library/react-native";
import FirestoreCtrl, { DBUser } from '@/src/models/firebase/FirestoreCtrl';
import { Nav } from '@/navigation/Navigation';
import useCameraViewModel from '@/src/viewmodels/camera/CameraViewModel';
import { useCameraPermissions, CameraCapturedPicture } from "expo-camera";

// Mock `expo-camera`
jest.mock("expo-camera", () => ({
  useCameraPermissions: jest.fn(),
  CameraType: {
    BACK: "back",
    FRONT: "front",
  },
  FlashMode: {
    ON: "on",
    OFF: "off",
  },
}));

jest.mock('@/src/models/firebase/FirestoreCtrl');
jest.mock("@/src/viewmodels/camera/CameraViewModel");

const mockNavigation = { navigate: jest.fn() };
const mockSetIsCameraEnabled = jest.fn();

describe('E2E Test: Create Challenge', () => {
  const mockFirestoreCtrl = new FirestoreCtrl();

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
    mockFirestoreCtrl.getChallengeDescription = jest.fn().mockResolvedValue({
      title: 'Current Challenge',
      description: 'Description of current challenge',
      endDate: new Date(),
    });
    mockFirestoreCtrl.getKChallenges = jest.fn().mockResolvedValue([]);
    mockFirestoreCtrl.newChallenge = jest.fn().mockResolvedValue(undefined);
    mockFirestoreCtrl.getUser = jest.fn().mockResolvedValue(mockUser);
    mockFirestoreCtrl.getGroupsByUserId = jest.fn().mockResolvedValue([]);
    mockFirestoreCtrl.updateGroup = jest.fn().mockResolvedValue(undefined);
    mockFirestoreCtrl.getImageUrl = jest.fn().mockResolvedValue('http://example.com/image.jpg');

    // Mock le retour de useCameraViewModel
    (useCameraViewModel as jest.Mock).mockReturnValue({
      facing: "back",
      permission: { granted: true },
      requestPermission: jest.fn(),
      camera: { current: null },
      picture: null,
      isCameraEnabled: true,
      flashMode: "off",
      isFlashEnabled: false,
      zoom: 0,
      toggleCameraFacing: jest.fn(),
      toggleFlashMode: jest.fn(),
      takePicture: jest.fn().mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        mockSetIsCameraEnabled(false);
      }),
      imageUrlGen: jest.fn().mockImplementation(() => {
        mockNavigation.navigate('CreateChallenge', { image_id: 'test-image-id', group_id: 'group_id'});
      }),      
      setIsCameraEnabled: mockSetIsCameraEnabled,
    });
  });

  it('should create a new challenge and display it in the feed', async () => {
    const setUser = jest.fn();

    const { getByTestId, getByText, queryByText } = render(
      <Nav
        isLoggedIn="Home"
        user={mockUser}
        setUser={setUser}
        firestoreCtrl={mockFirestoreCtrl}
      />
    );

    // Wait for the HomeScreen to be displayed
    await waitFor(() => getByTestId('home-screen'));

    // Ensure the feed is empty initially
    expect(queryByText('Test Challenge')).toBeNull();

    // Navigate to Camera Screen by pressing the camera icon in the BottomBar
    const bottomBarCameraIcon = getByTestId('bottom-center-icon-camera-outline');
    fireEvent.press(bottomBarCameraIcon);

    const mockPicture: CameraCapturedPicture = {
      uri: "mock-picture-uri",
      width: 1080,
      height: 1920,
      base64: "mock-base64",
    };

    const mockRoute = {
      params: {
        group_id: "mock-group-id",
      },
    };

    const { result } = renderHook(() =>
      useCameraViewModel(mockFirestoreCtrl, mockNavigation, mockRoute),
    );

    // Set the picture state directly
    act(() => {
      result.current.setIsCameraEnabled(false);
      result.current.picture = mockPicture;
    });

    await act(async () => {
      await result.current.imageUrlGen();
    });

    expect(mockFirestoreCtrl.uploadImageFromUri).toHaveBeenCalled;
    expect(mockNavigation.navigate).toHaveBeenCalledWith("CreateChallenge", {
      group_id: "mock-group-id",
      image_id: "mock-image-id",
    });

    // Wait for the Camera Screen to be displayed
    await waitFor(() => getByTestId('camera-view'));

    // Simulate taking a picture
    const takePictureButton = getByTestId('Camera-Button');
    fireEvent.press(takePictureButton);

    await waitFor(() => getByTestId('camera-view'));

    // Wait for the state update to happen (setIsCameraEnabled)
    await waitFor(() => expect(mockSetIsCameraEnabled).toHaveBeenCalledWith(false));

    // Assert that setIsCameraEnabled was called with false. Use the mock directly.
    expect(mockSetIsCameraEnabled).toHaveBeenCalledWith(false);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateChallenge', { image_id: 'test-image-id' });

    // Wait for the CreateChallenge screenT
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
    mockFirestoreCtrl.getKChallenges = jest.fn().mockResolvedValue([
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

