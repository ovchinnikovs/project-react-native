
import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Camera } from '../camera/camera';
import { Map } from '../map/map';

export const App = createAppContainer(
  createBottomTabNavigator(
    {
      ['Camera']: Camera,
      ['Map']: Map,
    },
  )
);
