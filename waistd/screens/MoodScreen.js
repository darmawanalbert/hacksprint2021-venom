import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Emoji, StandardButton } from '../components';
import colors from '../utils/colors';

function MoodScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.emojiContainer}>
                <Text style={styles.heading}>Your Mood</Text>
                <Emoji mood="angry" />
                <Text style={styles.subheading}>Angry</Text>
            </View>
            <StandardButton
                text="Movies"
                onPress={() => navigation.navigate('Recommendation')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white
    },
    emojiContainer: {
        alignItems: 'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.secondary
    },
    subheading: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.angry
    }
});

export default MoodScreen;
