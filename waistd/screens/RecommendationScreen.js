import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

import { RecommendationIndicator, Carousel } from '../components';
import colors from '../utils/colors';

function RecommendationScreen() {
    return (
        <View style={styles.container}>
            {/* <Text>Recommendation Screen</Text>
            <RecommendationIndicator /> */}
            <Carousel />
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

export default RecommendationScreen;
