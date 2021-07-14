import React from 'react';
import * as WebBrowser from 'expo-web-browser';

import LinkButton from './LinkButton';

function TmdbButton({ movieId }) {
    const handleDeeplink = () => {
        const url = 'https://www.themoviedb.org/movie/' + movieId;
        WebBrowser.openBrowserAsync(url);
    }

    return (
        <LinkButton
            text="More Info"
            onPress={handleDeeplink}
        />
    );
}

export default TmdbButton;
