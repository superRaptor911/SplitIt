import React from 'react';
import 'react-native-gesture-handler';
import {getRWPermission} from './src/components/Utility';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './src/navigation/HomeStack';

const App = () => {
  getRWPermission();

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
