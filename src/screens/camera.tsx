import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  BackHandler,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';

// const folder = RNFS.ExternalStorageDirectoryPath + '/RNCamera';
export const folder = RNFS.ExternalDirectoryPath + '/RNCamera';

const CameraScreen = ({navigation}: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';
  let cameraRef = useRef<RNCamera>(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);

  useEffect(() => {
    const effect = async () => {
      // console.log(await RNFS.getAllExternalFilesDirs());
      const read = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const write = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!read || !write) {
        const readGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'RNCamera Read Permission',
            message:
              'RNCamera needs access to your external storage so it can read from the gallery',
            // buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const writeGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'RNCamera Write Permission',
            message:
              'RNCamera needs access to your external storage so it can write to the gallery',
            // buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (readGranted !== 'granted' || writeGranted !== 'granted') {
          return Alert.alert(
            'Insufficient Permission',
            'Please grant required permissions',
            [
              {
                onPress: () => BackHandler.exitApp(),
                text: 'Exit App',
                style: 'destructive',
              },
            ],
          );
        }
      }
      // Create RNCamera Folder if Doesn't exist
      if (!(await RNFS.exists(folder))) {
        console.log(folder);
        await RNFS.mkdir(folder);
      }
    };
    effect();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef?.current?.takePictureAsync({
        quality: 0.5,
      });

      if (data) {
        console.log(JSON.stringify(data, null, 2));
        await RNFS.moveFile(
          data.uri,
          folder + '/' + Date.now() + '.' + data.uri.split('.').pop(),
        );
        navigation.navigate('Gallery');
      }
    }
  };

  const flipCamera = () => {
    if (cameraType === RNCamera.Constants.Type.back) {
      setCameraType(RNCamera.Constants.Type.front);
    } else {
      setCameraType(RNCamera.Constants.Type.back);
    }
  };

  const toggleFlash = () => {
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.on);
    } else {
      setFlash(RNCamera.Constants.FlashMode.off);
    }
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={cameraType}
          flashMode={flash}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          <View
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                toggleFlash();
              }}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> Flash </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                takePicture();
              }}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                flipCamera();
              }}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> Type </Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraScreen;
