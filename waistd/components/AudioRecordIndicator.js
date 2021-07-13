import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PulseIndicator } from 'react-native-indicators';

import colors from '../utils/colors';

function AudioRecordIndicator() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>REC</Text>
            <PulseIndicator size={48} color={colors.red} style={{ flex: 0 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.secondary,
    },
});

export default AudioRecordIndicator;
