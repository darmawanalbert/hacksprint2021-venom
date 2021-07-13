import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { StandardButton } from '../components';
import colors from '../utils/colors';

function AboutScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>About Screen</Text>
            <StandardButton
                text="Close modal"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    }
});

export default AboutScreen;
