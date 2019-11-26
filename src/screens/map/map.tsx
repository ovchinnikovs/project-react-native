import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { NavigationInjectedProps } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';

interface ICoord {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Istate {
  marker: ICoord | null;
  region: ICoord;
};


const region = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 932.0005,
  longitudeDelta: 0.0121
}

export const Map = (props: NavigationInjectedProps) => {
  const [ location, setLocation ] = useState<Istate>({
    marker: null,
    region
  });

  const handleChangePositionDelta = () => {
    setLocation((prevState) => (prevState.marker ? {
      ...prevState,
      region: {
        ...prevState.marker
      }
    } : prevState));
  }
 
  const getUserPosition = () => {
    Geolocation.getCurrentPosition((position) => {
      setLocation((prevState: any) => ({
        ...prevState,
        marker: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0045,
          longitudeDelta: 0.0121
        }
      }));
    }, (error) => console.log(error.message));
  };
    
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsPointsOfInterest={true}
          showsCompass={true}
          style={styles.map}
          region={location.region}
        >
          {
            location.marker && <Marker title={'Geolocation'} coordinate={location.marker} /> 
          }
        </MapView>

        <View style={styles.button}>
          <TouchableOpacity style={styles.capture} onPress={handleChangePositionDelta} >
            <Text>Zoom</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.capture} onPress={getUserPosition} >
            <Text>Find me</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  };

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  capture: {
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginRight: 15,
    borderRadius: 50,
  },
});
