import React from 'react';
import * as WebBrowser from 'expo-web-browser';

import LinkButton from './LinkButton';

function GeniusButton({ url }) {
    const handleDeeplink = () => {
        WebBrowser.openBrowserAsync(url);
    }

    return (
        <LinkButton
            text="More Info"
            onPress={handleDeeplink}
        />
    );
}

export default GeniusButton;
