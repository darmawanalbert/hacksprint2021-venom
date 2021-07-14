/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 * Taken from https://github.com/catalinmiron/react-native-movie-2.0-carousel with modifications
 */
 import * as React from 'react';
 import {
     Text,
     View,
     StyleSheet,
     FlatList,
     Image,
     Dimensions,
     Animated,
     Platform,
 } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DotIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getMusic } from './api';
import colors from '../../utils/colors';
import GeniusButton from '../GeniusButton';
import DeeplinkAppButton from '../DeeplinkAppButton';

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
    <View style={styles.loadingContainer}>
        <DotIndicator size={12} count={3} color={colors.primary} style={{ flex: 0 }}/>
    </View>
);

const Backdrop = ({ music, scrollX }) => {
    return (
        <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
            <FlatList
                data={music.reverse()}
                keyExtractor={(item) => item.id + '-backdrop'}
                removeClippedSubviews={false}
                contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
                renderItem={({ item, index }) => {
                    if (!item.album_cover) {
                        return null;
                    }
                    const translateX = scrollX.interpolate({
                        inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
                        outputRange: [0, width],
                    });
                    return (
                        <Animated.View
                            removeClippedSubviews={false}
                            style={{
                                position: 'absolute',
                                width: translateX,
                                height,
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                source={{ uri: item.album_cover }}
                                style={{
                                    width,
                                    height: BACKDROP_HEIGHT,
                                    position: 'absolute',
                                }}
                            />
                        </Animated.View>
                    );
                }}
            />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'white']}
                style={{
                    height: BACKDROP_HEIGHT,
                    width,
                    position: 'absolute',
                    bottom: 0,
                }}
            />
        </View>
    );
};

export default function MusicCarousel({ mood }) {
    const [music, setMusic] = React.useState([]);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        const fetchData = async () => {
            let musicGenre = [];
            try {
                const musicGenreString = await AsyncStorage.getItem('@MusicGenre');
                if (musicGenreString != null) {
                    musicGenre = JSON.parse(musicGenreString);
                }
            } catch (err) {
                console.log(err);
            }
            const musicGenreList = musicGenre.filter(item => item.selected === true).map(item => item.name);
            const music = await getMusic(mood, musicGenreList);
            // Add empty items to create fake space
            // [empty_item, ...music, empty_item]
            setMusic([{ id: 'empty-left' }, ...music, { id: 'empty-right' }]);
        };

        if (music.length === 0) {
            fetchData(music);
        }
    }, [music]);

    if (music.length === 0) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
        <Backdrop music={music} scrollX={scrollX} />
        <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={music}
            keyExtractor={(item) => item.id}
            horizontal
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            renderToHardwareTextureAndroid
            contentContainerStyle={{ alignItems: 'center' }}
            snapToInterval={ITEM_SIZE}
            snapToAlignment='start'
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
                if (!item.album_cover) {
                    return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                }

                const inputRange = [
                    (index - 2) * ITEM_SIZE,
                    (index - 1) * ITEM_SIZE,
                    index * ITEM_SIZE,
                ];

                const translateY = scrollX.interpolate({
                    inputRange,
                    outputRange: [100, 50, 100],
                    extrapolate: 'clamp',
                });

                return (
                    <View style={{ width: ITEM_SIZE }}>
                        <Animated.View
                            style={{
                            marginHorizontal: SPACING,
                            padding: SPACING * 2,
                            alignItems: 'center',
                            transform: [{ translateY }],
                            backgroundColor: 'white',
                            borderRadius: 34,
                            }}
                        >
                            <Image
                                source={{ uri: item.album_cover }}
                                style={styles.posterImage}
                            />
                            <Text style={{ fontSize: 24, color: colors.secondary }} numberOfLines={1}>
                                {item.title}
                            </Text>
                            {
                                item.genius_link !== ''
                                ? <GeniusButton url={item.genius_link} />
                                : null
                            }
                            <Text style={{ color: colors.secondary }}>Listen on:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 16 }}>
                                {
                                    item.spotify_link !== ''
                                    ? <DeeplinkAppButton appName="spotify" url={item.spotify_link} style={{ marginHorizontal: 8 }} />
                                    : null
                                }
                                {
                                    item.youtube_link !== ''
                                    ? <DeeplinkAppButton appName="youtube" url={item.youtube_link} style={{ marginHorizontal: 8 }} />
                                    : null
                                }
                                {
                                    item.soundcloud_link !== ''
                                    ? <DeeplinkAppButton appName="soundcloud" url={item.soundcloud_link} style={{ marginHorizontal: 8 }} />
                                    : null
                                }
                            </View>
                        </Animated.View>
                    </View>
                );
            }}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
});
