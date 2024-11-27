import styles from '@/styles/commons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraCapturedPicture } from 'expo-camera/build/Camera.types';

export default function App() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    // const [cameraRef, setCameraRef] = useState(React.createRef<typeof Camera>());
    // const [photo, setPhoto] = useState(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
      }

      if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
            <Text>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }
      return (
        <View style={styles.container}>
          <CameraView facing={facing}>
            <View >
              <TouchableOpacity style={styles.button}>
                <Text>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      );

}