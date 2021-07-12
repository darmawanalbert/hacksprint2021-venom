import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { StandardButton } from '../components';
import colors from '../utils/colors';

// Taken from https://docs.expo.io/versions/latest/sdk/audio/ with modifications
function AudioRecordScreen({ navigation }) {
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

    async function postFiles() {
        const audioString = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const payload = {
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
            audioData: audioString,
        }

        // POST method via axios
        navigation.navigate('Mood');
    }

    return (
        <View style={styles.container}>
            {
                uri !== ''
                ? (
                    <View>
                        <Text style={styles.subheading}>An audio file has been stored!</Text>
                        <Text style={styles.microText}>Press the Analyse Mood button to continue</Text>
                    </View>
                )
                : (
                    <View>
                        <Text style={styles.subheading}>No audio file stored yet!</Text>
                        <Text style={styles.microText}>Press the record button to get started</Text>
                    </View>
                )
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.recordButton}
                    onPress={recording ? stopRecording : startRecording}
                >
                    <Ionicons name={recording ? "mic-off" : "mic"} size={36} color={colors.whiteSecondary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={playSound}
                >
                    <Ionicons name="play-outline" size={36} color={colors.primary} />
                </TouchableOpacity>
            </View>
            {
                uri !== '' &&
                <StandardButton
                    text="Analyse Mood"
                    onPress={postFiles}
                />
            }
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
        alignItems: 'center',
        marginBottom: 16
    },
    recordButton: {
        borderRadius: 28,
        width: 56,
        height: 56,
        backgroundColor: colors.primary,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playButton: {
        borderRadius: 28,
        width: 56,
        height: 56,
        borderWidth: 2,
        borderColor: colors.primary,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subheading: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.secondary
    },
    microText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        color: colors.secondary,
    }
});

export default AudioRecordScreen;
