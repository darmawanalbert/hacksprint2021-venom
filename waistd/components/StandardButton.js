import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DotIndicator } from 'react-native-indicators';

import colors from '../utils/colors';

function StandardButton({ text, onPress, isLoading = false }) {
    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPress}
            disabled={isLoading}
        >
            {isLoading
                ? <DotIndicator size={12} count={3} color={colors.whiteSecondary} style={styles.indicator} />
                : <Text style={styles.buttonText}>{text}</Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: colors.whiteSecondary,
        textAlign: 'center'
    },
    indicator: {
        flex: 0,
    }
});

export default StandardButton;
