import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen, FrontCameraScreen, AudioRecordScreen, MoodScreen, RecommendationScreen } from './screens';

const MainStack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="Welcome">
                <MainStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <MainStack.Screen name="FrontCamera" component={FrontCameraScreen} />
                <MainStack.Screen name="AudioRecord" component={AudioRecordScreen} />
                <MainStack.Screen name="Mood" component={MoodScreen} />
                <MainStack.Screen name="Recommendation" component={RecommendationScreen} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

export default App;
