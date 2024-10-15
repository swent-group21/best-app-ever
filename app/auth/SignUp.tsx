import React from 'react';
import { Text, View, StyleSheet, Image, Platform } from 'react-native';
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import {SafeAreaView} from 'react-native';

export default function SignUp() {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    return (
        <View>
        <View style = {styles.box}> </View>
        <Text style = {styles.title}>Tell us about you !</Text>
        <TextInput 
          style = {styles.input}
          placeholder='Name'
          onChangeText={(text) => setName(text)}

        />

        <TextInput
          style = {styles.input}
          placeholder='Surname'
          onChangeText={(text) => setSurname(text)}

        />

        <TextInput
          style = {styles.input}
          placeholder= 'Email'
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style = {styles.input}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style = {styles.input}
          placeholder= 'Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)} 
          />

        <Button title="Strive with us" onPress={() => alert("Sign Up")} color = '#2C2C2C' />
        
        <Text> 
            OR
        </Text>

        <Button title="Sign Up with Google" onPress={() => alert("Sign Up with Google")} />
        <Button title="Sign Up with Facebook" onPress={() => alert("Sign Up with Facebook")} />
        </View>

    );
    }

    const styles = StyleSheet.create({
        input: {
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          padding : 20,
          margin: 10,
          minWidth: 240,
          overflow: 'hidden',
          borderRadius: 10,
          position: 'relative',
        },
        title: {
          fontFamily: 'Inter-Bold',
          fontSize: 40,
          fontWeight: 700,
          left:0,
          letterSpacing: 0.15,
          lineHeight: 57,
          position: 'relative',
          textAlign: 'right',
          padding: 20,
          
      },

      buttonStrive: {
        alignItems: 'center',
        display: 'flex',
        gap : 10,
        position: 'relative',
        color: '#1E1E1E',
      
    },
  
    box : {
      height : 629, 
      width : 544,
      color: '##e6bc95',
      left : 0,
      position: 'static',
      top: 0,
      borderRadius: 244,
    }
  
  });



