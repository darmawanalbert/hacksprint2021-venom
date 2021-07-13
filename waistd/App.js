import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen, FrontCameraScreen, AudioRecordScreen, MoodScreen, RecommendationScreen, PreferenceScreen, AboutScreen } from './screens';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackComponent() {
    return (
        <MainStack.Navigator initialRouteName="Welcome">
            <MainStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <MainStack.Screen name="FrontCamera" component={FrontCameraScreen} options={{ title: 'Face Photo'}} />
            <MainStack.Screen name="AudioRecord" component={AudioRecordScreen} options={{ title: 'Audio Recording'}} />
            <MainStack.Screen name="Mood" component={MoodScreen} options={{ title: 'Mood Analysis'}} />
            <MainStack.Screen name="Recommendation" component={RecommendationScreen} options={{ title: 'Recommendations'}} />
        </MainStack.Navigator>
    )
}

function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator mode="modal">
                <RootStack.Screen name="Main" component={MainStackComponent} options={{ headerShown: false }} />
                <RootStack.Screen name="Preference" component={PreferenceScreen} options={{ headerShown: false }} />
                <RootStack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default App;
