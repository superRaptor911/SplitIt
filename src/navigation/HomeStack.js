import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Creations from '../screens/Creations';
import ViewCreation from '../screens/ViewCreation';
import AboutPage from '../screens/AboutPage';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Creations" component={Creations} />
      <Stack.Screen name="ViewCreation" component={ViewCreation} />
      <Stack.Screen name="About" component={AboutPage} />
    </Stack.Navigator>
  );
};

export default HomeStack;
