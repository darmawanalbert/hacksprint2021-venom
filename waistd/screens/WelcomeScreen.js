import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

import { DeeplinkAppButton, DeeplinkWebButton, Emoji } from '../components';

function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Welcome Screen</Text>
            <Button
                title="Go to Recommendation Screen"
                onPress={() => navigation.navigate('Recommendation')}
            />
            <DeeplinkAppButton />
            <DeeplinkWebButton />
            <StatusBar style="auto" />
            <Emoji mood="fear" />
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

export default WelcomeScreen;
