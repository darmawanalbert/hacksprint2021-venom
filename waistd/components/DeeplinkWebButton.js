import React from 'react';
import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

function DeeplinkWebButton() {
    const handleDeeplink = () => {
        const url = 'https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s';
        WebBrowser.openBrowserAsync(url);
    }

    return (
        <Button
            title="Deeplink Web"
            onPress={handleDeeplink}
        />
    );
}

export default DeeplinkWebButton;
