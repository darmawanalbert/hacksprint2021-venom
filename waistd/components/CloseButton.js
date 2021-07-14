import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../utils/colors';

function CloseButton({ onPress, style = {} }) {
    return (
        <TouchableOpacity style={[styles.container, {...style}]} onPress={onPress}>
            <Ionicons name="close" size={36} color={colors.secondary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CloseButton;
