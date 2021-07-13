import React from 'react';
import { Button } from 'react-native';
import AppLink from 'react-native-app-link';

function DeeplinkAppButton() {
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
        <Button
            title="Deeplink App"
            onPress={handleDeeplink}
        />
    );
}

export default DeeplinkAppButton;
