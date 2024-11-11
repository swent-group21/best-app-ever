
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FirestoreCtrl, { DBChallenge } from "@/firebase/FirestoreCtrl";
import { createChallenge } from '@/types/ChallengeBuilder';

const CreateChallengeScreen = (image_id: any) => {
  const firestoreCtrl = new FirestoreCtrl();

  const [challenge_name, setChallengeName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDateTime] = useState('');

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Challenge</Text>

      <TextInput
        style={styles.input}
        placeholder="Challenge Name"
        value={challenge_name}
        onChangeText={setChallengeName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Date and Time (YYYY-MM-DD HH:MM)"
        value={date}
        onChangeText={setDateTime}
      />

      <Button 
        title="Create Challenge" 
        onPress={
          createChallenge(

          )
        } 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 12,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  imagePickerText: {
    color: '#888',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CreateChallengeScreen;
