import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Emoji, StandardButton, CellList, LinkButton } from '../components';
import colors from '../utils/colors';

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
                <LinkButton
                    text="Set Preferences"
                    onPress={() => navigation.navigate('Preference')}
                    style={{ marginBottom: 8 }}
                />
                <CellList navigation={navigation}/>
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
    }
});

export default MoodScreen;
