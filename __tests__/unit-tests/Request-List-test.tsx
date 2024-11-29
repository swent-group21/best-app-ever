import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RequestList from '@/components/friends/RequestsList';

describe('RequestList', () => {
  const mockRequests = [
    { uid: '1', name: 'John Doe', image_id: 'https://example.com/avatar1.png' },
    { uid: '2', name: 'Jane Smith', image_id: null },
  ];

  const mockFirestoreCtrl = {
    acceptFriend: jest.fn(),
    rejectFriend: jest.fn(),
  };

  const mockUid = 'user-uid';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of friend requests', () => {
    const { getByText, getByTestId } = render(
       RequestList(mockRequests, mockFirestoreCtrl, mockUid)
    );

    // Verify that each friend request is rendered
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();

    // Verify that their avatars are rendered
    expect(getByTestId('friend-avatar-John Doe')).toBeTruthy();
    expect(getByTestId('friend-avatar-Jane Smith')).toBeTruthy();
  });

  it('handles accepting a friend request', () => {
    const { getByTestId } = render(
        RequestList(mockRequests, mockFirestoreCtrl, mockUid)
        );

    // Simulate pressing the accept button for John Doe
    const acceptButton = getByTestId('accept-button-John Doe');
    fireEvent.press(acceptButton);

    expect(mockFirestoreCtrl.acceptFriend).toHaveBeenCalledWith(mockUid, '1');
  });

  it('handles declining a friend request', () => {
    const { getByTestId } = render(
        RequestList(mockRequests, mockFirestoreCtrl, mockUid)
        );

    // Simulate pressing the decline button for Jane Smith
    const declineButton = getByTestId('decline-button-Jane Smith');
    fireEvent.press(declineButton);

    expect(mockFirestoreCtrl.rejectFriend).toHaveBeenCalledWith(mockUid, '2');
  });

  it('renders empty state if there are no friend requests', () => {
    const { queryByText } = render(
        RequestList([], mockFirestoreCtrl, mockUid)
        );

    expect(queryByText('John Doe')).toBeNull();
    expect(queryByText('Jane Smith')).toBeNull();
  });
});
