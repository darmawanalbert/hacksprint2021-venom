// Taken from https://github.com/catalinmiron/react-native-movie-2.0-carousel with modifications
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../../utils/colors';

function Genres({ genres }) {
    return (
        <View style={styles.genres}>
            {genres.map((genre, i) => {
                return (
                    <View key={genre} style={styles.genre}>
                        <Text style={styles.genreText}>{genre}</Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    genres: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 4,
    },
    genre: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: colors.secondary,
        marginRight: 4,
        marginBottom: 4,
    },
    genreText: {
        fontSize: 9,
        color: colors.secondary
    }
});

export default Genres;
