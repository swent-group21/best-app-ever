import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { router, useRouter} from 'expo-router';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ImageBackground} from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashMode } from 'expo-camera/build/legacy/Camera.types';
const { width, height } = Dimensions.get('window');

export default function CameraTest() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const router = useRouter();
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [flashMode, setFlashMode] = useState<FlashMode | string >('off');
  const [isFlashEnabled, setIsFlashEnabled] = useState(false);
 
  

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlashMode() {
    setFlashMode( current => (current === 'off' ? 'on' : 'off') );
    setIsFlashEnabled(flashMode === 'on' ? true : false);
  }
    

  return (
    <View style={styles.container}>

     {isCameraEnabled && <CameraView style={styles.camera} facing={facing} enableTorch= {isFlashEnabled} onCameraReady={() => {}} ref={camera}> 
        
        <View style={styles.buttonPlaceHolder}>
          <TouchableOpacity style={styles.changeOrientationAndFlash} onPress={ toggleCameraFacing  }>
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
          

          <TouchableOpacity
            
            style={styles.takePicture}
            onPress={() => {
              camera.current?.takePictureAsync().then(
                (picture) => {
                  setPicture(picture);
                  setIsCameraEnabled(false);
                },
                (error) => {
                  console.log(error);
                }
              );
            }}
          >
            
            <Ionicons name="radio-button-off-sharp" size={100} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.changeOrientationAndFlash} onPress={toggleFlashMode}>
            {isFlashEnabled && <  Ionicons name="flash-off" size={24} color="white" />}
            {!isFlashEnabled && <Ionicons name="flash" size={24} color="white" />}
          </TouchableOpacity>
        
        </View>
        
      </CameraView> }


        {!isCameraEnabled && <View >
        
            <ImageBackground source={{uri: picture?.uri}} style={styles.pictureBackround} />
                <TouchableOpacity style={styles.goBack} onPress={() => setIsCameraEnabled(true)}> 
                    <Ionicons name="close" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style = {styles.send} onPress={() => setIsCameraEnabled(true)}> 
                    <Ionicons name="send" size={30} color="white" />
                </TouchableOpacity>



            </View>
        }

    </View>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',

  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  picture : {
    width: width,
    height: height, 
    position: 'absolute',
    bottom: 0,
    left: 0,

    
  }, 

  pictureBackround : {
    width: width, height: height, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center'
  }, 

  goBack: {
    position: "absolute",
    top: height * 0.0,
    left: width * 0.0,
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: "transparent",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  }, 

  send: {
    position: "absolute",
    bottom: height * 0.0,
    right: width * 0.0,
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: "transparent",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  }, 
  takePicture : {
    backgroundColor: "transparent",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  changeOrientationAndFlash: {
    backgroundColor: "transparent",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  }, 

  buttonPlaceHolder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width, 
    height: height*0.3,
    bottom: 0,
    position: 'absolute',
    flex: 1,

  }
});
