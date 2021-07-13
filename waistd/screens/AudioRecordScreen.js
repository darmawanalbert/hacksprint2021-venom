import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { StandardButton, AudioRecordIndicator } from '../components';
import colors from '../utils/colors';

// Taken from https://docs.expo.io/versions/latest/sdk/audio/ with modifications
function AudioRecordScreen({ navigation }) {
    const questionList = [
        'How are you feeling today?',
        'How are you?',
        'How you doin\'?',
        'How do you feel?'
    ];
    const questionIndex = Math.floor(Math.random() * questionList.length);
    const questionString = questionList[questionIndex];

    const [recording, setRecording] = useState();
    const [sound, setSound] = useState();
    const [uri, setUri] = useState('');
    const [question, setQuestion] = useState(questionString);

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
                        <Text style={styles.heading}>{`"${question}"`}</Text>
                        <Text style={styles.microText}>Press the Analyse Mood button to continue.</Text>
                        <Text style={styles.microText}>An audio file has been recorded</Text>
                    </View>
                )
                : (
                    <View>
                        <Text style={styles.heading}>{`"${question}"`}</Text>
                        <Text style={styles.microText}>Press the record button to start answering.</Text>
                        <Text style={styles.microText}>No audio recorded yet!</Text>
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
                { typeof recording !== 'undefined' && <AudioRecordIndicator /> }
                { typeof recording === 'undefined' && uri !== '' && (
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={playSound}
                    >
                        <Ionicons name="play-outline" size={36} color={colors.primary} />
                    </TouchableOpacity>
                )}
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
    heading: {
        textAlign: 'center',
        fontSize: 24,
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
