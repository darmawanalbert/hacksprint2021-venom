import React, { useRef, useEffect } from 'react';
import { Easing, Animated } from 'react-native';
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

    const yTranslation = useRef(new Animated.Value(0)).current;
    const runAnimation = () => {
        return Animated.loop(
            Animated.sequence([
                Animated.timing(yTranslation, {
                    toValue: 20,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(yTranslation, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ]),
            {resetBeforeIteration: true, iterations: Number.MAX_SAFE_INTEGER},
        ).start();
    }

    useEffect(() => {
        const animation = runAnimation();
        // return () => animation.stop();
    }, []);

    return (
        <Animated.View
            style={{
                transform: [
                    { translateY: yTranslation}
                ],
                paddingBottom: 24
            }}
        >
            <Planet size={size} mood={moodString} color={colors[mood]} />
        </Animated.View>
    );
}

export default Emoji;
