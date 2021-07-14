import React from 'react';
import { Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../utils/colors';

function DeeplinkAppButton({ appName, url, style = {} }) {
    // Use when needed
    const appInfo = {
        "spotify": {
            appName: 'spotify-discover-new-music',
            appStoreId: '324684580',
            appStoreLocale: 'au',
            playStoreId: 'com.spotify.music'
        },
        "youtube": {
            appName: 'youtube-watch-listen-stream',
            appStoreId: '544007664',
            appStoreLocale: 'au',
            playStoreId: 'com.google.android.youtube'
        },
        "netflix": {
            appName: 'netflix',
            appStoreId: '363590051',
            appStoreLocale: 'au',
            playStoreId: 'com.netflix.mediaclient'
        },
        "soundcloud": {
            appName: 'soundcloud-music-songs',
            appStoreId: '336353151',
            appStoreLocale: 'au',
            playStoreId: 'com.soundcloud.android'
        }
    }

    const handleDeeplink = () => {
        Linking.openURL(url);
    }

    return (
        <TouchableOpacity onPress={handleDeeplink} style={[styles.container, {...style}]}>
            <MaterialCommunityIcons name={appName} size={48} color={colors.secondary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 4
    }
});

export default DeeplinkAppButton;
