
import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Camera } from '../camera/camera'

 class Map extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Map</Text>
      </View>
    );
  }
}

export const App = createAppContainer(
  createBottomTabNavigator(
    {
      ['Camera']: Camera,
      ['Map']: Map,

    },
  )
);
