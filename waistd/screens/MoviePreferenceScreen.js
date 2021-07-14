import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { CloseButton } from '../components';
import colors from '../utils/colors';

function CheckboxItem({ text, isChecked = false}) {
    const screenWidth = Dimensions.get('window').width;
    const iconName = isChecked ? 'checkbox' : 'checkbox-outline';
    return (
        <TouchableOpacity style={[styles.checkboxContainer, { width: 0.8 * screenWidth }]}>
            <Ionicons name={iconName} size={32} color={colors.primary} style={styles.icon} />
            <Text style={styles.checkboxText}>{text}</Text>
        </TouchableOpacity>
    );
}

function MoviePreferenceScreen({ navigation }) {
    const screenHeight = Dimensions.get('screen').height;
    const windowHeight = Dimensions.get('window').height;
    const statusAndNavbarHeight = screenHeight - windowHeight;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={[styles.heading, { marginTop: statusAndNavbarHeight}]}>Movie Preference</Text>
            <CloseButton
                style={{
                    position: 'absolute',
                    top: statusAndNavbarHeight - 8,
                    right: 16
                }}
                onPress={() => navigation.goBack()}
            />
            <CheckboxItem text="Action" isChecked={false} />
            <CheckboxItem text="Adventure" isChecked />
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
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 8,
    },
    checkboxText: {
        fontWeight: 'normal',
        fontSize: 16,
        color: colors.secondary
    },
    icon: {
        marginRight: 8,
    }
});

export default MoviePreferenceScreen;
