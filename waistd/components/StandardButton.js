import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import colors from '../utils/colors';

function StandardButton({ text, onPress }) {
    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: colors.whiteSecondary,
        textAlign: 'center'
    }
});

export default StandardButton;
