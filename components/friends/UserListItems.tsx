import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';

export const UserListItem = ({ name, avatar, isFriend, isRequested, onAdd, onCancelRequest }: any) => {
  const [status, setStatus] = useState('ADD');

  useEffect(() => {
    if (isFriend) {
      setStatus('FRIEND');
    } else if (isRequested) {
      setStatus('REQUESTED');
    } else {
      setStatus('ADD');
    }
  }, [isFriend, isRequested]);

  const handlePress = () => {
    if (status === 'ADD') {
      onAdd();
      setStatus('REQUESTED');
    } else if (status === 'REQUESTED') {
      onCancelRequest();
      setStatus('ADD');
    }
  };

  return (
    <ThemedView style={styles.listItem}>
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <ThemedView style={[styles.avatar, styles.defaultAvatar]}>
          <ThemedText style={styles.avatarText}>{name.charAt(0).toUpperCase()}</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.name}>{name}</ThemedText>
      </ThemedView>

      {status === 'FRIEND' ? (
        <ThemedText style={styles.friendCheck}>✓</ThemedText>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handlePress} testID={`add-button-${name}`}>
          <ThemedText style={styles.addButtonText}>{status}</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  friendCheck: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#000',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  defaultAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800080',
  },
  textContainer: {
    backgroundColor: 'transparent',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
