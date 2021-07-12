import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';

// Taken from https://docs.expo.io/versions/latest/sdk/audio/ with modifications
function AudioRecordScreen() {
    const [recording, setRecording] = useState();
    const [sound, setSound] = useState();
    const [uri, setUri] = useState('');

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            { uri: uri },
        );
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => { sound.unloadAsync(); }
            : undefined;
    }, [sound]);

    async function startRecording() {
        try {
            // Permission
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Start Recording!
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
        } catch (err) {
            console.error("Failed to start", err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const savedUri = recording.getURI();
        setUri(savedUri)
        console.log('Recording stopped at', savedUri);
    }

    return (
        <View style={styles.container}>
            <Text>Audio Recorder</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.recordButton}
                    onPress={recording ? stopRecording : startRecording}
                >
                    <Ionicons name={recording ? "mic-off" : "mic"} size={32} color={colors.whiteSecondary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={playSound}
                >
                    <Ionicons name="play-outline" size={32} color={colors.primary} />
                </TouchableOpacity>
            </View>
            <Text>{`Recording stored at: ${uri}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recordButton: {
        borderRadius: 24,
        width: 48,
        height: 48,
        backgroundColor: colors.primary,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playButton: {
        borderRadius: 24,
        width: 48,
        height: 48,
        borderWidth: 2,
        borderColor: colors.primary,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AudioRecordScreen;
