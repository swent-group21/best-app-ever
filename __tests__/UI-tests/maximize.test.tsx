import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MaximizeScreen from '@/app/screens/home/maximize_screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Mock the FirestoreCtrl methods used in MaximizeScreen
const mockFirestoreCtrl = {
  getUser: jest.fn().mockResolvedValue({
    uid: '12345',
    name: 'Test User',
    email: 'test@example.com',
  }),
  // Add any other methods as needed
};

// Create a stack navigator for testing
const Stack = createNativeStackNavigator();

// Wrap MaximizeScreen with NavigationContainer and Stack.Navigator
const MaximizeScreenTest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MaximizeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MaximizeScreen">
          {(props) => <MaximizeScreen {...props} firestoreCtrl={mockFirestoreCtrl} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('MaximizeScreen', () => {
  it('renders correctly', async () => {
    const { getByText, getByTestId } = render(<MaximizeScreenTest />);

    // Wait for async operations to complete
    await waitFor(() => expect(mockFirestoreCtrl.getUser).toHaveBeenCalled());

    // Check if the user name is displayed
    expect(getByText('Test User')).toBeTruthy();

    // Check if the image is rendered
    expect(getByTestId('max-image')).toBeTruthy();

    // Check if the like button is rendered
    expect(getByTestId('like-button')).toBeTruthy();

    // Check if the comment input is rendered
    expect(getByTestId('comment-input')).toBeTruthy();

    // Check if the send button is rendered
    expect(getByTestId('send-button')).toBeTruthy();
  });

  it('allows liking the image', async () => {
    const { getByTestId } = render(<MaximizeScreenTest />);

    // Wait for the component to finish rendering
    await waitFor(() => getByTestId('like-button'));

    const likeButton = getByTestId('like-button');

    // Initially, it should not be liked (assuming 'white' is the initial color)
    expect(likeButton.props.style).toEqual(
      expect.objectContaining({
        color: 'white',
      }),
    );

    // Press the like button
    fireEvent.press(likeButton);

    // After pressing, it should be liked (assuming 'red' is the liked color)
    await waitFor(() => {
      expect(likeButton.props.style).toEqual(
        expect.objectContaining({
          color: 'red',
        }),
      );
    });
  });

  it('allows adding a comment', async () => {
    const { getByTestId, queryByText } = render(<MaximizeScreenTest />);

    const commentInput = getByTestId('comment-input');
    const sendButton = getByTestId('send-button');

    // Type a comment
    fireEvent.changeText(commentInput, 'This is a test comment');

    // Press the send button
    fireEvent.press(sendButton);

    // Wait for the comment to appear
    await waitFor(() => {
      expect(queryByText('This is a test comment')).toBeTruthy();
    });
  });
});
