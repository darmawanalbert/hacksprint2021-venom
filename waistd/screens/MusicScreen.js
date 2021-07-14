import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

import { MusicCarousel } from '../components';
import colors from '../utils/colors';

function MusicScreen({ route }) {
    const { mood } = route.params;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <MusicCarousel mood={mood} />
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

export default MusicScreen;
