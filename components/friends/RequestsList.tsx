import React from "react"
import { FlatList } from "react-native"
import {FriendRequestItem} from "@/components/friends/FriendRequestItem"


/** 
 * Request List with all users that have sent a friend request to the current user
 * @param requests : list of users that have sent a friend request
 * @param firestoreCtrl : firestore controller
 * @param uid : current user's id
 */
export default function RequestList(requests : any, firestoreCtrl : any, uid : any) {
    const handleAccept = (requestId: string) => {
        console.log(`Friend request ${requestId} accepted`);
        firestoreCtrl.acceptFriend(uid, requestId);
        };
    
      const handleDecline = (requestId: string) => {
        console.log(`Friend request ${requestId} declined`);
        firestoreCtrl.rejectFriend(uid, requestId);
      };
 return (
    <FlatList
          data={requests}
          keyExtractor={(item) => item.uid}
          style = {{position: 'relative'}}
          renderItem={({ item, index }) => (
            <FriendRequestItem
              name={item.name}
              key={index}
              avatar={item.image_id} 
              onAccept={() => handleAccept(item.uid)}
              onDecline={() => handleDecline(item.uid)}
              
            />
          )}
          
        />
 )
}