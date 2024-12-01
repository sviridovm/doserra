import { cameraStyles, styles } from '@/styles/commons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import processPhoto from '@/hooks/processPhoto';


export default function App() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = React.useRef<CameraView>(null);
    
    const toggleFacing = () => {
        setFacing(facing === 'back' ? 'front' : 'back');
    };

    const takePicture = async () => {
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePictureAsync({
            quality: 0.5,
            base64: true,
          });
          console.log('Photo taken:', photo);
          if (photo?.base64){
            processPhoto(photo.base64);
          } else {
            throw new Error('No photo taken');
          }

        } catch (error) {
          console.error('Error taking photo:', error);
        }
      }
    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
      }

      if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={cameraStyles.container}>
            <Text>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }
      return (
        <SafeAreaView style={cameraStyles.container}>
          <CameraView 
          facing={facing} 
          style={cameraStyles.camera} 
          ref={cameraRef}>
          </CameraView>
            <View style={cameraStyles.buttonContainer}>
              <TouchableOpacity onPress={takePicture}>
                <Text>Take Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={cameraStyles.button} onPress={toggleFacing}>
                <Text>Flip Camera</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      );

}