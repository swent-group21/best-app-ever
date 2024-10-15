import React from 'react';
import { Text, View, StyleSheet, Image, Platform } from 'react-native';
import { TextInput } from "react-native"
import { Button } from "react-native"

export default function SignUp() {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    return (
        <View>
        <Text>Tell us about you !</Text>
        <TextInput
          placeholder=" Name"
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          placeholder="Surname"
          onChangeText={(text) => setSurname(text)}
        />

        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)} 
          />

        // To be changed when the navigation stack is implemented
        <Button title="Strive with us" onPress={() => alert("Sign Up")} />
        
        </View>

    );
    }