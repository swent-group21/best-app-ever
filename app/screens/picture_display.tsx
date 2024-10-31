import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { View, Text, Button, Image, ImageSourcePropType} from "react-native";
import { Dimensions } from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DisplayPicture ({route}:any) {
    const {uriPicture} = route.params;
    console.log('uriPicture', uriPicture)
    return (
        <View>
            <Image source = {{uri : uriPicture}} style = {styles.image}/>
        </View>
    )
}

const styles = {
    image : {
        width: windowWidth,
        height: windowHeight
    }
}


