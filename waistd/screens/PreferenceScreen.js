import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { CheckboxList, CloseButton } from '../components';
import colors from '../utils/colors';

function PreferenceScreen({ navigation }) {
    const screenHeight = Dimensions.get('screen').height;
    const windowHeight = Dimensions.get('window').height;
    const statusAndNavbarHeight = screenHeight - windowHeight;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={[styles.heading, { marginTop: statusAndNavbarHeight}]}>Genre Preferences</Text>
            <CloseButton
                style={{
                    position: 'absolute',
                    top: statusAndNavbarHeight - 8,
                    right: 16
                }}
                onPress={() => navigation.goBack()}
            />
            <CheckboxList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    heading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.secondary,
    }
});

export default PreferenceScreen;
