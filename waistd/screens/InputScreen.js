import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

import { FrontCamera, AudioRecorder } from '../components';
import colors from '../utils/colors';

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
        justifyContent: 'center',
        backgroundColor: colors.white
    }
});

export default InputScreen;
