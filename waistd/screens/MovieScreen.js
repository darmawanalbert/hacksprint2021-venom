import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

import { MovieCarousel } from '../components';
import colors from '../utils/colors';

function MovieScreen({ route }) {
    const { mood } = route.params;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <MovieCarousel mood={mood} />
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

export default MovieScreen;
