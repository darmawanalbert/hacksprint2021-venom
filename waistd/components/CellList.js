import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';


function CellItem({ text, iconName, onPress }) {
    const screenWidth = Dimensions.get('window').width;
    return (
        <TouchableOpacity style={[styles.container, { width: 0.8 * screenWidth }]} onPress={onPress}>
            <View style={styles.textContainer}>
                <Ionicons name={iconName} size={32} color={colors.whiteSecondary} style={styles.icon} />
                <Text style={styles.textContent}>{text}</Text>
            </View>
            <Ionicons name="chevron-forward" size={32} color={colors.whiteSecondary} />
        </TouchableOpacity>
    );
}

function CellList({ navigation }) {
    return (
        <View>
            <CellItem text="Music" iconName="musical-notes" onPress={() => navigation.navigate('Recommendation')}/>
            <CellItem text="Movies" iconName="film" onPress={() => navigation.navigate('Recommendation')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        backgroundColor: colors.blueDark,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContent: {
        fontWeight: 'normal',
        fontSize: 16,
        color: colors.whiteSecondary
    },
    icon: {
        marginRight: 8,
    }
});

export default CellList;
