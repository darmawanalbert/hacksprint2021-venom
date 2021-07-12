import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Emoji } from '../components';
import colors from '../utils/colors';

function MoodScreen() {
    return (
        <View style={styles.container}>
            <Emoji mood="angry" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white
    }
});

export default MoodScreen;
