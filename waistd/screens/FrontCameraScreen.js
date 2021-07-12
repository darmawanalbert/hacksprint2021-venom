import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import colors from '../utils/colors';
import { StandardButton } from '../components';

// Taken from https://docs.expo.io/versions/latest/sdk/camera/ with modifications
function FrontCameraScreen({ navigation }) {
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
            <View style={styles.imagePreviewContainer}>
                <Image style={styles.imagePreview} source={{ uri: 'data:image/jpg;base64,' + imageData }} />
                <StandardButton text="Continue" onPress={() => navigation.navigate('AudioRecord')} />
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
                    <View style={styles.faceIndicator}>
                        {
                            Array.isArray(faceDetected) && faceDetected.length
                            ? <Text style={styles.faceIndicatorText}>Face Detected</Text>
                            : <Text style={styles.faceIndicatorText}>Face Not Detected</Text>
                        }
                    </View>
                    <TouchableOpacity style={styles.takePictureButton} onPress={takePicture} />
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
    imagePreviewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start"
    },
    imagePreview: {
        width: 512,
        height: 512,
        marginBottom: 16
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        margin: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    takePictureButton: {
        backgroundColor: colors.white,
        borderRadius: 28,
        width: 56,
        height: 56
    },
    faceIndicator: {
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 12,
        opacity: 0.3,
        backgroundColor: 'black'
    },
    faceIndicatorText: {
        color: colors.white
    }
});

export default FrontCameraScreen;
