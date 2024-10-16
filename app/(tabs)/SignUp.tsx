import React from 'react';
import { Text, View, StyleSheet, Image, Platform } from 'react-native';
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import {SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

export default function SignUp() {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    return (
      <ScrollView> 
       
       <View style = {styles.backround}>
       
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
        
        <Text style = {styles.or}> 
            OR
        </Text>

        <Button title="Sign Up with Google" onPress={() => alert("Sign Up with Google")} />
        <Button title="Sign Up with Facebook" onPress={() => alert("Sign Up with Facebook")} />
        </View>
        </ScrollView> 
    );
   
    }

    const styles = StyleSheet.create({
        input: {
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          padding : 20,
          margin:10,
          minWidth: 240,
          overflow: 'hidden',
          borderRadius: 10,
          position: 'relative',
          borderColor: '#d9d9d9',
          borderWidth: 0.5, 
          
          
        },
        title: {
          fontFamily: 'Inter-Bold',
          fontSize: 38,
          fontWeight: 700,
          left:0,
          letterSpacing: 0.15,
          lineHeight: 57,
          position: 'relative',
          textAlign: 'center',
          padding: 20,
          
      },
        buttonStrive: {
        alignItems: 'center',
        display: 'flex',
        gap : 10,
        position: 'relative',
        color: '#1E1E1E',
        borderRadius : 10,
        backgroundColor: '#E6BC95',
    },
  
        box : {
        height : 629, 
        width : 544,
        color: '##e6bc95',
        left : 0,
        position: 'static',
        top: 0,
        borderRadius: 244,
     }, 

        or : {
        position : 'relative',
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
        lineHeight: 10,
        fontSize: 10, 
        textAlignVertical: 'center',
     }, 

     backround : {
      backgroundColor : '#FFFFFF',
     }
  
  });



