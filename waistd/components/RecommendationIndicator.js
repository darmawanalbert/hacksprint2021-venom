import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';
import colors from '../utils/colors';

function RecommendationIndicator() {
    return (
        <View>
            <PacmanIndicator size={96} color={colors.yellow} style={{ flex: 0 }}/>
            <Text>Digesting your data...</Text>
        </View>
    )
}

export default RecommendationIndicator;
