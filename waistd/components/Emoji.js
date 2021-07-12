import React from 'react';
import { Planet } from 'react-kawaii/lib/native';
import colors from '../utils/colors';

function Emoji({ size = 100, mood }) {
    let moodString;
    if (mood === "angry") {
        moodString = "ko";
    }
    else if (mood === "fear") {
        moodString = "shocked"
    }
    else if (mood === "sad") {
        moodString = "sad"
    }
    else {
        moodString = "happy";
    }
    return (
        <Planet size={size} mood={moodString} color={colors[mood]} />
    );
}

export default Emoji;
