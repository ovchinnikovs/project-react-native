import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';

interface IState {
  uriArr: string[];
}

export const Camera = (props: any) => {
  const [ images, setImages ] = useState<string[]>([]);

  const camera = useRef<RNCamera>(null);

  const takePicture = async() => {
    if (camera.current) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      setImages([data.uri, ...images]);
    }
  };
 
  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      />
      <View style={styles.footerBox}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={styles.captureText}> SNAP </Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        horizontal={true}
        style={styles.photos}
      >
        { 
          images.map((image) => ( 
            <Image key={image} style={styles.photo} source={{uri: image}} /> 
          ))
        }
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  preview: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerBox: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 10,
  },
  captureText: {
    fontSize: 14,
  },
  photos: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  photo: {
    marginTop: 10,
    marginLeft: 10,
    width: 66,
    height: 58
  }
});