import React, {useRef, useState} from 'react';
import {
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

const SaveImageScreen = ({navigation}: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';
  let cameraRef = useRef(null);
  const [storagePermission, setStoragePermission] = useState(false);

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef?.current?.takePictureAsync(options);
      console.log(JSON.stringify(data, null, 2));
      navigation.navigate('Gallery', {uri: data.uri});
    }
  };

  const checkStoragePermission = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then((isPermitted: boolean) => {
      if (isPermitted) {
        setStoragePermission(true);
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // rationale:{message: "Please Give Accrss to Save Image",title:"Storage Permission"}
        ).then((data: string) => {
          setStoragePermission(true);
        });
      }
    });
  };

  const onSelect = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            takePicture();
          }}>
          <Text style={{fontSize: 14}}> Type </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onSelect()}>
          <Text style={{fontSize: 14}}> Select Image </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // backgroundColor: 'black',
  },
});

export default SaveImageScreen;
