/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import {AppProvider} from './src/context/AppContext';
import BackgroundColor from 'react-native-background-color';

const App = () => {
  useEffect(() => {
    //RootViewBackgroundColor.setBackground(255, 255, 255, 1);
    BackgroundColor.setColor('#FFFFFF');
  }, []);
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;
