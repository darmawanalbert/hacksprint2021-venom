import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

function FrontCamera() {
    // PERMISSION: CAMERA
    const [hasPermission, setHasPermission] = useState(null);
    // imageData is in base64
    const [imageData, setImageData] = useState('');
    // faceDetection object
    const [faceDetected, setFaceDetected] = useState([]);

    // Take picture
    const takePicture = async () => {
        if (this.camera) {
            const { uri, width, height, exif, base64} = await this.camera.takePictureAsync({ base64: true});
            console.log('Picture URI:', uri);
            setImageData(base64);
        }
    }

    // Requesting permission
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    // Rendering phase
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    if (imageData !== '') {
        return (
            <View>
                <Image style={styles.imagePreview} source={{ uri: 'data:image/jpg;base64,' + imageData }} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.front}
                ref={ref => {
                    this.camera = ref;
                }}
                onFacesDetected={({ faces }) => setFaceDetected(faces)}
                faceDetectorSettings={{
                    mode: FaceDetector.Constants.Mode.fast,
                    detectLandmarks: FaceDetector.Constants.Landmarks.none,
                    runClassifications: FaceDetector.Constants.Classifications.none,
                    minDetectionInterval: 100,
                    tracking: true,
                }}
            >
                <View style={styles.buttonContainer}>
                    <Button
                        title="Take Picture"
                        onPress={takePicture}
                    />
                    {
                        Array.isArray(faceDetected) && faceDetected.length
                        ? <Text>Face detected!</Text>
                        : <Text>Face NOT detected</Text>
                    }
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    imagePreview: {
        width: 512,
        height: 512,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'center'
    }
});

export default FrontCamera;
