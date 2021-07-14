import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CloseButton, StandardButton } from '../components';
import colors from '../utils/colors';
import musicGenreList from '../utils/musicGenreList';

function MusicPreferenceScreen({ navigation }) {
    const screenHeight = Dimensions.get('screen').height;
    const windowHeight = Dimensions.get('window').height;
    const statusAndNavbarHeight = screenHeight - windowHeight;
    const [musicGenre, setMusicGenre] = useState([]);

    const renderCheckbox = ({ item, index }) => {
        const screenWidth = Dimensions.get('window').width;
        return (
            <TouchableOpacity
                style={[styles.checkboxContainer, { width: 0.85 * screenWidth }]}
                onPress={() => {
                    setMusicGenre((prevState) => {
                        const nextState = [...prevState];
                        nextState[index].selected = !nextState[index].selected;
                        return nextState;
                    });
                    console.log(musicGenre);
                }}
            >
                {item.selected
                    ? <Ionicons name="checkbox" size={32} color={colors.primary} style={styles.icon} />
                    : <Ionicons name="checkbox-outline" size={32} color={colors.secondary} style={styles.icon} />
                }
                <Text style={styles.checkboxText}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        try {
            async function initialiseMusicGenre() {
                const musicGenreString = await AsyncStorage.getItem('@MusicGenre');
                if (musicGenreString != null) {
                    setMusicGenre(JSON.parse(musicGenreString));
                }
                else {
                    await AsyncStorage.setItem('@MusicGenre', JSON.stringify(musicGenreList));
                    setMusicGenre(musicGenreList);
                }
            }
            initialiseMusicGenre();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const savePreference = async () => {
        try {
            await AsyncStorage.setItem('@MusicGenre', JSON.stringify(musicGenre));
        } catch (err) {
            console.log(err);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={[styles.heading, { marginTop: statusAndNavbarHeight}]}>Music Preference</Text>
            <CloseButton
                style={{
                    position: 'absolute',
                    top: statusAndNavbarHeight - 8,
                    right: 16
                }}
                onPress={() => navigation.goBack()}
            />
            <FlatList
                data={musicGenre}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderCheckbox}
                extraData={musicGenre}
            />
            <View style={{ marginVertical: 8 }}>
                <StandardButton
                    text="Save Preference"
                    onPress={savePreference}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    heading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.secondary,
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

export default MusicPreferenceScreen;
