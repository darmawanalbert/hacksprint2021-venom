import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen, InputScreen, RecommendationScreen } from './screens';

const MainStack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="Welcome">
                <MainStack.Screen name="Welcome" component={WelcomeScreen} />
                <MainStack.Screen name="Input" component={InputScreen} />
                <MainStack.Screen name="Recommendation" component={RecommendationScreen} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

export default App;
