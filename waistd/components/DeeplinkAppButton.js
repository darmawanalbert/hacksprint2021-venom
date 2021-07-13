import React from 'react';
import AppLink from 'react-native-app-link';

import LinkButton from './LinkButton';

function DeeplinkAppButton({ text }) {
    const handleDeeplink = () => {
        const uri = 'spotify://artist/1uNFoZAHBGtllmzznpCI3s';
        AppLink.maybeOpenURL(uri, {
            appName: 'spotify-discover-new-music',
            appStoreId: '324684580',
            appStoreLocale: 'id',
            playStoreId: 'com.spotify.music' })
            .then(() => {
                console.log("Successful");
            })
            .catch((err) => {
                console.log("Fail", err);
            });
    }

    return (
        <LinkButton
            text={text}
            onPress={handleDeeplink}
        />
    );
}

export default DeeplinkAppButton;
