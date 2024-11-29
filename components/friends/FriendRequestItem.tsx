import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import Icon from 'react-native-vector-icons/MaterialIcons';


export const FriendRequestItem = ({ name, avatar, onAccept, onDecline }: any) => (
    <ThemedView style={styles.requestItem}>
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <ThemedView style={[styles.avatar, styles.defaultAvatar]}>
          <ThemedText style={styles.avatarText}>{name.charAt(0).toUpperCase()}</ThemedText>
        </ThemedView>
      )}
      <ThemedText style={styles.name}>{name}</ThemedText>
      <View style={styles.requestButtons}>

      {/* Accept Button with Icon */}
      <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
        <Icon name="check" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Decline Button with Icon */}
      <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
        <Icon name="close" size={30} color="#fff" />
      </TouchableOpacity>
      </View>
    </ThemedView>
  );

const styles = StyleSheet.create({
    acceptButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        height : 50,
        width : 50,
    
        
      },
      declineButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        height : 50,
        width : 50,
       
      },
      
      requestButtons: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        marginLeft: 'auto',
    
      },
    
      noRequests: {
        color: '#aaa',
        textAlign: 'center',
        marginVertical: 20,
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25, 
        backgroundColor: '#ccc',
        marginRight: 10,
      },
      defaultAvatar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#800080',
      },
      avatarText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      requestItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        backgroundColor: 'transparent',
        
        
      },
      name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});
