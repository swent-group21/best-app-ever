// import React from "react";
// import { View, Text, Button } from "react-native";
// import { Camera, useCameraPermission, CameraDevice, useCameraDevice } from "react-native-vision-camera";

// export const CameraComponent = () => {
//     const { hasPermission, requestPermission } = useCameraPermission()
//     const devive = useCameraDevice('back')

//     if (!hasPermission) {
//         return (
//             <View>
//                 <Text>No permission</Text>
//                 <Button title="Request permission" onPress={requestPermission} />
//             </View>
//         )
//     }

//     if (!devive) {
//         return <Text>Device not found</Text>
//     }

//     else {
//         return (
//             <Camera
//                 device={devive}
//                 style={{ flex: 1 }}
//                 isActive={true}
//             />
//         )
//     }

// };
