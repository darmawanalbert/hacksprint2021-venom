import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { StandardButton, LinkButton } from '../components';
import logo from '../assets/full-logo.png';
import colors from '../utils/colors';

function WelcomeScreen({ navigation }) {
    // Size of full-logo = 2714px * 1308px in Figma
    const imageWidth = Dimensions.get('window').width * 0.8;
    const imageHeight = 1308 * imageWidth / 2714;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Image source={logo} style={{ width: imageWidth, height: imageHeight }} />
            <View>
                <StandardButton
                    text="Detect Mood"
                    onPress={() => navigation.navigate('FrontCamera')}
                />
                <LinkButton
                    text="About page"
                    onPress={() => navigation.navigate('About')}
                    style={{ marginVertical: 8 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white
    }
});

export default WelcomeScreen;
