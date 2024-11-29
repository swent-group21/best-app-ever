import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';



export const UserListItem = ({ name, username, avatar, onAdd }: any) => (
    <ThemedView style={styles.listItem}>
      {/* Avatar */}
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <ThemedView style={[styles.avatar, styles.defaultAvatar]}>
          <ThemedText style={styles.avatarText}>{name.charAt(0).toUpperCase()}</ThemedText>
        </ThemedView>
      )}
  
      {/* Nom et identifiant */}
      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.name}>{name}</ThemedText>
      </ThemedView>
  
      {/* Bouton Ajouter */}
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <ThemedText style={styles.addButtonText}>ADD</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );


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