import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

// Taken from https://docs.expo.io/versions/latest/sdk/audio/ with modifications
function AudioRecorder() {
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
            <Button
                title={recording ? 'Stop Record' : 'Start Record'}
                onPress={recording ? stopRecording : startRecording}
            />
            <Text>{`Recording stored at: ${uri}`}</Text>
            <Button
                title="Play"
                onPress={playSound}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AudioRecorder;
