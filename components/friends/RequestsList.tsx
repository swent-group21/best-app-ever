import React from "react"
import { FlatList } from "react-native"
import {FriendRequestItem} from "@/components/friends/FriendRequestItem"

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