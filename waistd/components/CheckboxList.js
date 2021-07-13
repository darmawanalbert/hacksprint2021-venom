import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

function CheckboxList() {
    return (
        <View style={styles.container}>
            <CheckboxItem text="Action" isChecked={false} />
            <CheckboxItem text="Adventure" isChecked />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: colors.white,
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

export default CheckboxList;
