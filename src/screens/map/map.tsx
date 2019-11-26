import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { NavigationInjectedProps } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';



export class Map extends React.Component<NavigationInjectedProps, any> {
  constructor(props: NavigationInjectedProps) {
    super(props)

    this.state = {
      currentPosition: {
        latitude: 0,
        longitude: 0,
      },
      currentPositionDelta: {
        latitudeDelta: 0.0545,
        longitudeDelta: 0.0121
      }
    }
  }

  handleChangePositionDelta = () => {
    this.setState((prevState: any) => ({
      ...prevState,
      currentPositionDelta: {
        ...prevState.currentPositionDelta,
        latitudeDelta: 0.0045,
      }
    }));
  }
 
  componentDidMount() {
    Geolocation.getCurrentPosition((position) => {
      this.setState({
        currentPosition: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      })

    }, (error) => console.log(error.message));
  }

  render() {
    const { currentPosition, currentPositionDelta } = this.state;
    
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsPointsOfInterest={true}
          showsCompass={true}
          style={styles.map}
          region={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: currentPositionDelta.latitudeDelta,
            longitudeDelta: currentPositionDelta.latitudeDelta
          }}
        >
          <Marker title={'Geolocation'} coordinate={this.state.currentPosition} /> 
        </MapView>

        <View style={styles.button}>
          <TouchableOpacity style={styles.capture} onPress={this.handleChangePositionDelta} >
            <Text>Click</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

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
