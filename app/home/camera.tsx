import { cameraStyles, styles } from '@/styles/commons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import processPhoto from '@/hooks/processPhoto';

export default function App() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = React.useRef<CameraView>(null);
    const [text, setText] = useState<string>('No Pill Identified');

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
                
                if (photo?.base64) {
                    const result = await processPhoto(photo.base64);
                    if (result) {
                        setText(result); // Update text state with the result from processPhoto
                    } else {
                        setText('Pill not identified'); // Update text if no result is returned
                    }
                } else {
                    throw new Error('No photo taken');
                }
            } catch (error) {
                console.error('Error taking photo:', error);
                setText('Error taking photo'); // Update text in case of an error
            }
        }
    };

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }
    
    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={cameraStyles.container}>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    return (
        <SafeAreaView style={cameraStyles.container}>
            <CameraView 
                facing={facing} 
                style={cameraStyles.camera} 
                ref={cameraRef}
            />
            <View style={cameraStyles.buttonContainer}>
                <TouchableOpacity onPress={takePicture} style={cameraStyles.button}>
                    <Text style={cameraStyles.buttonText}>Take Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={cameraStyles.button} onPress={toggleFacing}>
                    <Text style={cameraStyles.buttonText}>Flip</Text>
                </TouchableOpacity>
            </View>
            <View style={cameraStyles.resultContainer}>
                <Text style={cameraStyles.resultText}>{text}</Text>
            </View>
        </SafeAreaView>
    );
}