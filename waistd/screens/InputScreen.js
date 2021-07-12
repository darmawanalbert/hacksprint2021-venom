import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

import { FrontCamera, AudioRecorder } from '../components';

function InputScreen() {
    return (
        <View style={styles.container}>
            {/* <FrontCamera /> */}
            <AudioRecorder />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default InputScreen;
