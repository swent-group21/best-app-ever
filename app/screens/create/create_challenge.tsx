
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FirestoreCtrl, { DBChallenge } from "@/firebase/FirestoreCtrl";
import { createChallenge } from '@/types/ChallengeBuilder';

const CreateChallengeScreen = () => {
  const firestoreCtrl = new FirestoreCtrl();

  const [challengeName, setChallengeName] = useState('');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [userName, setUserName] = useState('');

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageSource({ uri: result.uri });
    }
  };

  const handleCreateChallenge = async () => {
    const challengeData: DBChallenge = {
      challengeName,
      description,
      image: imageSource,
      userName, // You might fetch this from the user's profile instead
      dateTime,
    };

    const challengeId = await createChallenge(challengeData, firestoreCtrl);

    if (challengeId) {
      console.log('Challenge created with ID:', challengeId);
      // Optionally, navigate to the challenge detail screen or clear form
    } else {
      console.error('Failed to create challenge');
      // Optionally, display an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Challenge</Text>

      <TextInput
        style={styles.input}
        placeholder="Challenge Name"
        value={challengeName}
        onChangeText={setChallengeName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <Text style={styles.imagePickerText}>Select Image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Date and Time (YYYY-MM-DD HH:MM)"
        value={dateTime}
        onChangeText={setDateTime}
      />

      <Button title="Create Challenge" onPress={handleCreateChallenge} />
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
