import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../utils/colors';

function LinkButton({ text = '', onPress, style = {} }) {
    return (
        <TouchableOpacity style={[styles.container, {...style}]} onPress={onPress}>
            <Text style={styles.textLink}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4
    },
    textLink: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        color: colors.secondary,
        textDecorationLine: 'underline'
    }
});

export default LinkButton;
