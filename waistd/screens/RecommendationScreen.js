import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

import { RecommendationIndicator } from '../components';

function RecommendationScreen() {
    return (
        <View style={styles.container}>
            <Text>Recommendation Screen</Text>
            <RecommendationIndicator />
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

export default RecommendationScreen;
