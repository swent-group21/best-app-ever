import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

export default function SetUsername() {
    const [username, setUsername] = React.useState("");
    return (
        <View>
            {/* Go back button */}
          <TouchableOpacity style={styles.goBack} onPress={() => alert('Go back')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    goBack : {
        position : 'absolute',
        top : height * 0.05,
        left : width * 0.05,
        width : width * 0.1,
        height : width * 0.1,
        backgroundColor : 'black',
        borderRadius : 90,
        justifyContent : 'center',
        alignItems : 'center',
      }, 
});