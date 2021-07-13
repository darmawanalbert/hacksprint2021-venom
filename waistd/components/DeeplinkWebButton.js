import React from 'react';
import * as WebBrowser from 'expo-web-browser';

import LinkButton from './LinkButton';

function DeeplinkWebButton({ text }) {
    const handleDeeplink = () => {
        const url = 'https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s';
        WebBrowser.openBrowserAsync(url);
    }

    return (
        <LinkButton
            text={text}
            onPress={handleDeeplink}
        />
    );
}

export default DeeplinkWebButton;
