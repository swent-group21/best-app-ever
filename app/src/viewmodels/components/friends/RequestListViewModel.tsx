/**
 * Request List with all users that have sent a friend request to the current user
 * @param requests : list of users that have sent a friend request
 * @param firestoreCtrl : firestore controller
 * @param uid : current user's id
 */
export default function useRequestListViewModel({
  firestoreCtrl,
  uid,
}: {
  readonly firestoreCtrl: any;
  readonly uid: string;
}) {

  const handleAccept = (requestId: string) => {
    firestoreCtrl.acceptFriend(uid, requestId);
  };

  const handleDecline = (requestId: string) => {
    firestoreCtrl.rejectFriend(uid, requestId);
  };

  return {
    handleAccept,
    handleDecline
  };
}
