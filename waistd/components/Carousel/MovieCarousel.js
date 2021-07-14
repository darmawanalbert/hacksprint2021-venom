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

import { getMovies } from './api';
import Genres from './Genres';
import colors from '../../utils/colors';

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

const Backdrop = ({ movies, scrollX }) => {
    return (
        <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
            <FlatList
                data={movies.reverse()}
                keyExtractor={(item) => item.id + '-backdrop'}
                removeClippedSubviews={false}
                contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
                renderItem={({ item, index }) => {
                    if (!item.backdrop_cover) {
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
                                source={{ uri: item.backdrop_cover }}
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

export default function MovieCarousel({ mood }) {
    const [movies, setMovies] = React.useState([]);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        const fetchData = async () => {
            const movies = await getMovies(mood);
            // Add empty items to create fake space
            // [empty_item, ...movies, empty_item]
            setMovies([{ id: 'empty-left' }, ...movies, { id: 'empty-right' }]);
        };

        if (movies.length === 0) {
            fetchData(movies);
        }
    }, [movies]);

    if (movies.length === 0) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
        <Backdrop movies={movies} scrollX={scrollX} />
        <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={movies}
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
                if (!item.poster_cover) {
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
                                source={{ uri: item.poster_cover }}
                                style={styles.posterImage}
                            />
                            <Text style={{ fontSize: 24 }} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text>{item.vote_average}</Text>
                            <Genres genres={item.genre} />
                            <Text style={{ fontSize: 12 }} numberOfLines={3}>
                                {item.overview}
                            </Text>
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
