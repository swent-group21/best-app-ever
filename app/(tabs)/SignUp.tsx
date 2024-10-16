import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native'
import { Button } from 'react-native'

const {width, height} = Dimensions.get('window');


export default function SignUp() {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    return (
      
      <ScrollView>
       <View style = {styles.backround}>
          {/* Color of the backround */}

        {/* The backround image */} 
        <Image
          source={require('@/assets/images/sign-up-screen/Ellipse 3.png')}
          style={styles.backroundimage}
        />
       
        {/* Title of the screen */}
        <Text style = {styles.title}>Tell us about you !</Text>

        {/* The input fields */}
        <View style = {styles.inputColumn}>
            
            <Text style = {styles.titleinput}>Name</Text>
            <TextInput 
              style = {styles.input}
              placeholder='Name'
              placeholderTextColor="#888"
              onChangeText={(text) => setName(text)}

            />
            
            <Text style = {styles.titleinput}>Surname</Text>
            <TextInput
              style = {styles.input}
              placeholder='Surname'
              placeholderTextColor="#888"
              onChangeText={(text) => setSurname(text)}

            />

            <Text style = {styles.titleinput}>Email</Text>
            <TextInput
              style = {styles.input}
              placeholder="example@your.domain"
              placeholderTextColor="#888"
              autoComplete='email'
              inputMode='email'
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={(text) => setEmail(text)}
            />

            <Text style = {styles.titleinput}>Password</Text>
            <TextInput
              style = {styles.input}
              placeholder='Password'
              placeholderTextColor="#888"
              onChangeText={(text) => setPassword(text)}
            />

            <Text style = {styles.titleinput}>Confirm Password</Text>
            <TextInput
              style = {styles.input}
              placeholder= 'Confirm Password'
              placeholderTextColor="#888"
              onChangeText={(text) => setConfirmPassword(text)} 
              />

<TouchableOpacity style={styles.buttonStrive} onPress={() => alert('Sign Up')}>
            <Text style={styles.buttonText}>Strive with us</Text>
        </TouchableOpacity>

        
        {/* OR */}
        <Text style = {styles.or}> 
            OR
        </Text>

        {/* Sign Up buttons for Google and Facebook */}
        <TouchableOpacity style={styles.buttonContinueWith} onPress={() => alert('Sign In with Google')}>
        <View style={styles.buttonIcon}>
            <Image source={require('@/assets/images/sign-up-screen/google.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Continue with Google</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.buttonContinueWith} onPress={() => alert('Sign In with Facebook')}>
        <View style={styles.buttonIcon}>
            <Image source={require('@/assets/images/sign-up-screen/facebook.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Continue with Facebook</Text>
        </View>
        </TouchableOpacity>
        

        </View>
        {/* Register Buttons */}

        
        
        </View>

        </ScrollView>

      
    );
   
    }

    const styles = StyleSheet.create({
        input: {
          width: '100%',
          height: height * 0.06,  
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#ccc',
          paddingLeft: 20,
          marginBottom: height * 0.02,
          
          
          
        },
        title: {
          fontSize: width * 0.14,  
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'right',
          paddingTop: height * 0.12,
          paddingBottom: height * 0.05,
          
      },
        buttonStrive: {
          width: '100%',
          height: height * 0.05,  
          backgroundColor: '#E6BC95',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
      
    },

        or : {
        position : 'relative',
        textAlign: 'center',
        height : height * 0.04,
        fontSize: width * 0.03, 
        textAlignVertical: 'center',
        color: 'black',
        paddingTop: height * 0.02,

        
     }, 

     backround : {
      backgroundColor : 'white',
      flex : 1,
      alignItems : 'center',
      justifyContent : 'flex-start',
     }, 

     titleinput : {
      fontSize: width * 0.04,  
      color: 'black',
      width: '100%',
      textAlign: 'left',
      marginBottom: height * 0.01,

     }, 

     backroundimage : {
      position : 'absolute',
      top : 0,
      left : 0,
     }, 

     buttonText: {
      fontSize: width * 0.045,  
      color: 'black',
  },

  inputColumn: {
    width: '83%',
    height: '60%',
    flexDirection: 'column',       
    justifyContent: 'center', 
    alignItems: 'center',       
    gap: height * 0.001,
},

buttonContinueWith: {
  width: '100%',
  height: height * 0.05,  
  backgroundColor: '#F5F5F5',
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: height * 0.02,
},

buttonIcon: {
  flexDirection: 'row', 
  alignItems: 'center', 
},

icon: {
  width: 20, 
  height: 20, 
  marginRight: 10, 
},

  
  });



