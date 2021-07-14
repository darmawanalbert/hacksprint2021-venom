import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Emoji, StandardButton, LinkButton } from '../components';
import colors from '../utils/colors';

function CellItem({ text, iconName, onPress }) {
    const screenWidth = Dimensions.get('window').width;
    return (
        <TouchableOpacity style={[styles.cellItemContainer, { width: 0.8 * screenWidth }]} onPress={onPress}>
            <View style={styles.textContainer}>
                <Ionicons name={iconName} size={32} color={colors.whiteSecondary} style={styles.icon} />
                <Text style={styles.textContent}>{text}</Text>
            </View>
            <Ionicons name="chevron-forward" size={32} color={colors.whiteSecondary} />
        </TouchableOpacity>
    );
}

function MoodScreen({ route, navigation }) {
    const { mood } = route.params;
    let moodColor;
    if (mood === "anger") {
        moodColor = colors.angry;
    }
    else if (mood === "fear") {
        moodColor = colors.fear;
    }
    else if (mood === "sadness") {
        moodColor = colors.sad;
    }
    else {
        moodColor = colors.happy;
    }
    return (
        <View style={styles.container}>
            <View style={styles.emojiContainer}>
                <Text style={styles.heading}>Your Mood</Text>
                <Emoji mood={mood} />
                <Text style={[styles.subheading, {color: moodColor}]}>{mood}</Text>
                {/* <Text style={styles.microText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet turpis nec magna elementum ultrices quis sed elit. Donec in mollis sem. Vivamus fermentum tellus vitae lacus luctus, sit amet iaculis diam fermentum. Sed bibendum mauris a ullamcorper vehicula. Nam tincidunt, augue nec facilisis elementum, leo diam rhoncus nunc, blandit cursus quam risus ac libero. Vivamus semper urna nec iaculis lacinia. Curabitur non orci consequat, tempor sapien in, sagittis sapien.
                </Text> */}
            </View>
            <View>
                <Text style={styles.heading}>Recommendations</Text>
                <View style={styles.cellList}>
                    <CellItem text="Music" iconName="musical-notes" onPress={() => navigation.navigate('Movie', { mood: mood })}/>
                    <LinkButton
                        text="Music Preference"
                        onPress={() => navigation.navigate('MusicPreference')}
                        style={{ marginBottom: 8, alignSelf: 'flex-start' }}
                    />
                    <CellItem text="Movie" iconName="film" onPress={() => navigation.navigate('Movie', { mood: mood })} />
                    <LinkButton
                        text="Movie Preference"
                        onPress={() => navigation.navigate('MoviePreference')}
                        style={{ marginBottom: 8, alignSelf: 'flex-start' }}
                    />
                </View>
            </View>
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
        color: colors.secondary,
        marginVertical: 12
    },
    subheading: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.angry
    },
    microText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        color: colors.secondary,
        margin: 16
    },
    cellList: {
        marginBottom: 8,
    },
    cellItemContainer: {
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
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

export default MoodScreen;
