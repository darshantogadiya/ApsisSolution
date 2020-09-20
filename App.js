import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import FirstScreen from './src/firstScreen';
import WifiList from './src/wifiList';
import ConfigureScreen from './src/configureScreen';

const StackActivity = createStackNavigator({
  First: {
    screen: FirstScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Screen 1',
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false
    }),
  },
  WifiList: {
    screen: WifiList,
    navigationOptions: ({ navigation }) => ({
      title: 'Screen 1',
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false
    }),
  },
  ConfigureScreen: {
    screen: ConfigureScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Screen 1',
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false
    }),
  },

})

export default createAppContainer(StackActivity);